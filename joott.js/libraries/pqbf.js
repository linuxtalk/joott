pqbf = function () {
	var _this = this;
	
	this.webservice = "<?php echo WEBSERVICE ?>";
	this.jobs = _(".jobs")[0];
	this.load();
}

pqbf.prototype.load = function () {
	var _this = this;
	this.load_jobs();
}

pqbf.prototype.button_code = function () {
	var _this = this;
	var buttons = _(".jobs span");
	if (buttons) for (var b=0; b<buttons.length;b++ ) {
		buttons[b].onclick = function () {
			var job_id = this.getAttribute("job_id");
			
			_("div.job_title")[0].innerHTML="<h2>"+this.innerHTML+"</h2";
			
			//_this.hide_all();
			
			var params="job_id="+job_id;
			var _webservice = new webservice(_this.webservice+"?joott_cmd=pqbf_b_list&domain=cips&"+params, 
									function(){_this.show_b_list()});		
		}
	}
	_(".jobs select")[0].onchange = function () {
		if (this.value==0) return false;
		
		var job_id = this.value;
		var text = this.options[this.selectedIndex].text
		_("div.job_title")[0].innerHTML="<h2>"+text+"</h2";
		
		_this.hide_all();
			
		var params="job_id="+job_id;
		var _webservice = new webservice(_this.webservice+"?joott_cmd=pqbf_b_list&domain=cips&"+params, 
									function(){_this.show_b_list()});	
	}
	
	
	jQuery("div.header").not("div.core.header").click(function () {
		jQuery(this.parentNode.querySelectorAll("div.behaviour_body")[0]).stop().slideToggle();
		//alert(2)
	})
	
	var core_header = _("div.core.header");
	for (var ch=0; ch<core_header.length; ch++) {
		core_header[ch].onclick = function () {
			var core_behaviour_body = this.parentNode.querySelectorAll("div.core_behaviour_body")[0];
			if (core_behaviour_body.innerHTML != "") {
	
				var arrowupdown = _("arrowupdown");
				if (arrowupdown.style.backgroundPosition == "" || arrowupdown.style.backgroundPosition == "0px 3px") arrowupdown.style.backgroundPosition = "0px -40px";
				else arrowupdown.style.backgroundPosition = "0px 3px";
				//jQuery(_this.core).slideUp();
				jQuery(core_behaviour_body).stop().slideToggle();
				
			}
		}
	}
}

pqbf.prototype.hide_all = function () {

	jQuery(".behaviour_body").slideUp();

}
pqbf.prototype.load_jobs = function () {
	var _this = this;
	var _webservice = new webservice(this.webservice+"?joott_cmd=pqbf_job_list&domain=cips", 
									function(){_this.show_jobs()});
}

pqbf.prototype.show_jobs = function () {
	this.jobs.innerHTML=pqbf_job_list_result;
	this.button_code();
}

pqbf.prototype.show_b_list = function () {
	var _this = this;

	this.core = document.querySelectorAll("div.core div.core_behaviour_body")[0]
	this.core.innerHTML = core_data;
	jQuery(this.core).stop().slideUp();
	this.hide_all();
	
	var pape = document.querySelectorAll("div.pape div.behaviours")[0]
	pape.innerHTML = pape_data;

			
	var badsv = document.querySelectorAll("div.badsv div.behaviours")[0]
	badsv.innerHTML = badsv_data;
			
	var aadm = document.querySelectorAll("div.aadm div.behaviours")[0]
	aadm.innerHTML = aadm_data;
			
	var cbi = document.querySelectorAll("div.cbi div.behaviours")[0]
	cbi.innerHTML = cbi_data;
			
	var dr = document.querySelectorAll("div.dr div.behaviours")[0]
	dr.innerHTML = dr_data;
			
	var bpr = document.querySelectorAll("div.bpr div.behaviours")[0]
	bpr.innerHTML = bpr_data;
			
	var cc = document.querySelectorAll("div.cc div.behaviours")[0]
	cc.innerHTML = cc_data;

	if (pape_data=="" &&  badsv_data=="" &&  aadm_data=="" &&  cbi_data=="" &&  dr_data=="" &&  bpr_data=="" && cc_data=="") jQuery(this.core).stop().slideDown();
	
	else {
	

	jQuery("div.behaviour_body").stop().slideDown();
	
	jQuery("div.behaviour").each(function () {
		if  (jQuery(this).html()=="") jQuery(this).css({"background-color":"#AFE"})
	})
	}
};

pqbf.prototype.slideDown = function (element) {
	var b1 = element.querySelectorAll("div.behaviour_holder div.num.behaviour");
	var h1 = 110;
	for (var b=0; b<b1.length; b++) h1+= b1[b].offsetHeight;
	var r1 = element.slideDown(h1);
	return r1
}


