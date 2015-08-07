/**
 * 
 */

angular.module('typeahead').filter('match', function() {
  return function( items) {
    var filtered = [];
    angular.forEach(items, function(item, scope) {
    	
        filtered.push(item);
  
    });
    return filtered;
  };
});