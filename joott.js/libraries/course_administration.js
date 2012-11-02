course_administration = function () {
	var _this = this;
	this.authorize = new authorize("course");
	if (!this.authorize.logged_on) {
		this.authorize.logon();
		return false;
	}
	
	this.webservice = "<?php echo WEBSERVICE ?>";
	
	var admin_area = document.querySelectorAll("div.course_administration");
	
	if (admin_area.length==0) return false;
	this.admin_area = admin_area[0];
	this.college = this.admin_area.getAttribute("college");
	
	var params = "joott_cmd=course_admin_screen&domain=course&college="+this.college;
	var _webservice = new webservice(this.webservice+"?"+params, 
									function(){_this.compile_screen()});
	
};

course_administration.prototype.compile_screen = function () {
	var _this = this;
	this.admin_area.innerHTML = course_admin_screen;
	
	var button = this.admin_area.querySelectorAll("button[code]");

	for (var b=0;b<button.length;b++) {
		button[b].onclick = function () {
			var code = this.getAttribute("code");
			var params = "joott_cmd=course_screen&domain=course&code="+code;
			var _webservice = new webservice(_this.webservice+"?"+params, 
									function(){_this.course_screen()});
		}
	}
};

course_administration.prototype.course_screen = function () {
	var _this = this;
	var course_area=this.admin_area.querySelectorAll("div.course_details")[0] ;
	course_area.innerHTML = course_details_screen;
	
	var _rich_text= document.querySelectorAll("div.rich_text");
	if (_rich_text.length==1) this.rich_text = new rich_text();
	
	this.admin_area
		.querySelectorAll("div.course_details div.save button")[0]
		.onclick = function () {
		this.setAttribute("disabled","disabled");
		
		var params="joott_cmd=update_course&domain=course";
		var title=_this.admin_area.querySelectorAll("fieldset.title input")[0].value;
		if (title=="") {
			alert("Title is mandatory");
			return 0;
		}
	
		params+="&title="+title;
		
		var id = _this.admin_area.querySelectorAll("fieldset.id div")[0].innerHTML;
		params+="&id="+id;
		params+="&college="+_this.college;
	
		var div = _this.admin_area.querySelectorAll("fieldset div[contenteditable]");
		for (var d=0;d<div.length;d++) {
			var title = div[d].parentNode.className;
			params+="&"+title+"="+JSON.stringify(div[d].innerHTML	
									.replace(/&/g, "_amp_")
									.replace (/\\/g,"")
									.replace(/_amp_nbsp;/g,"")
									.replace(/_amp_quot;_amp_quot;/g,"_amp_quot;")
									.replace(/_amp_quot;_amp_quot;/g,"_amp_quot;")
									.replace(/_amp_quot;_amp_quot;/g,"_amp_quot;")
									.replace(/_amp_quot;_amp_quot;/g,"_amp_quot;")
									.replace(/#/g,""));			
		}

		var cbo = _this.admin_area.querySelectorAll("fieldset select");
		for (var s=0;s<cbo.length;s++) {
			var title = cbo[s].parentNode.className;
			params+="&"+title+"="+cbo[s].value;			
		}
		
		var _webservice = new webservice(_this.webservice+"?"+params, 
									function(){_this.update_course()});
	
	}
}

course_administration.prototype.update_course = function () {
    alert(records_updated + " record updated");
	this.admin_area
		.querySelectorAll("div.course_details div.save button")[0]
		.removeAttribute("disabled")
}
