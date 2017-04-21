app.controller('mainCtrl', function($scope) {
    mainCtrl = this
    mainCtrl.name = "Main Controller";
    mainCtrl.loggedIn = function(){
      return true;
    }
});
