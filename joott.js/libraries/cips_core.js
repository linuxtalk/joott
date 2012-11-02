cips_core = function () {
	var _this =  this;
	this.element = document.getElementById("cips_core");
	
	this.element.innerHTML = "Loading...";
	
	var _webservice = new webservice('<?php echo WEBSERVICE ?>?joott_cmd=get_core&domain=cips', _this.show_core);
	
}

cips_core.prototype.show_core = function () {
	this.element = document.getElementById("cips_core");
	this.element.innerHTML = core_data;
}

