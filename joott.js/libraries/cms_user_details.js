cms_user_details = function () {
	var _this = this;
	this.core = new core();
	
	this.element = document.createElement("div");
	this.element.className = "cms_user_details";
	
	var _cms_menu_button = new cms_menu_button();
	
	_cms_menu_button.onclick = function () {
		var query = "."+_this.element.className + " .admin_panel";
		if (document.querySelectorAll("."+_this.element.className + " .admin_panel").length>0) return false;
		_this.show_admin_panel();
	}
	
	this.element.appendChild(_cms_menu_button);
	

	return this.element;
}

cms_user_details.prototype.show_admin_panel = function () {
	var _this = this;
	this.admin_panel = document.createElement("div");
	this.admin_panel.className = "admin_panel";
	this.admin_panel.setAttribute("id","admin_panel_holder");
	var close_button = new cms_button_close(this.element.className, this.admin_panel.className);
	
	this.admin_panel.appendChild(close_button)
	
	this.admin_panel.appendChild(new cms_form_header("addusertitle","Update User Details"));
	
	this.admin_panel.appendChild(new cms_input_area("admin_panel_username","Username: <em>*</em>"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_email","Email: <em>*</em>"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_firstname","First Name: <em>*</em>"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_lastname","Last Name: <em>*</em>"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_password","Password: <em>*</em>","password"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_confirmpassword","Confirm Password: <em>*</em>","password"));
	this.admin_panel.appendChild(new cms_input_area("admin_panel_role","Role: <em>*</em>"));

	this.element.appendChild(this.admin_panel);
	
	var params = "&domain=cms&sub_domain="+_this.core.sub_domain+"&user="+sessionStorage.getItem("joott_user");
	var _webservice = new webservice(_this.core.webservice+"?joott_cmd=get_cms_user_details"+params, 
									function(){_this.get_details()});
	
}

cms_user_details.prototype.get_details = function () {
	document.getElementById("admin_panel_username").value = username;
	document.getElementById("admin_panel_email").value = email;
	document.getElementById("admin_panel_firstname").value = firstname;
	document.getElementById("admin_panel_lastname").value = surname;
	document.getElementById("admin_panel_role").value = role;
	document.getElementById("admin_panel_role").setAttribute("disabled","disabled");
}


