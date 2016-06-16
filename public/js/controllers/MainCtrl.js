myapp.controller('MainCtrl', ["$scope", "$location", "$routeParams", 
function ($scope, $location, $routeParams) {

        $scope.currentPath = $location.path();
        
}]);
