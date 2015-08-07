/**
 * 
 */

angular.module('typeahead')
.directive('typeahead', ['dataFactory',function(dataFactory,$timeout,$http) {
	  return {
		    restrict: 'AE',
		    scope: {
		    	typeaheaddetails: '=data',
		      
		    },
		    controller: ['$scope', function($scope) {
	            $scope.data = 'Hello world';
	 
	            this.getOptions = function() {
	               return $scope.typeaheaddetails;
	            }
	         }],
		    link: function(scope, elem, attrs) {
		    	
		    	//console.log(scope);
		    	elem.val(scope.model);
		    	
		    	elem.data('old-value', scope.model);
                
                // detect outside changes and update our input
                scope.$watch('model', function (val) {
                	var old = elem.data('old-value');
                	var min = scope.typeaheaddetails.options.minLength;
                	//console.log(scope.typeaheaddetails.options);
                	elem.data('old-value',val);
                	
                    // TODO -- Add min number of chars 
                    
                    // set default min to 0
                    min = min || 0;
           
                    if(val && val.length >= min) // if there is an element in the text field
                    {
                    	dataFactory.getTypeAhead(scope.typeaheaddetails.options.url).then(function(data) {
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



angular.module('typeahead').directive('item', ['$compile', function (compile) {

    return {
        restrict: 'A',
        require: '^typeahead',   // establish parent child relationship to get access to parenet data
        scope: {
            item: '@'
        },
        replace: true,   
        template: '<div class="item"></div>',
        link: function (scope, elm, attrs,typeaheadCtrl) {
                var view = compile('<div >' + typeaheadCtrl.getOptions().options.highlighter(scope.item) + '</div>')(scope);
                elm.append(view);
        }
    }
}]);