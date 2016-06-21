var myapp = angular.module('myapp', ['ngRoute'])

myapp.config(['$interpolateProvider', function($interpolateProvider){
  // $interpolateProvider used to differentiate uses for angular from express
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}])


myapp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'views/home.html',
		controller 	: 'MainCtrl', function($scope, $http){

		}
	})
})

myapp.directive("navscroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (!scope.scrollPosition) {
                scope.scrollPosition = 0
            }

            if (this.pageYOffset > scope.scrollPosition) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
});
