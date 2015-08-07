/**
 *Angular JS module for people search application 
 */


(function () {
  'use strict';

  angular.module('app', ['typeahead'])
  .controller('appController', ['$scope', function($scope) {
	  
	  $scope.typeaheadData = {};
	  // data source url - required ( if data set available then no need to have this )
	// min number of chars required to activate typeahead, default - 0
	// prompt to display in text box as place holder - Default Start typing here"
	// highligter function - to display sugessions - required
	// matcher function to match the element
	  $scope.typeaheadData.options = {
			  url:"./data/user.json",
			  minLength:"3",
			  prompt : "Search",
			  cachedRequests :function(oldValue,newValue) {
				return newValue.startsWith(oldValue);  
			  },
			  highlighter : function(obj) {
				  var item = JSON.parse(obj);
					return "<div  class='title'>"+item.name.fullName + " </div>"
							+  "<div class ='subtitle'>" + item.primaryEmail + " ("
							+ item.addresses[0].locality + ") <br>"
							+ item.organizations[0].title + " ("
							+ item.organizations[0].name + ")" + "</div>";
				},
				
				matcher : function(obj,query) {
					//var item = JSON.parse(obj);
					//item = obj;
					
					return obj.name.fullName.toLowerCase().indexOf(
							query.toLowerCase()) >=0
				},
				onselect : function(obj) {
					
					return ~obj.name.fullName.toLowerCase().indexOf(
							this.query.toLowerCase())
				}
	  }
	  
	 // url="./data/user.json" min="3" items="items" prompt="Start typing here"  render='{"title":"name.givenName","subtitle":"name.FamilyName"}'  model="name" 
		  
	 console.log( $scope.typeaheadData.options)
	  
  }]);
})();