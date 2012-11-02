
do_order = function  () {
	
	var l = 0;
	jQuery("div.create_carousel div.c_body_inner  >div >div").each(function () {
		
		index = jQuery(this).index();
		
		if (index==0)  l = -1 * jQuery(this).width();
		l+=jQuery(this).width();
		jQuery(this).css({left:l+"px"})
	})
}

hide_pointers = function  (x) {
	jQuery("div.c_pointer div div").each(function () {
		jQuery(this).fadeOut();
	});
}

jQuery(document).ready(function (){
	jQuery("div.create_carousel div.c_body_inner > div").fadeOut();
	
	jQuery("div.rbutton, div.lbutton").css({ opacity: 0.5 });
	hide_pointers();
		
	
	jQuery("div.create_carousel div.c_title div").click(function (){
		jQuery("div.create_carousel").removeAttr("animating");
		do_order () ;
		do_order ();
		var index = jQuery(this).index()+1;
	        jQuery("div.create_carousel div.c_body_inner > div").fadeOut();
		jQuery("div.create_carousel div.c_body_inner  div:nth-child("+index+")").fadeIn();	
		
		hide_pointers ();
		jQuery("div.create_carousel div.c_pointer  div:nth-child("+index+") div").fadeIn();
		
		
	})
	
	jQuery("div.create_carousel div.c_title").children().eq(1).click();
	
	
	jQuery("div.lbutton > div ").click(function (){
	        if (jQuery("div.create_carousel").attr("animating")) return false;
		jQuery("div.create_carousel").attr("animating",true);
		
		
		jQuery("div.create_carousel div.c_body_inner  >div >div").each(function (){
			jQuery(this).stop().animate({left:"-="+jQuery(this).width()+"px"},function (){jQuery("div.create_carousel").removeAttr("animating");})
			var m = -1*jQuery(this).width();
			var l = jQuery(this).position().left;
			if (l<=m) {
				var lm = 0;
				var wm = 0;
				
				var nl = jQuery(this).parent().children(':last').position().left;
				//var nw =  jQuery(this).parent().children(':last').width();
				var nw=0
				jQuery(this).css("z-index",-1)
				jQuery(this).animate({left: nw+nl+"px"},function(){
					jQuery(this).appendTo(jQuery(this).parent());
					jQuery("div.create_carousel").removeAttr("animating");
					jQuery(this).css("z-index",0)
				})
			}
		});
	})
	
	jQuery("div.rbutton > div").click(function (){
		if (jQuery("div.create_carousel").attr("animating")) return false;
		jQuery("div.create_carousel").attr("animating",true);
		jQuery("div.create_carousel div.c_body_inner  >div >div").each(function (){
			
			jQuery(this).animate({left:"+="+jQuery(this).width()+"px"},function (){jQuery("div.create_carousel").removeAttr("animating");})
			
			var m = jQuery("div.c_body").width();
		
			var l = jQuery(this).position().left;
			
			if (l>m) {
				var nl = jQuery(this).parent().children(':first').position().left ;
				jQuery(this).css("z-index",-1)
				jQuery(this).animate({left:nl+"px"},function (){
					jQuery(this).prependTo(jQuery(this).parent());
					jQuery("div.create_carousel").removeAttr("animating");
					jQuery(this).css("z-index",0)
	
				})
			}
		});
	})
})
