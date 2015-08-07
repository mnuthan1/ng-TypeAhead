/**
 * 
 */

angular.module('typeahead').filter('match', function() {
  return function( items,input,options) {
    var filtered = [];
    
    angular.forEach(items, function(item) {
    	if(options.matcher(item,input))
    	{
    		filtered.push(item);
    	}
    });
    return filtered;
  };
});