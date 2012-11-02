/*
* cips_administration prototype
* Author: M.A.Bain
*/
cips_administration = function () {
	var _this = this;
	
	this.authorize = new authorize("cips");
	if (!this.authorize.logged_on) {
		this.authorize.logon();
		return false;
	}
	
	this.webservice = "<?php echo WEBSERVICE ?>";
	
	var admin_area = document.querySelectorAll("div.cips_administration");
	
	if (admin_area.length==0) return false;
	this.admin_area = admin_area[0];
	
	var _webservice = new webservice(this.webservice+"?joott_cmd=behaviour_admin_screen&domain=cips", 
									function(){_this.compile_screen()});
}

cips_administration.prototype.migrate_done = function () {

}

cips_administration.prototype.compile_screen = function () {
	var _this = this;
	if( typeof behaviour_admin_screen != "undefined")this.admin_area.innerHTML = behaviour_admin_screen;

	
	var button = this.admin_area.querySelectorAll("div.behaviour_level_menu button[code]");
	for (var b=0;b<button.length;b++) button[b].onclick = function () {
	
		for (var b1=0;b1<button.length;b1++) button[b1].removeClass("code_button_clicked");
		this.addClass("code_button_clicked");
		_this.code = this.getAttribute("code");
		var behaviour_edit = _this.admin_area.querySelectorAll("div.behaviour_edit")[0];
		behaviour_edit.innerHTML = "";
		var _webservice = new webservice(_this.webservice+"?joott_cmd=edit_behaviour_screen&domain=cips&code="+_this.code, 
									function(){_this.edit_behaviour()});
	}

	this.admin_area.querySelectorAll("div.behaviour_level_menu button[migrate]")[0].onclick = function () {
		if (!confirm("This will migrate behaviours 1 to 7 from CL to all other levels")) return false;
		var _webservice = new webservice(_this.webservice+"?joott_cmd=cips_migrate&domain=cips", 
									function(){_this.migrate_done()});
	}
	
	var add_area = document.createElement("div");
	add_area.className = "sub_menu";
	
	var matrix_button = document.createElement("button");
	matrix_button.innerHTML = "Grade Matrix";

	matrix_button.onclick = function () {
		var behaviour_edit = _this.admin_area.querySelectorAll("div.behaviour_edit")[0];
		behaviour_edit.innerHTML = "";
		var _webservice = new webservice(_this.webservice+"?joott_cmd=load_job_matrix&domain=cips", 
									function(){_this.load_job_matrix()});
	}

	var lookup_button = document.createElement("button");
	lookup_button.innerHTML = "Search Matrix";
	lookup_button.onclick=function () {
		
		var behaviour_edit = _this.admin_area.querySelectorAll("div.behaviour_edit")[0];
		behaviour_edit.innerHTML = "<div class=level_list><div level=1>CL</div><div level=2>PF</div><div level=3>BL</div><div level=4>SL</div></div><div class=behaviour_id_list></div><div class=behaviour_text></div>";
		var level = _this.admin_area.querySelectorAll("div.level_list div");
		for (var l=0; l<level.length;l++) {
			level[l].onclick = function () {
				_this.admin_area.querySelectorAll("div.behaviour_id_list")[0].innerHTML="<img src=\"/images/time.jpg\">";
			    _this.admin_area.querySelectorAll("div.behaviour_text")[0].innerHTML="";
				var params="level="+this.getAttribute("level");
				var _webservice = new webservice(_this.webservice+"?joott_cmd=get_behaviour_list&domain=cips&"+params, 
									function(){_this.get_behaviour_list()});
			}
		}
	}
	
	var logout_button = document.createElement("button");
	logout_button.innerHTML = "Log Out";
	logout_button.onclick=function () {
		_this.authorize.logout();
		window.location.reload();
	}
	
	add_area.appendChild(matrix_button);
	add_area.appendChild(lookup_button);
	add_area.appendChild(logout_button);
	
	this.admin_area.querySelectorAll("div.behaviour_level_menu")[0].appendChild(add_area);
	
	
}

cips_administration.prototype.get_behaviour_list = function () {
	var _this = this;
	var div_behaviour_id_list = this.admin_area.querySelectorAll("div.behaviour_id_list")[0];
	div_behaviour_id_list.innerHTML=behaviour_id_list;
	
	
	var id_list =  this.admin_area.querySelectorAll("div.behaviour_id_list div");
	for (var b=0; b<id_list.length;b++) {
		id_list[b].onclick = function () {
			_this.admin_area.querySelectorAll("div.behaviour_text")[0].innerHTML="<img src=\"/images/time.jpg\">";
			var params="level="+this.getAttribute("level")+
						"&behaviour="+this.innerHTML;
			var _webservice = new webservice(_this.webservice+"?joott_cmd=get_behaviour_text&domain=cips&"+params, 
									function(){_this.get_behaviour_text()});
		}
	}
}

cips_administration.prototype.get_behaviour_text = function () {
	var div_behaviour_text =   this.admin_area.querySelectorAll("div.behaviour_text")[0];
	div_behaviour_text.innerHTML = behaviour_text_result;
	

}

cips_administration.prototype.set_behaviour_status = function () {
}

