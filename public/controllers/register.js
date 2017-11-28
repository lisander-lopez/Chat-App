app.controller('registerCtrl', ['$scope','$log', '$http', function($scope, $log, $http) {
    registerCtrl = this
    registerCtrl.name = "Register Controller";
    registerCtrl.userExists = false;
    console.log(userRegistrationForm.$valid);
    registerCtrl.registerUser = function(isValid) {
      if (isValid) {
        console.log('Valid!');
      }
    }

    $scope.$watch('registerCtrl.username', function()
    {
      if (registerCtrl.username) {
        if (registerCtrl.username.length > 8) {
          registerCtrl.checkIfUserAvailable(function(data){
            //If Username is availible then...
            if (data) {
              $log.info(data);
              registerCtrl.userExists = false;
              $log.info('Username Available!');

            } else {
              registerCtrl.userExists = true;
              $log.error('Username Exists!');
            } registerCtrl.userRegistrationForm.password.$error.minlength
          });
        }
      }
    });

    $scope.$watch('registerCtrl.password', function()
    {
    $log.info(registerCtrl.userRegistrationForm.password.$error.minlength);
    });

    registerCtrl.checkIfUserAvailable = function checkIfUserAvailable(callback) {
      $http.post('/api/username-available', {username: registerCtrl.username})
        .then(function resolved(res) { //We get a response
          console.log(registerCtrl.username + ' exists? ' + res.data.exists);
          if (res.data.exists == 0) {
            console.log('Returned True');
            callback(true);
          } else {
            console.log('Returned False');
            callback(false);
          }
        });
    }

}]);

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
