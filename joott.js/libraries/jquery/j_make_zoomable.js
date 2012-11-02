

jQuery.fn.j_zoom = function (zoom) {
	
	jQuery(this).css({
		'-webkit-transform': 'scale(' + zoom + ')',
		'-moz-transform': 'scale(' + zoom + ')',
		'-o-transform': 'scale(' + zoom + ')',
		'transform': 'scale(' + zoom + ')',
		scale: zoom
	});
	
	if (jQuery.browser .msie  && jQuery.browser .version < 9) {
		jQuery(this).css({
			'filter': "progid:DXImageTransform.Microsoft.Matrix(M11=" + zoom  + ", M12=0, M21=0, M22=" + zoom  + ", SizingMethod='auto expand')"
		});
	}
}

jQuery.fn.j_make_zoomable  = function () {
	jQuery('.zoom').j_zoom(0.2);

	var menu  =  document.createElement("div");
	menu.className="menu";
	jQuery('.zoom').before(menu)
	
	var b1 =  document.createElement("button");
	b1.innerHTML = "+"
	jQuery(b1).css({"z-index":100000, position:"absolute",width:"50px"})
	jQuery( b1).click(function (){
		jQuery('.zoom').j_zoom(1);
	});
	jQuery(menu).append(b1)

	var b2 =  document.createElement("button");
	b2.innerHTML = "-"
	jQuery(b2).css({"z-index":100000, position:"absolute",width:"50px",left:"50px"})
	jQuery( b2).click(function (){
		jQuery('.zoom').j_zoom(0.2);
	});
	jQuery(menu).append(b2)
}

jQuery(document).ready(function (){
	try{jQuery().j_make_zoomable(".zoom")}catch(err){}
})
