/**
 * 
 */

angular.module('typeahead')
.directive('typeaheadDirective', ['dataFactory',function(dataFactory,$timeout,$http) {
	  return {
		    restrict: 'AE',
		    scope: {
		      items: '=',
		      prompt: '@',
		      render: '@',
		      model: '=',
		      onSelect: '&'	,
		      url: '@', // URL to be called for ajax
		      min: '='
		    },
		    link: function(scope, elem, attrs) {
		    	/*scope.$watch('onChange', function() {
		    		console.log(elem.val());
		    		
		    	});*/ 
		    	// render text into object
		    	
		    	scope.render = JSON.parse(scope.render);
		    	elem.val(scope.model);
		    	
		    	elem.data('old-value', scope.model);
                
                // detect outside changes and update our input
                scope.$watch('model', function (val) {
                	var old = elem.data('old-value');
                	var min = scope.min;
                	elem.data('old-value',val);
                	
                    // TODO -- Add min number of chars 
                    
                    // set default min to 0
                    min = min || 0;
           
                    if(val && val.length >= min) // if there is an element in the text field
                    {
                    	dataFactory.getTypeAhead(scope.url).then(function(data) {
                		    scope.items = data;
              		  	});
                    }
                    
                });
    
		    	scope.handleSelection = function(selectedItem) {
		    		console.log(selectedItem);
		    	    scope.model = selectedItem;
		    	    scope.current = 0;
		    	    scope.selected = true;
		    	    //$timeout(function() {
		    	      scope.onSelect();
		    	   // }, 200);
		    	  };
		    	  scope.current = 0;
		    	  scope.selected = true; // hides the list initially
		    	  scope.isCurrent = function(index) {
		    	    return scope.current == index;
		    	  };
		    	  scope.setCurrent = function(index) {
		    	    scope.current = index;
		    	  };
		    },
		    templateUrl: './templates/templatetypeaheadurl.html'
		  };
		}]);