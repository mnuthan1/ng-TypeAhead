# ng-TypeAhead
Angular module for TypeAhead functionality
<br />Native AngularJS implementation, no jQuery

#Introduction
ng-TypeAhead, is a 100% angular module written with no dependencies other than AngularJS. 
<br/> <b>with this module, you get:</b>
* Easy to use Type Ahead features using angular directives<br/>
* Caches results to avoid multiple Ajax call ( user can define their own caching function to decide when to do Ajax call)<br/>
* Supports multiple options

<b>Usage</b>
Steps:

* Include ng-TypeAhead in your script and css

```
<script src="./scripts/typeahead/typeahead.js"></script>
<script src="./scripts/typeahead/typeahead.controller.js"></script>
<script src="./scripts/typeahead/typeahead.directive.js"></script>
<script src="./scripts/typeahead/typeahead.filter.js"></script>

<link href="styles/typeahead/typeahead.css" type="text/css" rel="stylesheet"/>
```
* Include ui.grid module as a dependency in your app
``` angular.module('app', ['typeahead']) ```
* Add an array of data and options to a property on your $scope
```
 $scope.typeaheadData = {};
 $scope.typeaheadData.options = {};
```
* provide options in your $scope
    * url : url to pull data
    * minLength : The minimum character length needed before suggestions start getting rendered.
    * prompt : Place holder for text box
    * cachedRequests : function return true or false, based on this function typeahead module determines whether to make ajax for perticual chagne in the text box
    * highlighter : function which returns HTML string - to be displyaed in auto suggesion drop down box
    * matcher  : function to match the text 
    * onselect  : function to be called upon selecting an item
```
$scope.typeaheadData.options = {
			  url:"./data/user.json",
			  minLength:"3",
			  prompt : "Search",
			  cachedRequests :function(oldValue,newValue) {
				  return newValue.startsWith(oldValue);  
			  },
			  highlighter : function(obj) {
				  var item = JSON.parse(obj);
					return "<div  class='title'>"+item.name.fullName + " </div>";
				},
				
				matcher : function(obj,query) {
					//var item = JSON.parse(obj);
					//item = obj;
					console.log(query)
					return (obj.name.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1)
				},
				onselect : function(obj) {
					return obj.name.fullName;
				}
	  }
	```
