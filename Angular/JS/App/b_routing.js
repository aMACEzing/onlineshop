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
