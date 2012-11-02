
media_area = function (parentNode){
	
	var _this = this
	
	this.parentNode = parentNode;
	
					var new_button = document.createElement("div");
					new_button.className = "media_insert_area";
					new_button.setAttribute("draggable","true")
					parentNode.appendChild(new_button);
					
					new_button.ondragstart = function (e) {
						e.dataTransfer.effectAllowed='move';
						e.dataTransfer.setData("Text", e.target.getAttribute('id'));
					}
					
					new_button.ondragend = function (e) {
						var selObj=window.getSelection();
						
						var selRange = selObj.getRangeAt(0);
						selRange.insertNode(this);
						this.className = "inserted_node";
						
						this.setAttribute("contextmenu", "media_edit");
						this.setAttribute("id","media-"+Math.floor((Math.random()*1000)+1) )
						
					}
					
					new_button.onmouseover = function () {
							
						
							_storage.media_box =  this;
							_storage.x++;
							
							
							_this.media_box = this;
							sessionStorage.media_box = this.getAttribute("id");
							if (_this._media_form) {
								
								_this._media_form.media_box = this;
							}
					}
}
