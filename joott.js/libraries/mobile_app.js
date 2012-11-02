mobile_app = function (){
	this.menu_button = document.querySelectorAll("body.mobile_content a#menu_button")[0]
	if (this.menu_button)this.menu_button.onclick = function () {
		this.innerHTML = (this.innerHTML==="Menu")?"Close":"Menu";
		$("#Button_nest").slideToggle();
	}
	
	var course_button = document.querySelectorAll("div#coursesnav_nest h3[code]");
	for (var c=0; c<course_button.length; c++ ) {
		course_button[c].style.cursor = "pointer";
		course_button[c].innerHTML = course_button[c].innerHTML.substr(0, 40)+'...';
		//course_button[c].style.zIndex = 5000;
		//course_button[c].style.cursor = "point";
		course_button[c].onclick = function () {
			var category_area = this.getAttribute("code");
			window.location = "/?code=" + category_area;
		}
	}
	
	var course_listing = document.querySelectorAll("div.course_listing div.course");
	for (var cl=0; cl<course_listing.length; cl++ ) {
		course_listing[cl].onclick = function () {
		
			var course_code = this.getAttribute("code");
			window.location = "/?course_code=" + course_code;
		}

	}
	
	
	if (_("course_PRC_Footer") != null ) {
		var old_footer = _("PRC_Footer");
		old_footer.removeMe();
	}

	
	var menu_button = _("menu_button");
	if (menu_button!=null) {
	
		var image_placeholder = _("image-placeholder");
		var Button_nest = _("Button_nest");
		
		
		image_placeholder.parentNode.insertBefore(Button_nest,image_placeholder );
		
	
		var coursesnav_nest = _("coursesnav_nest");
		var course_listing = document.querySelectorAll(".course_listing")[0];
		var course_details = document.querySelectorAll(".course_details")[0];
		
		var searchbarholder = _("searchbarholder");
		searchbarholder.style.position = "relative";
		searchbarholder.style.top = "0px";
		if (coursesnav_nest)coursesnav_nest.parentNode.insertBefore(searchbarholder,coursesnav_nest );
		else if (course_listing)course_listing.parentNode.insertBefore(searchbarholder,course_listing );
		else if (course_details)course_details.parentNode.insertBefore(searchbarholder,course_details );
		
		Button_nest.style.overflow = "hidden";
		Button_nest.style.height = "0px";
		Button_nest.style.display = "block";
		Button_nest.style.marginBottom = "0px";
		Button_nest.intervals = 150;
		Button_nest.distance = 50;
		
		var background_div = document.createElement("DIV");
		background_div.style.background = "-moz-linear-gradient(center bottom , rgb(0, 23, 81), rgb(45, 85, 160)) repeat scroll 0px 0px transparent";
		background_div.style.top = "90px";
		background_div.style.height = "0px";
		background_div.setAttribute("id","bluebackground");
		Button_nest.parentNode.insertBefore(background_div, Button_nest);
	
		menu_button.onclick = function () {
			var Button_nest = _("Button_nest");
			Button_nest.do_animation = true;
			
			
			if (Button_nest.offsetHeight == 0) {
				this.innerHTML="Close"
				Button_nest.animation = function () {
				
					var marginBottom = parseInt(this.style.marginBottom);
					if (marginBottom <= 25) this.style.marginBottom=marginBottom+1+"px";
				
					var r1 = background_div.slideDown(450);
					var r2 = this.slideDown(320);
					
					if (!r1 && !r2) this.do_animation = false;
				
				}
			} else {
				this.innerHTML="Menu"
				Button_nest.animation = function () {
				
					var marginBottom = parseInt(this.style.marginBottom);
					if (marginBottom >= 0) this.style.marginBottom=marginBottom-1+"px";
					
					
					background_div.slideUp();
					this.do_animation = this.slideUp();
				}
			}
		
			Button_nest.animate();
		}
	}
	
	var courses_buttonnest = _("courses_buttonnest");
	if (courses_buttonnest!=null) {
		var footer = _("PRC_Footer");
		footer.style.top = "500px";
	}
	
	//var searchbar = _("searchbarholder");
	//if (searchbar!=null) searchbar.removeMe();
	
	var image_bar = _("right-image-snippet2");
	var footer = _("PRC_Footer");
	if (!footer)footer = _("course_PRC_Footer");

	
	image_bar.style.height = (_("PRC_Footer")) ?  footer.offsetTop - image_bar.offsetTop + "px" : footer.offsetTop + 100 + "px";
	
	if(_("news_area")) this.update_news_scroller;
}

mobile_app.prototype.update_news_scroller = function () {
	console.log(1)
	var news_area = _("news_area");
	news_area.setAttribute("id","mobile_news_area");
}

