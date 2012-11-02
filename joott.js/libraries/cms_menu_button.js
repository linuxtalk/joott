cms_menu_button = function (name) {
	var _this = this;
	
	this.name = (name != undefined) ? name : "";
	this.element = document.createElement("div");
	this.element.className = "cms_menu_button";
	
	this.header = document.createElement("div");
	this.header.className = "header";
	this.header.style.minWidth = "100px";
	this.header.style.minHeight = "50px";
	this.element.appendChild(this.header);
	
	this.body = document.createElement("div");
	this.body.innerHTML = this.name ;
	this.body.style.minWidth = "100px";
	this.body.style.minHeight = "50px";
	this.element.appendChild(this.body);
	this.body.className = "body";
	
	return this.element;
}
