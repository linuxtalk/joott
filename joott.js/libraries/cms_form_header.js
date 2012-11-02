cms_form_header = function (classname, text) {
	var h3 = document.createElement("h3");
	
	var h3_image = document.createElement("div");
	h3_image.className = "user_icon";
	h3.appendChild(h3_image);
	
	var h3_text = document.createTextNode(text); 
	h3.appendChild(h3_text);
	
	h3.className = classname;
	
	return h3;
}
