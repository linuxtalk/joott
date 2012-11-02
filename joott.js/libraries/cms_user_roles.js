cms_user_roles = function () {
	var _this = this;
	this.element = document.createElement("div");
	this.element.className = "cms_user_roles";
	
	var _cms_menu_button = new cms_menu_button();
	
	_cms_menu_button.onclick = function () {
		var query = "."+_this.element.className + " .admin_panel";
		if (document.querySelectorAll("."+_this.element.className + " .admin_panel").length>0) return false;
		_this.show_admin_panel();
	}
	
	this.element.appendChild(_cms_menu_button);
	
	return this.element;
}

cms_user_roles.prototype.show_admin_panel = function () {
	var _this = this;
	this.admin_panel = document.createElement("div");
	this.admin_panel.className = "admin_panel";
	
	var close_button = new cms_button_close(this.element.className, this.admin_panel.className);
	
	this.admin_panel.appendChild(close_button)
	this.element.appendChild(this.admin_panel)
}
