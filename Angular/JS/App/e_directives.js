
(function () {

    var injectParams = ['$q', '$timeout', '$window', 'httpInterceptor'];

    var wcOverlayDirective = function ($q, $timeout, $window, httpInterceptor) {

        var template = ' <div id="preloader">' +
            '<div class="loader" id="loader-1"></div>' +
            '</div>',

            link = function (scope, element, attrs, model) {
                var overlayContainer = null,
                    timerPromise = null,
                    timerPromiseHide = null,
                    queue = [];

                init();

                scope.$watch(function () {
                    return model.$modelValue;
                }, function (newValue) {
                    if (newValue === "Show") {
                        showOverlay();
                    } else {
                        hideOverlay();
                    }
                });

                function init() {
                    wireUpHttpInterceptor();
                    if ($window.jQuery) wirejQueryInterceptor();
                    overlayContainer = document.getElementById("preloader");  //element[0].firstChild; //Get to template
                }

                //Hook into httpInterceptor factory request/response/responseError functions
                function wireUpHttpInterceptor() {

                    httpInterceptor.request = function (config) {
                        processRequest();
                        return config || $q.when(config);
                    };

                    httpInterceptor.response = function (response) {
                        processResponse();
                        return response || $q.when(response);
                    };

                    httpInterceptor.responseError = function (rejection) {
                        processResponse();
                        //if (rejection.status === 401) {
                        //    $location.path("/404");
                        //} else {
                        //    console.log(rejection);
                        //}
                        rejection.data = "";
                        return $q.reject(rejection);
                    };
                }

                //Monitor jQuery Ajax calls in case it's used in an app
                function wirejQueryInterceptor() {
                    $(document).ajaxStart(function () {
                        processRequest();
                    });

                    $(document).ajaxComplete(function () {
                        processResponse();
                    });

                    $(document).ajaxError(function () {
                        processResponse();
                    });
                }

                function processRequest() {
                    queue.push({});
                    if (queue.length === 1) {
                        timerPromise = $timeout(function () {
                            if (queue.length) showOverlay();
                        }, scope.wcOverlayDelay ? scope.wcOverlayDelay : 300); //Delay showing for 500 millis to avoid flicker
                    }
                }

                function processResponse() {
                    queue.pop();
                    if (queue.length === 0) {
                        //Since we don't know if another XHR request will be made, pause before
                        //hiding the overlay. If another XHR request comes in then the overlay
                        //will stay visible which prevents a flicker
                        timerPromiseHide = $timeout(function () {
                            //Make sure queue is still 0 since a new XHR request may have come in
                            //while timer was running
                            if (queue.length === 0) {
                                hideOverlay();
                                if (timerPromiseHide) $timeout.cancel(timerPromiseHide);
                            }
                        }, scope.wcOverlayDelay ? scope.wcOverlayDelay : 300);
                    }
                }

                function showOverlay() {

                    overlayContainer.style.display = 'block';
                }

                function hideOverlay() {
                    if (timerPromise) $timeout.cancel(timerPromise);
                    $timeout(function () {
                        overlayContainer.style.display = 'none';
                    }, scope.wcOverlayLate ? scope.wcOverlayLate : 500);
                }

                var getComputedStyle = function () {
                    var func = null;
                    if (document.defaultView && document.defaultView.getComputedStyle) {
                        func = document.defaultView.getComputedStyle;
                    } else if (typeof (document.body.currentStyle) !== "undefined") {
                        func = function (element, anything) {
                            return element["currentStyle"];
                        };
                    }

                    return function (element, style) {
                        return func(element, null)[style];
                    };
                }();
            };

        return {
            restrict: 'EA',
            transclude: true,
            require: "ngModel",
            scope: {
                wcOverlayDelay: "@",
                wcOverlayLate: "@"
            },
            template: template,
            link: link
        };
    };

    var wcDirectivesApp = angular.module('wc.directives', []);


    wcDirectivesApp.factory('httpInterceptor', function () {
        return {};
    });

    wcDirectivesApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);


    wcOverlayDirective.$inject = injectParams;

    wcDirectivesApp.directive('wcOverlay', wcOverlayDirective);

    var authHttpResponseInterceptor = function ($q, $location, t, $injector) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    //console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                //console.log(rejection);
                if (rejection.status === 401) {
                    //window.location = 'login.aspx';
                }

                if (rejection.status === 404 || rejection.status === 500) {
                    //console.log(rejection.status);
                    t(function () {
                        $location.path('/Error');
                        setTimeout(function () {
                            var $modalStack = $injector.get('$uibModalStack');//di pde iinject(circular reference). manual injector to.
                            var top = $modalStack.getTop();
                            if (top) {
                                $modalStack.dismiss(top.key);
                            }
                        }, 150);
                    });
                }
                return $q.reject(rejection);
            }
        };
    }, httpAuthProvider = function ($httpProvider) {
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    };

    wcDirectivesApp.factory('authHttpResponseInterceptor', ['$q', '$location', '$timeout', '$injector', authHttpResponseInterceptor]);
    wcDirectivesApp.config(['$httpProvider', httpAuthProvider]);

    var customOnChange = function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.on('change', onChangeHandler);
                element.on('$destroy', function () {
                    element.off();
                });
            }
        };
    };

    wcDirectivesApp.directive('customOnChange', [customOnChange]);

    var questionContainer = function (c) {
        return {
            restrict: "EA",
            scope: {
                Data: "=qna"
            },
            compile: function (E, A, transclude) {
                return function (s, iE, iA) {
                    s.Finish = [];
                    s.$watch('Data', function (n) {
                        s.Question = n.Question;
                        s.Answer = n.Answers;
                        s.No = n.No;
                        //Create Template and Append
                        var compiledContents;
                        var compiled = '<div class="media-left ">{{No}}.</div><div class="media-body"><h2>{{Question}}</h2>' +
                            '<div>' +
                            '<ul><li ng-repeat="a in Answer" class="form-check">' +
                            '<label class="form-check-label"><input type="radio" name="{{a.Question}}" id="{{a.ID}}" value="{{a.ID}}" ng-checked="CheckBaAko(a.Question,a.ID)" ng-click="AnswerQuestion(a.Question,a.ID,$event)" class="form-check-input">{{a.Answer}}<span class="circle"><span class="check"></span></span></label>' +
                            '</li></ul>' +
                            '</div></div>';

                        s.AnswerQuestion = function (q, a, e) {

                            var answer = Enumerable.From(s.Finish).Where(function (x) { return x.QuestionID === q; }).SingleOrDefault();
                            if (answer === undefined) {
                                s.Finish.push({ QuestionID: q, AnswerID: a });
                            } else {

                                s.Finish.splice(s.Finish.indexOf(answer), 1);
                                s.Finish.push({ QuestionID: q, AnswerID: a });
                            }

                            s.$emit("Changes", s.Finish);
                        };

                        s.CheckBaAko = function (q, a) {
                            return Enumerable.From(s.Finish).Where(function (x) { return x.QuestionID === q && x.AnswerID === a; }).Any();
                        };


                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });
                        // all the code here...
                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('questionContainer', ["$compile", questionContainer]);



    var doughnutChart = function (c) {
        return {
            restrict: "EA",
            scope: {
                "src": "="
            },
            compile: function (E, A, transclude) {
                return function (s, iE) {
                    s.$watch('src', function (n) {
                        //Create Template and Append

                        var compiledContents;
                        var compiled = '<div class="row justify-content-center ">								       ' +
                            '    <div class="col-md-6 wow animated bounceInLeft" style="z-index: 1;">      ' +
                            '        <div class="canvas-con-inner">                                        ' +
                            '            <span class="chartLabel"></span>                                  ' +
                            '            <canvas class="douhgnut" width="400"></canvas>                   ' +
                            '                                                                              ' +
                            '        </div>                                                                ' +
                            '    </div>                                                                    ' +
                            '    <div class="col-6 d-flex align-items-center wow animated bounceInRight">  ' +
                            '        <div class="legend-con my-legend-con "></div>                         ' +
                            '    </div>                                                                    ' +
                            '</div>                                                                        ';



                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });

                        Chart.defaults.global.animation.duration = 2000;

                        var _chart = $(".douhgnut");

                        function roundMe(value, decimals) {
                            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
                        }

                        function initChart() {

                            var totalCourse = "";

                            var chartData = n;

                            var courseData = [],
                                sum = 0,
                                coloR = [],
                                labelData = [];



                            for (var i = 0; i < chartData.length; i++) {
                                courseData.push(chartData[i]['count']);
                                labelData.push(chartData[i]['label']);
                                coloR.push(chartData[i]['color']);
                                sum += chartData[i]['count'];

                            }

                            var textInside = sum.toString();
                            totalCourse = '<p class="text-center  text-muted mb-0">' + textInside + '</p><p class="text-center  mb-0 text-muted" style="font-size: 0.7rem;">Total Courses</p>';




                            $(".chartLabel").html(totalCourse);

                            var myChart = new Chart(_chart, {
                                type: 'doughnut',
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                data: {
                                    labels: labelData,
                                    datasets: [{
                                        label: 'percent',
                                        data: courseData,
                                        backgroundColor: coloR
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    legend: false,
                                    legendCallback: function (chart) {
                                        var legendHtml = [];
                                        legendHtml.push('<ul style="padding: 0; margin-bottom: 0;">');
                                        var item = chart.data.datasets[0];
                                        for (var i = 0; i < item.data.length; i++) {
                                            legendHtml.push('<li class="text-left">');
                                            legendHtml.push('<span class="chart-legend indicator" style="background-color:' + item.backgroundColor[i] + '"></span>');
                                            legendHtml.push('<span class="chart-legend-label-text  mbr-fonts-style display-5 text-muted px-1" style="font-size:0.6rem;">'
                                                + chart.data.labels[i] + ' - ' + item.data[i] + ' (' + roundMe(item.data[i] / sum * 100, 2) + '%)</span>');
                                            legendHtml.push('</li>');
                                        }

                                        legendHtml.push('</ul>');
                                        return legendHtml.join("");
                                    },
                                    tooltips: {
                                        enabled: true,
                                        mode: 'label',
                                        callbacks: {
                                            label: function (tooltipItem, data) {
                                                var indice = tooltipItem.index;
                                                return data.labels[indice] + ' - ' + data.datasets[0].data[indice] + ' (' + roundMe(data.datasets[0].data[indice] / sum * 100, 2) + '%)';
                                            }
                                        }
                                    }
                                }
                            });

                            $('.my-legend-con').html(myChart.generateLegend());


                        }


                        initChart();

                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('doughnutChart', ["$compile", doughnutChart]);


    var lineChart = function (c) {
        return {
            restrict: "EA",
            scope: {
                "src": "=",
                "axis": "="
            },
            compile: function (E, A, transclude) {
                return function (s, iE) {
                    s.$watch('src', function (n) {
                        var compiledContents;
                        var compiled =
                            '    <div class="col-xl-6 col-md-12 " style="z-index: 1;">      ' +
                            '        <div  style="width:100%;">                                        ' +
                            '            <canvas class="linechart" style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;"></canvas>' +
                            '                                                                              ' +
                            '        </div>                                                                ' +
                            '    </div>                                                                    ';



                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });

                        Chart.defaults.global.animation.duration = 2500;

                        var _chart = $(".linechart");


                        function initChart() {

                            var chartData = n,
                                chartAxis = s.axis,
                                datasets = [],
                                labels = chartAxis[0].label,
                                xAxesLabel = chartAxis[0].xAxes,
                                yAxesLabel = chartAxis[0].yAxes;



                            for (var i = 0; i < chartData.length; i++) {
                                datasets.push({
                                    'label': chartData[i].label,
                                    'backgroundColor': chartData[i].color,
                                    'borderColor': chartData[i].color,
                                    'data': chartData[i].data,
                                    'fill': false
                                });

                            }



                            var myChart = new Chart(_chart, {
                                type: 'line',
                                data: {
                                    labels: labels,
                                    datasets: datasets
                                },
                                options: {
                                    responsive: true,
                                    tooltips: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    hover: {
                                        mode: 'nearest',
                                        intersect: true
                                    },
                                    scales: {
                                        xAxes: [{
                                            display: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: xAxesLabel
                                            }
                                        }],
                                        yAxes: [{
                                            display: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: yAxesLabel
                                            }
                                        }]
                                    }
                                }
                            });




                        }


                        initChart();

                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('lineChart', ["$compile", lineChart]);


    var progressBar = function (c) {
        return {
            restrict: "EA",
            scope: {
                "progress": "=",
                "height": "=?"
            },
            compile: function (E, A, transclude) {
                return function (s, iE) {
                    s.$watch('progress', function (n) {
                        s.height = s.height === undefined ? '' : 'style="height: ' + s.height + 'px; line-height: ' + s.height + 'px;"';
                        var compiledContents;
                        var compiled =
                            '<div class="progress" ' + s.height + '>' +
                            (parseInt(n) >= 10 ? '' : '<div class="progress-text" ' + s.height + '>' + n + '%</div>') +
                            '<div class="progress-bar progress-bar-striped progress-bar-animated infinite" style="width: ' + n + '%;"><div class="progress-text" ' + s.height + '>' + n + '%</div></div></div>';



                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });



                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('progressBar', ["$compile", progressBar]);



    var onFinishRender = function () {
        return {
            restrict: 'A',
            link: function (s, e, a) {
                if (s.$last === true) {
                    s.$emit(a.onFinishRender);
                }
            }
        };
    };

    wcDirectivesApp.directive('onFinishRender', [onFinishRender]);

    var courseState = function (c) {
        return {
            restrict: "EA",
            scope: {
                "val": "@"
            },
            compile: function (E, A, transclude) {
                return function (s, iE) {
                    s.$watch('val', function (n) {
                        var statIcon = parseInt(n) === 1 ? "mdi mdi-lock-open-variant" : "mdi mdi-lock";
                        var statText = parseInt(n) === 1 ? "Unlocked" : "Locked";
                        var compiledContents;
                        var compiled = '<i class="' + statIcon + '"></i><span>' + statText + '</span>';



                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });



                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('courseState', ["$compile", courseState]);



    var sidebarBreadCrumbs = function (c, t) {
        return {
            restrict: "E",
            compile: function (E, transclude) {
                return function (s, iE) {

                    t(function () {
                        var compiledContents;
                        var v = $('#sidebar li.active a')[0].innerText;
                        var compiled = '<h1 class="subtitle">' + v + '</h1>';




                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });

                    }, 1000);


                };
            }

        };
    };

    wcDirectivesApp.directive('sidebarBreadCrumbs', ["$compile", "$timeout", sidebarBreadCrumbs]);



    var feedbackAnswerSelection = function (c) {
        return {
            restrict: "EA",
            scope: {
                group: "=",
                objtype: "=",
                choices: "="
            },
            compile: function (E, A, transclude) {
                return function (s, iE, iA) {
                    s.$watch('group', function (n) {

                        //Create Template and Append
                        var compiledContents;
                        var compiled = '';

                        if (s.objtype === 'radio') {
                            compiled = '<div class="col-xl-6 col-md-3"><div class="btn-group btn-group-toggle" data-toggle="buttons">' +
                                '<label class="btn btn-link p-0 radioicon mx-1 " uib-popover="Excellent" popover-trigger="\'mouseenter\'" ng-click="feedbackChoice(' + n + ',1,$event)">              ' +
                                '<input   type="radio" name="' + n + '" autocomplete="off" >        ' +
                                '<i class="mdi mdi-emoticon-excited-outline p-0 "></i>         ' +
                                '</label>                                                      ' +
                                '<label class="btn btn-link p-0 radioicon mx-1" uib-popover="Good" popover-trigger="\'mouseenter\'" ng-click="feedbackChoice(' + n + ',2,$event)">               ' +
                                '<input  type="radio" name="' + n + '" autocomplete="off"  >        ' +
                                '<i class="mdi mdi-emoticon-happy-outline p-0"></i>            ' +
                                '</label>                                                      ' +
                                '<label class="btn btn-link p-0 radioicon mx-1 " uib-popover="Fair" popover-trigger="\'mouseenter\'"  ng-click="feedbackChoice(' + n + ',3,$event)">              ' +
                                '<input   type="radio" name="' + n + '" autocomplete="off" >        ' +
                                '<i class="mdi mdi-emoticon-neutral-outline p-0 "></i>         ' +
                                '</label>                                                      ' +
                                '<label class="btn btn-link p-0 radioicon mx-1" uib-popover="Poor" popover-trigger="\'mouseenter\'" ng-click="feedbackChoice(' + n + ',4,$event)">               ' +
                                '<input   type="radio" name="' + n + '" autocomplete="off" >        ' +
                                '<i class="mdi mdi-emoticon-sad-outline p-0"></i>              ' +
                                '</label>                                                      ' +
                                '</div></div>                                                        ';

                        } else if (s.objtype === 'slider') {
                            s.sliderValue = '0';
                           
                            compiled = '<div class="col-md-12" ng-init="feedbackChoice('+ n +')">' +
                                '<div class="d-flex my-3 mx-md-4">' +
                                '<small class="mr-4 my-3">' + s.choices[0].Name + '</small><input id="_slider' + n + '"  ng-model="sliderValue" ng-change="feedbackChoice(' + n + ',0,$event)"  type="text" data-slider-min="0" data-slider-value="0" data-slider-max="100" data-slider-step="1" /><small class="ml-4 my-3">' + s.choices[1].Name + '</small>' +
                                '</div>' +
                                '</div>';

                        }
                        else if (s.objtype === 'checkbox') {
                            s.CheckBox = {};
                            s.CheckBoxAnswers = [];

                            compiled = '<div class="col-md-12 custom-checkbox">' +
                                '<div class="form-check"   ng-repeat="c in choices">' +
                                '<label class="form-check-label  my-2 ml-md-4">' +
                                '<input  ng-change="feedbackChoice(\'undefined\',c.IsUnique)" ng-model="CheckBox[\'Selected\' + $index]" class="form-check-input"  type="checkbox" ng-true-value="{QuestionID: ' + n + ', AnswerID: {{c.ID}}, IsUnique: {{c.IsUnique}}}">{{c.Name}}' +
                                '<span class="form-check-sign">' +
                                '<span class="check"></span>' +
                                '</span>' +
                                '</label>' +
                                '</div>' +
                                '</div>';

                        } else if (s.objtype === 'textbox') {
                            s.TextBox = {};
                            s.InputLengthValidation = false;
                            compiled = '<div class="col-xl-7 col-md-12 p-md-4">' +
                                '<textarea rows="3"  ng-change="feedbackChoice()" ng-model="TextBox[\'Inputted' + n + '\']"  class="w-100 border border-warning bg-transparent p-2 custom-text-control"></textarea>' +
                                '<small ng-show="InputLengthValidation" class="text-danger"><span class="mdi mdi-alert-outline text-danger"></span>Must be atleast 8 characters long.</small>' +
                                '</div>';

                        }

                   

                        s.feedbackChoice = function (q, a, e) {



                            s.Finish = [];
                            if (s.objtype === 'radio') {
                                s.Finish.push({ QuestionID: q, AnswerID: a });
                            }
                            else if (s.objtype === 'slider') {
                                s.Finish.push({ QuestionID: q, AnswerID: s.sliderValue });
                            }
                            else if (s.objtype === 'checkbox') {
                                var temp1 = s.CheckBox;
                                var withUnique = false;
                                
                                Object.keys(temp1).forEach(function (itm) {
                                    if (temp1[itm].IsUnique === 1) {
                                        withUnique = true;
                                    }
                                   
                                });

                                if (withUnique) {
                                    Object.keys(temp1).forEach(function (itm) {
                                     
                                        if (temp1[itm].IsUnique === 0) delete s.CheckBox[itm];
                                    });
                                }
                                

                       
                                s.CheckBoxAnswers = [];

                                for (var i = 0; i < s.choices.length; i++) {

                                    var selected = s.CheckBox['Selected' + i];

                                    if (selected !== undefined) {

                                        if (selected.AnswerID !== undefined) {
                                            q = selected.QuestionID;
                                            s.CheckBoxAnswers.push(selected.AnswerID);
                                        }
                                    }
                                }



                                if (q === undefined && q === 'undefined') {
                                    s.CheckBoxAnswers = '$Remove';
                                    q = n;
                                }


                                s.Finish.push({ QuestionID: q, AnswerID: s.CheckBoxAnswers });

                            }
                            else if (s.objtype === 'textbox') {

                                var textboxValue = s.TextBox['Inputted' + n];
                                textboxValue = textboxValue === undefined ? '' : textboxValue;


                               
                                if (textboxValue.length < 8) {
                                    textboxValue = '$Remove';
                                    s.InputLengthValidation = true;
                                } else {
                                    s.InputLengthValidation = false;
                                }

                               
                                s.Finish.push({ QuestionID: n, AnswerID: textboxValue });

                            }



                            s.$emit("feedbackSelect", s.Finish);
                        };




                        if (!compiledContents) {
                            compiledContents = c(compiled, transclude);
                        }

                        compiledContents(s, function (clone, a) {

                            iE.empty();
                            iE.append(clone);
                        });
                        if (s.objtype === 'slider') {
                            $("#_slider" + n).slider({ tooltip: 'always' });

                        }
                    });


                };
            }

        };
    };

    wcDirectivesApp.directive('feedbackAnswerSelection', ["$compile", feedbackAnswerSelection]);

}());