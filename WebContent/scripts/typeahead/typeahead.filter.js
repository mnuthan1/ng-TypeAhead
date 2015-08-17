/**
 * 
 */

angular.module('typeahead').filter('match', function() {
  return function( items,input,options,selected) {
    var filtered = [];
    
    angular.forEach(items, function(item) {
    	if(!selected && options.matcher(item,input))
    	{
    		filtered.push(item);
    	}
    });
    
    return filtered;
  };
});