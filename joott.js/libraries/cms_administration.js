cms_administration = function (button) {
	var _this = this;

	
	this.authorize = new authorize("cms");
	if (!this.authorize.logged_on) {
		this.authorize.logon();
		
		
		var form = document.querySelectorAll("div#frmlogon form")[0];
		if (form!=null) {
			form.innerHTML = "";
			var login = document.querySelectorAll("form.login_screen")[0];
			form.appendChild(login.parentNode.removeChild(login))
		}
		return false;
	}
	
	this.button = button;
	this.id = Math.floor((Math.random()*1000)+1)+"-"+Math.floor((Math.random()*1000)+1)+"-"+Math.floor((Math.random()*1000)+1);
	
	this.button.setAttribute("cms_id",this.id);
	
	this.button.onclick = function () {
		this.setAttribute("disabled","disabled");
		_this.body = document.createElement("div");
		_this.body.className="cms_admin_area";
		_this.body.style.backgroundColor="white";
		_this.body.style.position="absolute";
		_this.body.style.zIndex=500;
		_this.body.setOpacity(0);
		
		var menu = document.createElement("div");
		menu.style.backgroundColor="white";
		menu.className = "menu";
		
		var close_button = new cms_button_close();
		close_button.onclick = function () {
			_this.body.fadeout();
			_this.body.parentNode.removeChild(_this.body);
			_this.button.removeAttribute("disabled");
		}
		
		menu.appendChild(close_button);
		_this.body.appendChild(menu);

		_this.body.appendChild(new cms_user_details());
		_this.body.appendChild(new cms_user_roles());
		_this.body.appendChild(new cms_new_user());
	
		document.getElementById("page").appendChild(_this.body);
		_this.body.fadein();
		
	}
}
