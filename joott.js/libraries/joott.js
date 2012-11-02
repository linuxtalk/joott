joott = function (domain,id) {
	//The Constructor
	var _this = this;
	if ( ! sessionStorage.getItem("joott_session_id")) {
		sessionStorage.setItem("joott_session_id",this.id());
	}
	
	sessionStorage.setItem("joott_domain",domain);
	
	if(window.addEventListener) {
		window.addEventListener('load', function () {_this.load();_this.scroll()}, false);
		window.addEventListener('scroll', function () {_this.scroll()}, false);
		window.addEventListener('resize', function () {_this.scroll()}, false);
	} else if(window.attachEvent) {
		window.attachEvent('onload', function () {_this.load();_this.scroll()});
		window.attachEvent('onscroll',function () {_this.scroll()});
		window.attachEvent('onresize',function () {_this.scroll()});
	}
}

joott.prototype.id = function () {
	var id = Math.floor((Math.random()*1000)+1)+
			"-"+Math.floor((Math.random()*1000)+1)+
			"-"+Math.floor((Math.random()*1000)+1);
	return id;
}


joott.prototype.scroll = function() {
	var widget = document.querySelectorAll("div[type=prospectus]");
	if (widget.length==1){
	
		var scroll = posTop();
		widget[0].style.top=scroll+50+"px";
		var page = document.querySelectorAll("div.page")[0]
		widget[0].style.left = page.offsetLeft+ page.offsetWidth - 215 + "px";
	}
}

joott.prototype.load = function() {

	this.browser_check = new browser_check();
	
	if (!this.browser_check.valid) return false;
	
	var form = document.querySelectorAll("form.online_application");
	if (form.length==1) this.application_form = new application_form();
	
	var mobile_content = document.querySelectorAll("body.mobile_content");
	if (mobile_content.length==1) this.mobile = new mobile_app();
	
	var _cips_administration = document.querySelectorAll("body.cips_administration");
	if (_cips_administration.length==1) this.cips_administration = new cips_administration();
	
	var _cips_animation = document.querySelectorAll("div#cips_animation");
	if (_cips_animation.length==1) this.cips_animation = new cips_animation();
	
	var _cips_core = document.querySelectorAll("div#cips_core");
	if (_cips_core.length==1) this.cips_core = new cips_core();
		
	var _pqbf = document.querySelectorAll("body.pqbf");
	if (_pqbf.length==1) this.pqbf = new pqbf();
	
	var _course_administration= document.querySelectorAll("div.course_administration");
	if (_course_administration.length==1) this.course_administration = new course_administration();
	
	var gallery_list = document.querySelectorAll("div.gallery");
	for (var g=0;g<gallery_list.length;g++) {
		this.gallery = new gallery(g);
	}
	
	var _rich_text= document.querySelectorAll("div.rich_text");
	if (_rich_text.length==1) this.rich_text = new rich_text();
	
	var _course_search= document.querySelectorAll("div.course_search");
	if (_course_search.length==1) this.course_search = new course_search();
	
	var _cms_admin=document.querySelectorAll("button#cms_admin, div#frmlogon");
	if (_cms_admin.length>0) this.cms_administration = new cms_administration(_cms_admin[0]);
	
	
	this.widget = new widget();
}