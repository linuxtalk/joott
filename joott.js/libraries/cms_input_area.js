cms_input_area = function (id, label_text, input_type) {

	this.id = (id != undefined) ? id  : "";
	this.label_text  = (label_text != undefined) ? label_text : "";
	
	this.input_type = (input_type != undefined)  ? input_type : "text";
	
	this.element = document.createElement("div");
	this.element.setAttribute("id", this.id + "_holder");
	
	this.label =  document.createElement("label");
	this.label.innerHTML = this.label_text;
	this.element.appendChild(this.label);
	
	
	this.input =  document.createElement("input");
	this.input.setAttribute("id", this.id);
	this.input.setAttribute("type", this.input_type);
	this.element.appendChild(this.input);
		
	return this.element;
}
