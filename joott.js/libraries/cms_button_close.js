cms_button_close = function (parent_class, element_class, button_text) {
	var _this = this;
	
	this.parent_class = parent_class;
	this.element_class = element_class;
	this.button_text = button_text;
	
	this.close_button = document.createElement("div");
	//this.close_button.innerHTML= "[&times;]";
	
	this.close_button.style.cssFloat =  "right";
	this.close_button.style.cursor = "pointer";
	this.close_button.className = "cms_button_close";
	
	this.close_button.onclick = function () {
	
		var query="."+_this.parent_class+" ."+_this.element_class
		var admin_element = document.querySelectorAll(query)[0];
		admin_element.fadeout()
		admin_element.parentNode.removeChild(admin_element);
	}
	
	return this.close_button;
}
