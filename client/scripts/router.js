define(['jquery', 'knockout'], function($, ko) {
var router = new $.mobile.Router([
			
	//Components
	{ "#selectFabric": { handler: function() {
		//ko.applyBindings(fabricsVM, $('#selectFabric').get(0));
	}, events: "c" } },
	{ "#selectFabric": { handler: function() {
			
	}, events: "s" } }




]);



});