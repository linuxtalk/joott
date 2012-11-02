
context_menu = function (id,parent) {
	var _this = this;
	this.id=id;
	
	this.tier = new obj_tier();

	var html = this.tier.request("cms_action=add_context_menu&context_menu="+id,_this.add_context_menu);
	this.add_context_menu(html)
	this.add_functionality();
	return this;
}

context_menu.prototype.add_context_menu = function (result) {
	var contextmenu = document.createElement("div");
	contextmenu.innerHTML = result;
	document.body.appendChild(contextmenu);

}

context_menu.prototype.add_functionality = function (){
	var _this = this;
	switch (this.id) {
		case "menu_info_area":
			var info_area_edit = document.getElementById("info_area_edit");
			if (info_area_edit) info_area_edit.onclick = function () {
				var frm_info_panel = new cms_form("frm_info_panel",_this);
				var template_list = document.querySelectorAll("div.template_list")[0];
				var frm_info_panel = document.getElementById("frm_info_panel");
				
				template_list.appendChild(frm_info_panel);
				
				
				
			}
		break;
		case "menu_cms_preview":
			var cms_preview_html = document.getElementById("cms_preview_html");
			cms_preview_html.onclick = function(e) {
				var frm_preview_html_edit = new cms_form("frm_preview_html_edit",_this);
				var frm_preview_html_edit = document.getElementById("frm_preview_html_edit");
				frm_preview_html_edit.classList.add("frm_preview_html_edit");
				
				
				var cms_preview = document.getElementById("cms_preview");
				
				var template_url = document.getElementById("template_url");
				
				template_url.value = _this.tier.request("cms_action=get_template_url&file_ref="+cms_preview.getAttribute("file_ref"));
				
				var quit_template_edit = document.getElementById("quit_template_edit");
				var template_media = document.getElementById("template_media")
				_storage.media_box = template_media;
				var _media_form = new media_form(cms_preview.getAttribute("file_ref"));

				
			}
			
			var close_cms_preview_html = document.getElementById("close_cms_preview_html");
			close_cms_preview_html.onclick = function () {
				try{document.getElementById("quit_template_edit").onclick()}catch(err){}
				try{document.querySelectorAll("div.media_form_controls div.media_close")[0].onclick()}catch(err){}
				var cms_preview = document.getElementById("cms_preview");
				cms_preview.parentNode.removeChild(cms_preview);
			}
		break;
		
		case "menu_concertina":
			var cms_concertina_edit = document.querySelectorAll("#menu_concertina #cms_concertina_edit")[0];
			cms_concertina_edit.onclick = function () {
				 var frm_concertina = new cms_form("frm_concertina");
			}
		break;
		
		case "menu_image_control":
			
			if(document.getElementById("image_edit"))document.getElementById("image_edit").onclick = function () {
				var _media_form = new media_form(_storage.current_image.getAttribute("src"))
			}
		
		break;
		
		case "new_menu_item":
			document.getElementById("cms_new_page").onclick = function () {
				
				var new_page = new cms_new_page(_storage.current_menu);
				
				var _cms_sub_drag = new cms_sub_drag ();
				
				_this.tier.request("admin=1&password="+password+"&username="+username ,_this.login_result)
			
			}
		break;
	}
} 
