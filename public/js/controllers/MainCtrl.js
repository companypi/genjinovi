myapp.controller('MainCtrl', ["$scope", function ($scope) {
		$scope.data = {};

        $scope.data.panes = [];

        for (var i = 0; i < 4; i++) {

            $scope.data.panes[i] = {
                text: i + 1,
                color: '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
            };
        }

        $scope.top = function() {
            $scope.$broadcast('scrollify:goTo', {
                pane: 0,
                speed: 0,
                id: 'myScrollify' // optional
            });
        };

        $scope.$on('scrollify:change', function(event, args) {
            console.log(args);
        });
}]);


angular.module('PdiApp', ['hj.scrollify', 'myapp']).config(function() {});