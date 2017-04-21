app.controller('registerCtrl', function($scope) {
    registerCtrl = this
    registerCtrl.name = "Register Controller";
    console.log(userRegistrationForm.$valid);
    registerCtrl.registerUser = function(isValid) {
      if (isValid) {
        console.log('Valid!');
      }
    }
});

app.directive('usernameAvailable', ['$http', function($http) {
  return {
    restrict: 'A',
    require : 'ngModel',
    link : function($scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.usernameAvailable = function(username) {
        return $http.post('/api/username-avilable', {username: username})
          .then(function resolved() {
            return $q.reject('exists');
          }, function rejected() {
            return true;
          });
      }
    }
  }
}]);
