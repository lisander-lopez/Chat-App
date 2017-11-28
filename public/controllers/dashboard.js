app.controller('dashboardCtrl', function($scope) {
    dashboardCtrl = this;
    dashboardCtrl.name = "Dashboard Controller";
});

app.controller('userCreationCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  userCreationCtrl = this;
  userCreationCtrl.name = "User Creation Controller";

  userCreationCtrl.createUser = function(username){
    $rootScope.$broadcast('create-user', username);
  };
}]);

app.controller('chatCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  chatCtrl = this;
  chatCtrl.name = "Chat Controller";
  var socket = io();
  socket.emit('test', {hope: 'this works'});
  chatCtrl.username = undefined;

  $rootScope.$on('create-user', function(event, username) {
    chatCtrl.username = username;
  });
}]);
