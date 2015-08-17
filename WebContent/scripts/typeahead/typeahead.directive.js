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
                	var cachedRequests = scope.typeaheaddetails.options.cachedRequests;
                	//console.log(scope.typeaheaddetails.options);
                	elem.data('old-value',val);
                	
                 
                    
                    // set default min to 0
                    min = min || 0;
                    
                    if(val && val.length >= min ) // if there is an element in the text field
                    {
                    	// check cachedrequest fuction in order to avoid duplicate calls
                    	if(!(cachedRequests && cachedRequests(old,val)) || old.length<min )
                    	{
	                    	dataFactory.getTypeAhead(scope.typeaheaddetails.options.url,{'query':val}).then(function(data) {
	                		    scope.items = data;
	              		  	});
                    	}
                    } else {
                    	scope.items = []
                    }
                    
                });
    
		    	scope.handleSelection = function(selectedItem) {
		    		scope.current = 0;
		    	    scope.selected = true;
		    	    //$timeout(function() {
		    	    scope.model = scope.typeaheaddetails.options.onselect(selectedItem);
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