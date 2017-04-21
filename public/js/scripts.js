var app = angular.module('chatApp', ['ngRoute','ngAnimate']);

app.controller('indexCtrl', ['$http', function($http) {
  indexCtrl = this;
  indexCtrl.name = 'Index Controller';
  indexCtrl.loggedIn = function() {
    return true;
  }
}]);
// Hack for injecting css using Routeprovider https://stackoverflow.com/questions/15193492/how-to-include-view-partial-specific-styling-in-angularjs
app.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix(''); // routeProvider doesn't work without this
  $routeProvider.
    when('/main', {
      templateUrl: 'templates/main.html',
      controller: 'mainCtrl',
      controllerAs: 'mainCtrl'
    }).
    when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      controllerAs: 'loginCtrl'
    }).
    when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl',
      controllerAs: 'registerCtrl',
      css: '../css/register.css'
    }).
    when('/dashboard', {
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl',
      controllerAs: 'dashboardCtrl'
    }).
    otherwise({
      redirectTo: '/main'
    });
}]);
