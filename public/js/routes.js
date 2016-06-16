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




