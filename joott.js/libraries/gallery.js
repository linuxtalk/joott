gallery = function (id) {
	var _this = this;
	this.parent = document.querySelectorAll("div.gallery")[id];
	this.url =  this.parent.getAttribute("url");
	
	var _webservice = new webservice('/modules/joott/index.php?joott_cmd=gallery_list&url='+_this.url, function(){_this.confirmation()});
	
	this.parent.do_animation = true;
	this.parent.intervals = 25;
	this.parent.next_image = 8;
	this.parent.move = 1;
	this.parent.animation = function () {
		var images = _this.parent.querySelectorAll("div.thumbs img");
		
		var limit = -300;
		var limit_found = false;
		for (var i=0;i<images.length;i++) {
			images[i].style.left = images[i].offsetLeft-_this.parent.move+"px";
			if (images[i].offsetLeft<=limit) {
			
				_this.parent.next_image++;
				if (_this.parent.next_image>=thumbs.length) _this.parent.next_image = 0;
				limit_found = true;
				images[i].parentNode.removeChild(images[i]);
			}

			var load_start 	= 275;
			var load_end 	= 270;
			
			var change_start = 270;
			var change_end = 230;
			
			if (images[i].offsetLeft>load_end && images[i].offsetLeft<load_start ) {
				
				var large_src=images[i].getAttribute("src").replace("/thumb/","/medium/");
				var main_image = _this.parent.querySelectorAll("div.main_picture img")[0];
				
				var image_count = _this.parent.querySelectorAll("div.main_picture img").length;
				
				var second_image = "";
				if (image_count==1) {
					second_image = document.createElement("img")
					second_image.setOpacity(0)
					main_image.parentNode.appendChild(second_image);
				}
				
				second_image = _this.parent.querySelectorAll("div.main_picture img")[1];
				second_image.setAttribute("src",large_src);
				
				main_image.setAttribute("opacity",100);
				second_image.setAttribute("opacity",0);
				
				main_image.style.position = "absolute";
				main_image.style.top = "0px";
				second_image.style.position = "absolute";
				second_image.style.top = "0px";
				
			}
			
			if(images[i].offsetLeft>change_end && images[i].offsetLeft<change_start) {
				var large_src=images[i].getAttribute("src").replace("/thumb/","/medium/");
			
				var main_image = _this.parent.querySelectorAll("div.main_picture img")[0];
				
				if (main_image.isLandscape()) main_image.style.width = main_image.parentNode.style.width;
				else if (main_image.parentNode.xyratio >= 1) main_image.style.height = main_image.parentNode.style.height;
				
			
		
				var second_image = _this.parent.querySelectorAll("div.main_picture img")[1];
				var count = _this.parent.querySelectorAll("div.main_picture img").length;
				
				var main_opacity = parseInt(main_image.getAttribute("opacity"))-5;
				main_image.setAttribute("opacity",main_opacity);
				main_image.setOpacity(main_opacity);
				if (main_opacity<=0  && count>1) main_image.parentNode.removeChild(main_image);
				
				if(second_image!=undefined) {
					if (second_image.isLandscape()) second_image.style.width = second_image.parentNode.style.width;
					else if (second_image.parentNode.xyratio >=1) second_image.style.height = second_image.parentNode.style.height;
					var second_opacity = parseInt(second_image.getAttribute("opacity"))+5;
					second_image.setAttribute("opacity",second_opacity);
					second_image.setOpacity(second_opacity);
				}
			}
		}

		//Add new images
		if (limit_found) {
			var src =_this.url+"/images/thumb/"+thumbs[_this.parent.next_image];
			var img = document.createElement("img");
			
			img.setAttribute("src",src);
			var new_left = 5 * 150;
			img.style.left = new_left + "px";
			img.style.position = "absolute";
			img.onclick = function () {
			var large_src=this.getAttribute("src").replace("/thumb/","/medium/");;
			var main_image = _this.parent.querySelectorAll("div.main_picture img")[0];
			main_image.setAttribute("src",large_src)
			}
			var node = _this.parent.querySelectorAll("div.thumbs")[0];
			node.appendChild(img);
			limit_found = false;
		}
		
		
	}
	this.parent.animate();
	

}

gallery.prototype.confirmation = function () {
	var _this = this;
	this.parent.innerHTML=result;
	
	var thumb_area = this.parent.querySelectorAll("div.thumbs")[0];
	
	thumb_area.onmouseover = function () {
		_this.parent.do_animation = false;
	}
	
	thumb_area.onmouseout = function () {
		_this.parent.do_animation = true;
	}
	
	var thumb = this.parent.querySelectorAll("div.thumbs img");
	for (var t=0; t<thumb.length;t++) {
		thumb[t].onclick = function () {
			var large_src=this.getAttribute("src").replace("/thumb/","/medium/");;
			var main_image = _this.parent.querySelectorAll("div.main_picture img")[0];
			main_image.setAttribute("src",large_src)
		}
	}
	
	var main_area = this.parent.querySelectorAll("div.main_picture")[0];
	
	main_area.onmouseover = function () {
		_this.parent.do_animation = false;
	}
	
	main_area.onmouseout = function () {
		_this.parent.do_animation = true;
	}
	
	main_area.onclick = function () {
		_this.parent.do_animation = false;
		var preview = document.createElement("div");
		preview.style.position= "absolute";
		preview.style.top = "0px";
		preview.style.zIndex = "500";
		preview.style.backgroundColor = "white";
		preview.style.border = "1px solid black";
		
		var src = this.querySelectorAll("img")[0].getAttribute("src").replace("/medium/","/large/");
		
		preview.innerHTML = "<div class=menu>\
							<button class=close>X</button>\
							</div>\
							<img src='"+src+"'>";
		
		this.appendChild(preview)
		
		var close_button = preview.querySelectorAll("div.menu button.close")[0];
		close_button.onclick = function (event) {
			event.stopPropagation();
			var main_picture = this.parentNode.parentNode.parentNode;
			var preview = this.parentNode.parentNode;
			main_picture.removeChild(preview)
		}
	}
	
	var fast_forward_button = this.parent.querySelectorAll("button.fastforward")[0];
		fast_forward_button.onclick = function () {
			_this.parent.move=_this.parent.move*2;
			if (_this.parent.move>32)_this.parent.move=1;
		}
	 
	if(window.sessionStorage.username!=undefined) this.gallery_admin = new gallery_admin(this.parent)
}


