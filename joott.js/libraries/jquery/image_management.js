/*
if(typeof jQuery=='undefined')
{
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
    headTag.appendChild(jqTag);
}


jQuery(document).ready(function () {


var cm = document.createElement("menu");
cm.setAttribute("type","context");
cm.setAttribute("id","cntxt_image_management");





var c1 = document.createElement("menuitem")
c1.setAttribute("label","Upload new image");

cm.appendChild(c1);

jQuery("div#page").after(cm);

jQuery.fn.image_management = function() {
         if (!sessionStorage.getItem("joott_is_logged_on")) return false;
		 
	var exiting_menu = jQuery(this).attr("contextmenu")
	
	if(!exiting_menu)  {
	console.log(1)
	console.log(jQuery(this).attr(src))
	jQuery(this).attr("contextmenu","cntxt_image_management");
	}
}

jQuery("div#page img").each(function () {
	jQuery(this).image_management();
});

});
*/