cips_administration.prototype.edit_behaviour = function () {
	var _this = this;
	var behaviour_edit = this.admin_area.querySelectorAll("div.behaviour_edit")[0];
	
	behaviour_edit.innerHTML = edit_behaviour_screen;
	


	
	var checkbox = this.admin_area.querySelectorAll("div.behaviour_row > input[type=checkbox]");
	for (var cb=0; cb< checkbox.length; cb++) {
		checkbox[cb].onclick = function () {
			var behaviour_id = this.getAttribute("behaviour_id");
			var value = this.checked;
			var params="behaviour_id="+behaviour_id+"&value="+value;
			var _webservice = new webservice(_this.webservice+"?joott_cmd=set_behaviour_status&domain=cips&"+params, 
									function(){_this.set_behaviour_status()});
		}
	}
	
	var behaviour_list = this.admin_area.querySelectorAll("div.behaviour_row > div");
	for (var bl=0;bl<behaviour_list.length;bl++) {
		behaviour_list[bl].onclick = function () {
			var edit_box = _this.admin_area.querySelectorAll("div.behaviour_list")[0].nextSibling;
		
			var id = this.querySelectorAll("span.behaviour_id")[0].innerHTML;
			var text = this.querySelectorAll("span.behaviour_text")[0].innerHTML;
			
			var id_edit = edit_box.querySelectorAll("span.behaviour_id input")[0];
			var text_edit = edit_box.querySelectorAll("span.behaviour_text input")[0];
			
			id_edit.value = id;
			text_edit.value = text;
			
			window.scrollTo(0,edit_box.offsetTop);
	
		}
		
		behaviour_list[bl].onmouseover = function () {
			this.className="behaviour_list_highlight";
		}
		
		behaviour_list[bl].onmouseout = function () {
			this.className="";
		}
	}
	
	behaviour_edit.querySelectorAll("button")[0].onclick = function () {
		var _button = this;
		var code = this.getAttribute("code");
		var id = this.parentNode.querySelectorAll("span.behaviour_id input")[0].value;
		var text = this.parentNode.querySelectorAll("span.behaviour_text input")[0].value;
		if(text==""||id=="") {
			return false;
		}
		var params = "code="+code+"&id="+id+"&text="+text;
		var _webservice = new webservice(_this.webservice+"?joott_cmd=save_behaviour&domain=cips&"+params, 
									function(){_this.save_behaviour()})
	}
}

cips_administration.prototype.save_behaviour = function () {
	var _this = this;
	
	var behaviour_list_area = _this.admin_area.querySelectorAll(".behaviour_list")[0]
	behaviour_list_area.innerHTML = behaviour_list;
	
	this.admin_area.querySelectorAll("span.behaviour_text input")[0].value = "";
	this.admin_area.querySelectorAll("span.behaviour_id input")[0].value++;

	//alert(this.code);
	var _webservice = new webservice(_this.webservice+"?joott_cmd=edit_behaviour_screen&domain=cips&code="+_this.code, 
									function(){_this.edit_behaviour()});
	//this.edit_behaviour();
}

cips_administration.prototype.load_job_matrix=function() {
	var _this = this;
	
	var behaviour_edit = this.admin_area.querySelectorAll("div.behaviour_edit")[0];
	behaviour_edit.innerHTML = job_matrix;
	this.job_commands();
	
	this.admin_area.querySelectorAll("button.btn_add_job")[0].onclick = function () {
		
		var job = this.parentNode.querySelectorAll("input")[0].value;
		this.parentNode.querySelectorAll("input")[0].value = "";
		
		//_this.admin_area.querySelectorAll("div.job_matrix")[0].innerHTML="<img src=\"/images/time.jpg\">"
		if (job=="")return false;
		var params = "job_title=" + job;
		
		var _webservice = new webservice(_this.webservice+"?joott_cmd=save_job&domain=cips&"+params, 
									function(){_this.save_job()})
	}
}

cips_administration.prototype.save_job = function () {
	var job_list = this.admin_area.querySelectorAll("div.job_matrix")[0];
	job_list.innerHTML=job_details;
	this.job_commands()
}

cips_administration.prototype.job_commands = function () {
	var _this = this;

	var job = this.admin_area.querySelectorAll("div.job_list > div");
	for(var j=0;j<job.length;j++) {
		job[j].onclick = function () {
			_this.admin_area.querySelectorAll("div.matrix_body")[0].innerHTML="<img src=\"/images/time.jpg\">";
			var job_title= _this.admin_area.querySelectorAll("div.job_title")[0];
			job_title.innerHTML = "<h1>"+this.innerHTML+"</h1>";
			var params="job_title="+this.innerHTML+"&job_id="+this.getAttribute("job_id");
			var _webservice = new webservice(_this.webservice+"?joott_cmd=get_job_matrix&domain=cips&"+params, 
									function(){_this.get_job_matrix()})
		}
	}
}

cips_administration.prototype.get_job_matrix = function () {
	var _this = this;
	
	var matrix_body = this.admin_area.querySelectorAll("div.matrix_body")[0];
	matrix_body.innerHTML = job_behaviour_matrix;
	
	
	var behaviour_row = this.admin_area.querySelectorAll("div.behaviour_row");
	for (var br=0; br<behaviour_row.length;br++){
		behaviour_row[br].onmouseover = function () {
			this.style.backgroundColor = "silver";
		}
		behaviour_row[br].onmouseout = function () {
			this.style.backgroundColor = "white";
		}
	}
	
	var checkbox = this.admin_area.querySelectorAll("div.behaviour_row input[type=checkbox]");
	for (c=0;c<checkbox.length;c++) {
		checkbox[c].onclick = function () {
			var params=	"checked="+this.checked +
						"&job_id="+this.getAttribute("job_id")+
						"&code="+this.getAttribute("code")+
						"&behaviour_id="+this.getAttribute("behaviour_id")
			var _webservice = new webservice(_this.webservice+"?joott_cmd=save_job_matrix&domain=cips&"+params, 
									function(){_this.save_job_matrix()})
		}
	}
}

cips_administration.prototype.save_job_matrix = function () {


}


