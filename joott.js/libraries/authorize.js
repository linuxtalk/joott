<?php 
$a = session_id();
if(empty($a)) session_start();

session_id(1223);
?>
var is_logged_on_result=2;
authorize = function (domain) {

	var _this = this;
	this.domain = (domain) ? domain : "cips";
	this.webservice = "<?php echo WEBSERVICE ?>";
	
	if (sessionStorage.getItem("joott_is_logged_on")) {
		this.logged_on = true;
		this.add_logout();
	}
};

authorize.prototype.logon = function () {
	var _this = this;
	this.form = document.createElement("form");
	this.form.innerHTML = "<fieldset class= fs_user><legend>Username</legend><input id=username></fieldset>";
	this.form.innerHTML += "<fieldset class=fs_pass><legend>Password</legend><input id=password type=password></fieldset>";
	this.form.innerHTML += "<div><button>Log In</button></div>";
	this.form.style.position = "absolute";
	this.form.className="login_screen";
	document.body.appendChild(this.form);
	
	this.form.querySelectorAll("button")[0].onclick = function (e) {
	
	    if(!e) var e = window.event;
 
		e.cancelBubble = true;
		e.returnValue = false;

		if ( e.stopPropagation ) e.stopPropagation();
		if ( e.preventDefault ) e.preventDefault();

		var username = this.form.querySelectorAll("input#username")[0].value;
		var password = this.form.querySelectorAll("input#password")[0].value;
		var params="username="+username+"&password="+password;
		var _webservice = new webservice(_this.webservice+"?joott_cmd=do_login&domain="+_this.domain+"&"+params, 
									function(){_this.do_login()}); 
	}
};

authorize.prototype.do_login = function () {
	//setTimeout(function(){window.location.reload()},1000);
};

authorize.prototype.logout = function () {
	sessionStorage.removeItem("joott_is_logged_on");
};

authorize.prototype.add_logout = function () {
	var _this = this;
	var button = document.createElement("button");
	button.setAttribute("auto_generated","true");
	button.innerHTML = "Log Out";
	button.onclick = function () {
		_this.logout();
		window.location.reload();
	}
	document.body.appendChild(button);
};
