define(
	[
		'knockout',
		'jqm',
	], 
	function ( ko ) {
		ko.virtualElements.allowedBindings.updateListviewOnChange = true;
		ko.bindingHandlers.updateListviewOnChange = {
			update: function (element, valueAccessor) {
				ko.utils.unwrapObservable(valueAccessor());  //grab dependency
				// locate the listview
				var listview = $(element).parents()
										 .andSelf()
										 .filter("[data-role='listview']");			 
				if (listview) {
					try {
						$(listview).listview('refresh');
					} catch (e) {}
				}
			}
		};
		return ko;
	
});