/**
 *Angular JS module for people search application 
 */


(function () {
  'use strict';

  var typeahead = angular.module("typeahead",[]);
  
  typeahead.factory('dataFactory', function($http) {
		return {
			getTypeAhead:function(url) {
				return $http.get(url).then(function(result) {
					return result.data
				});
			}
		} ;
	  
	  });

})();