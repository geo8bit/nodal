

require.config({
    paths: {
        // RequireJS plugin
        text:'libs/require/text',
        domReady:'libs/require/domReady',
        // jQuery
        jquery:'libs/jquery/jquery-1.8.2',
        jclass:'libs/jquery.class',
        jqmdialog: 'libs/jqmSimpleDialog/jquery.mobile.simpledialog.min',
		// jQuery Mobile framework
        jqm:'libs/jquery.mobile/jquery.mobile-1.2.0',
		jqmrouter: 'libs/jquery.mobile.router/jquery.mobile.router',
        knockout:'libs/knockout/knockout-2.2.0',
		kojqm: 'libs/kojqm',
		iscroll: 'libs/iscroll',
		jqmSlide: 'libs/jqmSlide',
		jgrowl: 'libs/jquery.jgrowl.min',
		komap:  'libs/ko.mapping',
		korest: 'libs/knockout.rest', 
		router: 'router',
		app: 'app',
	}
});

require(['jquery', 'jqmrouter'], function () {
	require(['jqm', 'knockout', 'iscroll', 'komap','jclass', 'libs/jqmExternalAsEmbeddedPages', 'jqmSlide', 'jgrowl', 'korest' ], function (jqm, ko, iscroll, komap) {
		require([
			'jqmdialog'
			], function() {
			require(['app'] , function() {
				$.mobile.pageContainer = $('#container');
				// Setting default transition to slide
				$.mobile.defaultPageTransition = 'slide';
				window.ko         = ko;
				window.ko.mapping = komap;
				//Application entrypoint, define Globals
					
				//Pass application control to router
				require(['router']);
			});
		});
	});
});
