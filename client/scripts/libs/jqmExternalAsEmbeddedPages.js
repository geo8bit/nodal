/**
 * Patch for jquery mobile to transparently lookup non existing embedded pages
 * as external pages with the suffix .html.
 */
define(["jquery", "jqm"], function($) {
  $.mobile.originalLoadPage = $.mobile.loadPage;
  $.mobile.loadPage = function (url, options) {
    var match = url.match(/#(\w+)/);
    if (match) {
      var pageId = match[1];
      var page = document.getElementById(pageId);
      if (!page || $(page).is(":jqmData(external-page='true')")) {
        url = pageId + ".htm";
      }
    }
    return $.mobile.originalLoadPage(url, options);
  };
});



