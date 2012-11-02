
cms_new_page = function (parentNode) {

	this.parentNode = parentNode;
	
	this.ref_no = this.parentNode.querySelectorAll("div.sub_drag").length;
	

	this.getTitle();

	//var new_page = document.createElement("div");
	//new_page.className = "sub_drag";
	//new_page.setAttribute("draggable","true");
	//new_page.innerHTML =  "<img src=\"/modules/templates/default/forms/images/folder.gif\">";
	//new_page.innerHTML += "<span contenteditable=\"true\">"+ this.title + "</span>";

	//if (parentNode == undefined) return new_page;
	//else {
	//	console.log()
	//	parentNode.appendChild(new_page);
	//}
}

cms_new_page.prototype.getTitle = function () {
	var _this = this;
	this.inputbox = document.createElement("div");
	this.inputbox.className = "sub_drag";
	this.inputbox.setAttribute("draggable","true");
	this.inputbox.style.width = "270px";
	this.inputbox.style.backgroundImage = "none";

	var img = document.createElement("img");
	img.src = "/modules/templates/default/forms/images/folder.gif";
	
	this.input = document.createElement("input");
	this.input.onfocus = function () {
		this.parentNode.removeAttribute("draggable");
		this.parentNode.parentNode.removeAttribute("draggable");
	}
	this.input.onblur = function () {
		this.parentNode.setAttribute("draggable","true");
		this.parentNode.parentNode.setAttribute("draggable","true");
	}
	this.input.onkeyup = function () {
		if (this.value == "") _this.button.setAttribute("disabled","disabled");
		else _this.button.removeAttribute("disabled");
	}

	this.button = document.createElement("button");
	this.button.innerHTML = "Save";
	this.button.style.width="75px";
	this.button.setAttribute("disabled","disabled");
	this.button.onclick  = function () {_this.create_page()}
	
	this.inputbox.appendChild(img);
	this.inputbox.appendChild(this.input);
	this.inputbox.appendChild(this.button);
	
	this.parentNode.appendChild(this.inputbox);
}

cms_new_page.prototype.create_page = function () {

	this.parentArea = this.parentNode.querySelectorAll("span.top_drag_head")[0].innerHTML;
	
	var new_page = this.input.value.replace(/ /g,"_").toLowerCase();
	var id_no = this.parentNode.querySelectorAll("div.sub_drag").length-1;
	var params = "cms_save_page=true&area="+this.parentArea+"&new_page="+new_page+"&id_no="+this.ref_no+"&header="+this.input.value;
	var _webservice = new webservice("/modules/joott/?" + params, this.show_result);
}

cms_new_page.prototype.show_result = function () {

}

