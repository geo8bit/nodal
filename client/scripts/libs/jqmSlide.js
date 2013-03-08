$(function(){
	menustatus = 0; 
	$(".menuTrigger").live('click', function(){
		//console.log(menustatus);
		if (menustatus == 0) {
			$('.ui-page-active').animate({
				width: '-=200',
				marginLeft: '+=200',
			}, 500);
			menustatus = 1;
		} else {
			$('.ui-page-active').animate({
				width: '+=200',
				marginLeft: '-=200',
			}, 500);
			menustatus = 0;
		}
	});
	
	
	
});