/**
 *Angular JS module for people search application 
 */


(function () {
  'use strict';

  var typeahead = angular.module("typeahead",[]);
  
  typeahead.factory('dataFactory', function($http) {
		return {
			getTypeAhead:function(url,data) {
				return $http({url:url,method: "GET",params:data}).then(function(result) {
					return result.data
				});
			}
		} ;
	  
	  });

})();