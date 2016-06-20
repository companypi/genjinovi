myapp.controller('MainCtrl', ["$scope", function ($scope) {
		$scope.data = {};

        $scope.data.panes = [];

        for (var i = 0; i < 4; i++) {

            $scope.data.panes[0] = {
                color: 'pink',
                text:1,
                heading:"First Heading"
            };

            $scope.data.panes[1] = {
                color: 'blue',
                text: 'two',
                heading:"Second Heading"
            };

            $scope.data.panes[2] = {
                color: 'yellow',
                text: '3',
                heading:"Third Heading"
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