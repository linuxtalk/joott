
application_form_submit = function (button) {
	var _this = this;
	this.button = button;
	
	this.form = document.querySelectorAll("form.online_application")[0];
	
	this.button.onclick = function(e) {
		e.preventDefault();
		
		if(_this.do_validation()) {
			var data = JSON.stringify(_this.compile_data());
			var _webservice = new webservice('<?php echo WEBSERVICE ?>?data='+data, function(){_this.confirmation(response)});
		}
	}
}

application_form_submit.prototype.confirmation = function (reference) {
	this.confirmation_box = this.form.querySelectorAll("div.confirmation_box");
	if (this.confirmation_box.length==0) {
		var confirmation_box = document.createElement("div");
		confirmation_box.className = "confirmation_box";
		this.form.appendChild(confirmation_box);
		this.confirmation_box = confirmation_box;
	} else this.confirmation_box = this.confirmation_box[0];
	
	this.confirmation_box.innerHTML = "Thank you for your details<br> Your reference is "+reference+"<br>Please keep this for your records";
	
	var hide_element = this.form.querySelectorAll("input, textarea, button, label, .notes");
	for (var h=0; h<hide_element.length; h++) hide_element[h].parentNode.removeChild( hide_element[h])
}

application_form_submit.prototype.compile_data = function () {
	var input = this.form.querySelectorAll("input,textarea,select");
	var data = {};
	data["pathname"] = window.location.pathname;
	data["hostname"] = window.location.hostname;
	
	var title = this.form.querySelectorAll("h2");
	data["title"] = (title.length>0) ? title[0].innerHTML : "Online Enquiry";
	
	for (var i=0; i<input.length; i++) {
		var name = input[i].getAttribute("name")
		var value = input[i].value;
		data[name] = value;
	}
	return data;
}

application_validation_error = function(error){
	this.form = document.querySelectorAll("form.online_application")[0];
	this.load(error);
}

application_validation_error.prototype.load = function (error) {
	this.error_box = this.form.querySelectorAll("div.error_box");
	if (this.error_box.length==0) {
		var error_box = document.createElement("div");
		error_box.className = "error_box";
		this.form.appendChild(error_box);
		this.error_box = error_box;
	} else this.error_box = this.error_box[0];
	
	this.error_box.innerHTML = error;
}

application_form_submit.prototype.do_validation = function() {
	var _this = this;
	var _error = new application_validation_error("");
	var validation_passed = true;
	var required = this.form.querySelectorAll("input[required], textara[required], select[required]");
	for(var r=0;r<required.length;r++) {
		if (required[r].value=="") {
			validation_passed = false;
			required[r].addClass("validation_failed")
		} else {
			required[r].removeClass("validation_failed")
		}
	}
	if (!validation_passed) {
		_error.load("Please complete required details");
		return false;
	} else {
	    _error.load("");
		return true;
	}
}

application_form = function () {
	var _this = this;
	this.form = document.querySelectorAll("form.online_application")[0];
	
	this.form.setAttribute("action","javascript:void(0)");
	
	var controls = document.createElement("div");
	controls.innerHTML = "<button class=submit_button>Send</button>";
	this.form.appendChild(controls);
	this.submit_button = new application_form_submit (controls.querySelectorAll("button.submit_button")[0]);
	
	
	var options =  this.form.querySelectorAll("option[specify]");
	for (var o=0;o<options.length;o++) {
		options[o].parentNode.onchange = function () {
			var alternate_input = this.options[this.selectedIndex].getAttribute("specify")
			var box = this.parentNode.querySelectorAll("input.specify,br.specify")
			for (var b=0; b< box.length; b++) this.parentNode.removeChild(box[b]);
			
				
			if (alternate_input) {
				var br = document.createElement("br");
				br.className = "specify";
				this.parentNode.appendChild(br)
	
				box = document.createElement("input");
				box.className = "specify";
				box.setAttribute("name",this.getAttribute("name")+"_specify");
				this.parentNode.appendChild(box);
			};	
		}
	}
	
	var radio = this.form.querySelectorAll("input[type=radio][specify]");
	for (var r=0; r<radio.length;r++) {
		radio[r].onclick = function () {
			var name = this.getAttribute("name")+"_specify";
			if (this.parentNode.querySelectorAll("input.specify").length ==0) {;
			box = document.createElement("input");
			box.className = "specify";
			box.setAttribute("name",this.getAttribute("name")+"_specify");
			this.parentNode.appendChild(box);
			}
		}
	}
	
	if (document.getElementById("footer")) {
		var footer = document.getElementById("footer");
		footer.style.top = this.form.offsetTop + this.form.offsetHeight + 500+ "px";
	}
};
