var app;
(
    function () {
        'use strict';
        app = angular.module('app', ['ui.router', 'ngAria', 'ngCookies', 'ngMessages', 'ngSanitize', 'wc.directives', 'cfp.hotkeys', 'ui.bootstrap', 'ngAnimate']);
    }
)();

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$compileProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $compileProvider) {

    //console.log('Appt.Main is now running')
    if (window.history && window.history.pushState) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
      }).hashPrefix('!');
    }

    $urlMatcherFactoryProvider.strictMode(false);
    $compileProvider.debugInfoEnabled(false);

    var v = './template/'

    $stateProvider
      .state('Home', {
        url: '/',
        templateUrl: v + 'Home.html',
        controller: 'HomeController'
      });



    $urlRouterProvider.otherwise('/');
  }
]);



app.run(['$rootScope', '$location', '$state', function($rootScope, $location, state) {

}]);

app.controller('mainCtrl', ['$rootScope', '$scope', '$http', 'dataService', '$sanitize', '$compile', 'hotkeys', '$state', '$timeout', '$location', '$uibModal', function(rs, $s, $http, d, sanitize, comp, h, state, $timeout, $location, $modal) {
  $s.Request = function(action, params, encrypt, disableInterceptor, ignoreLoadingBar) {
    return d.Request(action, params, encrypt, disableInterceptor, ignoreLoadingBar);
  };
  $s.SetController = function(controller) {
    return d.SetController(controller);
  };





  $s.isCurrentPath = function(path) {
    var p = $location.path();
    var noslash = p.substring(1, p.length);
    p = p.substring(0, noslash.indexOf('/') > 0 ? noslash.indexOf('/') + 1 : p.length);
    p = p.replace("/", "");
    return p === path;

  };


  $s.RedirectMe = function(u, p, d, t) {
    d = d === undefined ? '' : d;
    t
    if (d === '') {
      state.go(u, p);
    } else {

      Swal.fire({
        type: 'warning',
        title: 'Oops...',
        text: d
      });
    }
  };

  $s.Init = (function() {
    $s.isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      $s.isMobile = true;
    }



    $s.$on('$viewContentLoaded', function(e) {
      e.preventDefault;
      $s.InitCommonPlugins();
    });


    $s.InitCommonPlugins = function() {
      var $main_window = $(window);

      $main_window.on("scroll", function() {
        if ($(this).scrollTop() > 250) {
          $(".back-to-top").fadeIn(200);
        } else {
          $(".back-to-top").fadeOut(200);
        }
      });

      $(".back-to-top").on("click", function() {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        return false;
      });

      var logo_path = $('.mobile-menu').data('logo');
      $('#main-navbar').slicknav({
        appendTo: '.mobile-menu',
        removeClasses: false,
        label: '',
        closedSymbol: '<i class="lni-chevron-right"><i/>',
        openedSymbol: '<i class="lni-chevron-right"><i/>',
        brand: '<a href="index.html"><img src="' + logo_path + '" class="img-responsive" alt="logo"></a>'
      });

      $main_window.on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
          $(".scrolling-navbar").addClass("top-nav-collapse");
        } else {
          $(".scrolling-navbar").removeClass("top-nav-collapse");
        }
      });
      if ($(".counter").length > 0) {
        $(".counterUp").counterUp({
          delay: 10,
          time: 2000
        });
      }
      var wow = new WOW({
        mobile: false
      });
      wow.init();
      $('[data-toggle="tooltip"]').tooltip()
      var testiOwl = $("#testimonials");
      testiOwl.owlCarousel({
        autoplay: true,
        margin: 30,
        dots: false,
        autoplayHoverPause: true,
        nav: false,
        loop: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          991: {
            items: 2
          }
        }
      });


      var newproducts = $("#new-products");
      newproducts.owlCarousel({
        autoplay: true,
        nav: true,
        autoplayHoverPause: true,
        smartSpeed: 350,
        dots: false,
        margin: 30,
        loop: true,
        navText: ['<i class="lni-chevron-left"></i>', '<i class="lni-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          575: {
            items: 2,
          },
          991: {
            items: 3,
          }
        }
      });
      var categoriesslider = $("#categories-icon-slider");
      categoriesslider.owlCarousel({
        autoplay: true,
        nav: false,
        autoplayHoverPause: true,
        smartSpeed: 350,
        dots: true,
        margin: 30,
        loop: true,
        navText: ['<i class="lni-chevron-left"></i>', '<i class="lni-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          575: {
            items: 2,
          },
          991: {
            items: 5,
          }
        }
      });
      var detailsslider = $("#owl-demo");
      detailsslider.owlCarousel({
        autoplay: true,
        nav: false,
        autoplayHoverPause: true,
        smartSpeed: 350,
        dots: true,
        margin: 30,
        loop: true,
        navText: ['<i class="lni-chevron-left"></i>', '<i class="lni-chevron-right"></i>'],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          575: {
            items: 1,
          },
          991: {
            items: 1,
          }
        }
      });
    };

  });
}]);

app.factory('dataService', ['$http', '$q', '$state', '$cookies', function (h, $q, state, $cookies) {
//var serviceBase = 'https://lnmwebservice.kojhr.com/SOWS_v2/api/Client/',
   var serviceBase = 'https://localhost:44343/api/Client/',
        dataFactory = {};



    dataFactory.SetController = function (controller) {
    //  serviceBase = 'https://lnmwebservice.kojhr.com/SOWS_v2/api/' + controller + '/';
serviceBase = 'https://localhost:44343/api/' + controller + '/';
        return dataFactory;
    };

    dataFactory.Logout = function () {
        $cookies.remove("X-App-SOEL", {
            samesite: 'Strict',
         //   domain: 'kojhr.com'
        });
        window.location.href = "/";

        return dataFactory;
    };



    dataFactory.UserInfo = function () {
        if ($cookies.getObject('X-App-SOEL') !== undefined) {
            return $cookies.getObject('X-App-SOEL');
        } else {
            return [];
        }
    };

    dataFactory._isNotMobile = function () {
        var ret = function () {
            var check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
            return !check;
        }();

        return dataFactory;
    };

    dataFactory.Request = function (type, action, params, encrypt, disableInterceptor, ignoreLoadingBar) {

        var defAbort = $q.defer();
        var ds = h({
            method: type,
            url: serviceBase + action,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': $cookies.getObject('X-App-SOEL') === undefined ? 'None' : 'Bearer ' + $cookies.getObject('X-App-SOEL').Bearer
            },
            disableInterceptor: (disableInterceptor === undefined ? false : disableInterceptor),
            ignoreLoadingBar: (ignoreLoadingBar === undefined ? false : ignoreLoadingBar)
        });

        var ret = ds.then(function (results) {
            return results.data;
        }, function (error) {

            if (error.status === 401) {
                state.go("Unauthorized", '');
            }
            else {
                state.go("Error", '');
            }


            return $q.reject(error.data.error);
        });

        ret.abort = function () {
            defAbort.resolve();
        };

        ret.finally(
            function () {
                ret.abort = angular.noop;
                defAbort = request = promise = null;
            }
        );

        return ret;
    };
    return dataFactory;
}]);

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
app.controller('HomeController', ['$scope', '$log', '$controller', '$http', 'dataService', '$state', '$q', '$timeout',  function ($s, $log, $c, $http, d, state, $q, $timeout) {
    $c("mainCtrl", { $scope: $s });
  

}]);
