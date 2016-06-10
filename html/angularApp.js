var foo = "bar";

var angularApp = angular.module('angularApp', []);

// configure our routes
angularApp.config(function() {

});

angularApp.run(function($window) {
    console.log($window.innerHeight);
    console.log($window.innerWidth);
    var test_delay = 10000;
    setTimeout(function () {

        $window.angularAppReady = true;
    }, test_delay);
});

angularApp.controller('testCtrl', function($scope) {
    // create a message to display in our view
    $scope.message = "hello again";

});
