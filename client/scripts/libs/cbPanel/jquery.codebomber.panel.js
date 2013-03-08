/*!
 * Codebomber SlidePanel
 * Version: 0.3
 * http://codebomber.com/jquery/slidepanel
 *
 * Copyright 2012, William Golden
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 *
 * Requires jQuery
 * http://jquery.com/
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Wed Jan 25 23:27:00 2011 -0600
 */
(function($){
    if(!$.Codebomber){
        $.Codebomber = new Object();
    };
    
    $.Codebomber.Panel = function(el, options){
		
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("Codebomber.Panel", base);
        
		//store if an ajax request has already been made
		base.loaded = false;
        
		base.init = function(){
            //Combine default options with constructor options
			base.options = $.extend({},$.Codebomber.Panel.defaultOptions, options);
            
			//set current trigger link to false for the current panel
			base.$el.data('current', false);
			
			//hide the panel and set orientation class for display
			base.$el.hide().addClass('panel_' + base.options.orientation);
			
			//reset any defined a positions
			base.$el.css('left', '').css('right', '').css('top', '').css('bottom', '');
			//set a default top value for left and right orientations
			//and set the starting position based on element width
			if(base.options.orientation == 'left' || base.options.orientation == 'right') {
				var options = {};
				options['top'] = 0;
				options[base.options.orientation] = -base.$el.width();
				base.$el.css(options);
			}
			//set a default left value for top and bottom orientations
			//and set the starting position based on element height
			if(base.options.orientation == 'top' || base.options.orientation == 'bottom') {
				var options = {};
				options['left'] = 0;
				options[base.options.orientation] = -base.$el.height();
				base.$el.css(options);
			}
			
			//bind click event to trigger ajax load of html content
			//and panel display to any elements that have the attribute rel="panel"
			$('a[rel=panel]').live('click', function(e) {
				e.preventDefault();
				base.load({element: this});
			});
			
			//bind a click event to any element with class .close that is inside of the panel
			$('.close', base.$el).click(function(e) {
				e.preventDefault();
				base.collapse();
			});
        };
        
        //return html from an external source
        base.load = function(paramaters){
			//if the current trigger element is the element that just triggered a load
			//collapse the current panel
         	if(base.$el.data('current') == paramaters.element) {
				base.collapse();
				return;
			} else {
				base.expand();
				//if ajax content has not already been loaded
				//load the content based on the href attribute of the triggering link
				if(!base.loaded){
					$('.inner .wrapper', base.$el).html('').load($(paramaters.element).attr('href'), function() {
						base.$el.removeClass('loading');
						base.loaded = true;
					});
				} else {
					base.$el.removeClass('loading');
				}
			}
			base.$el.data('current', paramaters.element);
        };
		
		//expand the target panel based on orientation
		base.expand = function() {
			var options = {
				'visible' : 'show'
			};
			options[base.options.orientation] = 0;
			base.$el.addClass('loading').animate(options, 250, function() {
				$('.close', base.$el).fadeIn(250);
			});
		};
		
		//collapse panel
		base.collapse = function() {
			$('.close', base.$el).hide();

			var options = {
				'visible' : 'hide'
			};
			options[base.options.orientation] = -(base.$el.width() + 40);
			base.$el.animate(options, 250).data('current', false);
		}
        
        // Run initializer
        base.init();
    };
    
	//set default options
    $.Codebomber.Panel.defaultOptions = {
        orientation: "left"
    };
    
	//main plugin entry point
    $.fn.codebomber_Panel = function(options){
		//if no matching selectors found
		//create a new element based on html template
		if(this.length == 0){
			var panel_html = '<div id="panel class="cb_slide_panel"><div class="wrapper"><a href="#" class="close">Close</a><div class="inner"><div class="wrapper"></div></div></div></div>';
			var element = $(panel_html).hide().appendTo($('body'));
			return (new $.Codebomber.Panel(element, options));
		} else {
			return this.each(function(){
				(new $.Codebomber.Panel(this, options));
			});
		}
    };
    
})(jQuery);