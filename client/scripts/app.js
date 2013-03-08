define(['jquery', 'knockout', 'komap'], function($, ko, komap) {

	Collection = Class.extend({
		init: function(url, defModel) {
			this.url       = url;
			this.defModel  = defModel;
			this.dataModel = komap.fromJS(this.defModel);
			this.dataStore = ko.observableArray([]);
			var that       = this;
			that.create    = function() {
				var datum  = new ko.pontillo.rest.entity(that.dataModel);
				datum.Post(that.url);
			};

			that.del 	  = function(item) {
				var datum = new ko.pontillo.rest.entity();
				datum.Delete(that.url + '/' + item._id());
			};

		},
		fetch: function() {
			var that = this;
			$.getJSON(
				that.url,
				{},
				function(data) {
					for (var ind in data) {
						var datum = new ko.pontillo.rest.entity(that.defModel);
						that.dataStore.push(datum);
						datum.Get( that.url + '/' + data[ind]._id );

					}
				}
			);
		}

	});

	blogModel = {
		title: "",
		author: "",
		body: ""
	};

	blog = new Collection('api/blog', blogModel);
	ko.applyBindings(blog);
	blog.fetch();
});
