gallery_admin = function (parent) {
	var _this = this;
	this.parent = parent;
	this.url =  this.parent.getAttribute("url");
	this.main_picture = this.parent.querySelectorAll("div.main_picture")[0];

	this.main_picture.style.border = "1px dashed silver";
	//this.main_picture.style.resize = "both";
	//this.main_picture.style.overflow = "auto";
	
	this.main_picture.onclick = function () {}
	
	this.main_picture.onmousedown= function () {
		_this.resize = true;
	}
	
	document.body.onmouseup= function () {
	
		if (_this.resize) {
			var _webservice = new webservice('/modules/joott/index.php?joott_cmd=save_gallery_size&url='+_this.url+"&height="+_this.height+"&width="+_this.width, function(){nfa()});
			_this.resize = false;
		}
	}
	
	document.body.onmousemove= function (e) {
		
		if (!_this.resize) return false;
		
		//var pos = findPos(_this.main_picture)
		var pos = _this.main_picture.findPos()
		_this.width = mouseX(e) - pos[0];
		_this.main_picture.style.width = _this.width  + "px";
		
		_this.height = mouseY(e) - pos[1];
		_this.main_picture.style.height = _this.height  + "px";
		
		
	}
}


