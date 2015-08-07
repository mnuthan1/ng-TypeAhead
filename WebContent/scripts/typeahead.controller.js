/**
 * 
 */

angular.module('typeahead')
.controller('TypeAheadController', ['$scope','dataFactory', function($scope, dataFactory) {
	
	
	$scope.name = ''; // This will hold the selected item
	$scope.onItemSelected = function(obj) { // this gets executed when an item is selected
		console.log( $scope);
		console.log(obj);
	};
	
	$scope.getData = function () {
		console.log($scope.model);
		dataFactory.getTypeAhead('./data/user.json').then(function(data) {
		    $scope.items = data;
		  });
	};
	  
}]);