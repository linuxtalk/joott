var inter;


cips_animation = function () {
	inter = false;
	this.element = document.getElementById("cips_animation");
	
	this.cips_details = document.createElement("div");
	
	this.cips_details.setAttribute("id", "cips_details");
	
	this.cips_details_header = document.createElement("div");
	this.cips_details_body = document.createElement("div");
	this.cips_details_behaviours = document.createElement("div");
	
	
	
	this.cips_details_header.setAttribute("id","cips_details_header");
	this.cips_details_body.setAttribute("id","cips_details_body");
	this.cips_details_behaviours.setAttribute("id","cips_details_behaviours");
	
	
	this.cips_details_header.style.position = "absolute";
	this.cips_details_body.style.position = "absolute";
	this.cips_details_behaviours.style.position = "absolute";
	

	this.cips_details_header.style.top = "0px"
	this.cips_details_body.style.top = "200px"
	this.cips_details_behaviours.style.top = "200px"
	
	this.core_count = 0;
	
	
	this.cips_details.appendChild(this.cips_details_body);
	this.cips_details.appendChild(this.cips_details_behaviours);
	
	var cips_map = document.getElementById("cips_map");

	cips_map.parentNode.insertBefore(this.cips_details, cips_map);
	cips_map.parentNode.insertBefore(this.cips_details_header,this.cips_details);
	
	this.image_dir="images/";
	
	this.core_base = 	["core_parts/PQB_0001_opacity-layer.png",
					  "core_parts/PQB_0000_core_big.png"];
					  
	this.core_part = [ "core_parts/final_diagram_core_1.png",
						"core_parts/final_diagram_core_2.png",
						"core_parts/final_diagram_core_3.png",
						"core_parts/final_diagram_core_4.png",
						"core_parts/final_diagram_core_5.png"
												];				  
						
	this.ring_01 = ["PQB_0007_Violet1(CL).png",
					"PQB_0006_Violet2(CL).png",
					"PQB_0005_Violet3(CL).png",
					"PQB_0004_Violet4(CL).png",
					"PQB_0003_Violet5(CL).png",
					"PQB_0002_Violet6(CL).png",
					"PQB_0001_Violet7(CL).png"];
					
	this.ring_02 = ["PQB_0008_cyan7(PF).png",
					"PQB_0009_cyan6(PF).png",
					"PQB_0010_cyan5(PF).png",
					"PQB_0011_cyan4(PF).png",
					"PQB_0012_cyan3(PF).png",
					"PQB_0013_cyan2(PF).png",
					"PQB_0014_cyan1(PF).png"];
					
	this.ring_03 = ["PQB_0015_blue7(BL).png",
					"PQB_0016_blue6(BL).png",
					"PQB_0017_blue5(BL).png",
					"PQB_0018_blue4(BL).png",
					"PQB_0019_blue3(BL).png",
					"PQB_0020_blue2(BL).png",
					"PQB_0021_blue1(BL).png"];
					
	this.ring_04 = ["PQB_0022_purple7(SL).png",
					"PQB_0023_purple6(SL).png",
					"PQB_0024_purple5(SL).png",
					"PQB_0025_purple4(SL).png",
					"PQB_0026_purple3(SL).png",
					"PQB_0027_purple2(SL).png",
					"PQB_0028_purple1(SL).png"];
					
	this.ring_05 = ["PQB_0029_PQB-areas.png"];
	
	this.ring_06 = ["PQB_0000_fade.png"];
	
	//this.ring_01.reverse();
	this.ring_02.reverse();
	this.ring_03.reverse();
	this.ring_04.reverse();
					
	this.do_animation();
				
}

cips_animation.prototype.new_image = function (src) {
	var core_image = document.createElement("img");
	core_image.setAttribute("src",src);
	jQuery(core_image).hide();
	//core_image.setOpacity(0);
	core_image.style.position = "absolute";
	return core_image;
}

cips_animation.prototype.do_animation = function () {
	var _this = this;
	
	
	
	var core_image = this.new_image(this.image_dir+"PQB_0030_core.png");
	this.element.appendChild(core_image);
	jQuery("img[src='"+this.image_dir+"PQB_0030_core.png']").stop().fadeIn(function () {_this.ring_01_full()});
	//core_image.fadein(function () {_this.ring_01_full()});
}

cips_animation.prototype.ring_01_01 = function () {
	var _this = this;
	
	var core_image = this.new_image(this.image_dir+"PQB_0007_Violet1(CL).png");
	this.element.appendChild(core_image);
	
	
	core_image.fadein(function () {_this.ring_01_02()});
}

cips_animation.prototype.ring_01_02 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0006_Violet2(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_01_03()});
}

cips_animation.prototype.ring_01_03 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0005_Violet3(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_01_04()});
}

cips_animation.prototype.ring_01_04 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0004_Violet4(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_01_05()});
}
cips_animation.prototype.ring_01_05 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0003_Violet5(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_01_06()});
}
cips_animation.prototype.ring_01_06 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0002_Violet6(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_01_07()});
}
cips_animation.prototype.ring_01_07 = function () {
	var _this = this;
	var core_image = this.new_image(this.image_dir+"PQB_0001_Violet7(CL).png");
	this.element.appendChild(core_image);
	core_image.fadein(function () {_this.ring_02_full()});
}

cips_animation.prototype.ring_01_full = function () {
	var _this = this;
	
	for (var i=0;i<this.ring_01.length-1;i++) {
		var core_image1 = this.new_image(this.image_dir+this.ring_01[i]);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein()
		var src = this.image_dir+this.ring_01[i];
		jQuery("img[src='"+src+"']").stop().fadeIn("fast");
	}
	var core_image_last_src=this.image_dir+this.ring_01[i++];
	var core_image_last = this.new_image(core_image_last_src);
	core_image_last.setAttribute("usemap","#cips_circle");
	this.element.appendChild(core_image_last);
	
	this.cips_details.style.position = "absolute";
	this.cips_details.style.left = "850px";
	
	
	var core_head = document.createElement("div");
	core_head.className = "core_head";
	var core_text = document.createElement("div");
	core_text.setAttribute("id","core_text");
	
	var h3 = document.createElement("h3");
	h3.innerHTML = "Success behaviours defined across five bands:";
	
	//h3.setOpacity(0);
	jQuery(h3).hide();
	core_head.appendChild(h3);
	
	//var ul = document.createElement("ul");
	//ul.setOpacity(0);
	
	//ul.add_image_list("Core PQBs","url(images/list_core.jpg)","item1");
	//ul.add_image_list("Core Leaders","url(images/list_cl.jpg)","item2");
	//ul.add_image_list("People/Functional Leaders","url(images/list_pf.jpg)","item3");
	//ul.add_image_list("Business Leaders","url(images/list_bl.jpg)","item4");
	//ul.add_image_list("Strategic Leaders","url(images/list_sl.jpg)","item5");
	//ul.float_list("left");
	
	var ul = document.createElement("div");
	//ul.setOpacity(0);
	jQuery(ul).hide();
	ul.innerHTML="<span><img src=images/list_core.jpg>Core PQBs</span>\
					<span><img src=images/list_cl.jpg>Core Leaders</span>\
					<span><img src=images/list_pf.jpg>Functional Leaders</span>\
					<span><img src=images/list_bl.jpg>Business Leaders</span>\
					<span><img src=images/list_sl.jpg>Strategic Leaders</span>";


	core_head.appendChild(ul);

	var h4 = document.createElement("h4");
	//h4.setOpacity(0);
	jQuery(h4).hide();
	h4.innerHTML = "Core PQBs";
	core_text.appendChild(h4);
	
	var p = document.createElement("p");
	p.innerHTML = "Each member of the organisation must meet the requirements of 'Core PQBs'. ";
	p.innerHTML += "Core PQBs can be viewed as those behaviours important for all roles in CIPS.";
	//p.setOpacity(0);
	jQuery(p).hide();
	
	core_text.appendChild(p);
	
	this.cips_details_header.appendChild(core_head);
	this.cips_details_body.appendChild(core_text);
	
	//h3.fadein();
	jQuery(h3).stop().fadeIn("fast");
	//ul.fadein();
	jQuery(ul).stop().fadeIn("fast");
	//h4.fadein();
	//p.fadein();
	jQuery(h4).stop().fadeIn("fast");
	jQuery(p).stop().fadeIn("fast");
	
	for (var c=0;c<this.core_base.length; c++) {
		var core_image1 = this.new_image(this.image_dir+this.core_base[c]);
		core_image1.setAttribute("usemap","#core_circle");
		jQuery(core_image1).css({opacity:1.0})
		//core_image1.setOpacity(100);
		core_image1.style.zIndex = -1
		this.element.appendChild(core_image1);
	}
	
	for (var l=0;l<this.core_part.length; l++) {
		var part_image1 = this.new_image(this.image_dir+this.core_part[l]);
		part_image1.setAttribute("usemap","#core_circle");
		jQuery(part_image1).css({opacity:1.0});
		//part_image1.setOpacity(100);
		part_image1.style.zIndex = -1
		this.element.appendChild(part_image1);
	}
	//core_image_last.fadein(function (){_this.ring_02_full()})
	jQuery("img[src='"+core_image_last_src+"']").fadeIn("fast",function (){_this.ring_02_full()});
}

cips_animation.prototype.ring_02_full = function () {
	var _this = this;
	for (var i=0;i<this.ring_02.length-1;i++) {
		var core_image1_src = this.image_dir+this.ring_02[i];
		var core_image1 = this.new_image(core_image1_src);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein()
		jQuery("img[src='"+core_image1_src+"']").stop().fadeIn("fast");
	}
	
	var core_image_last_src = this.image_dir+this.ring_02[i++];
	var core_image_last = this.new_image(core_image_last_src);
	core_image_last.setAttribute("usemap","#cips_circle");
	this.element.appendChild(core_image_last);
	
	var core_text = document.createElement("div");
	this.cips_details_body.appendChild(core_text);
	
	core_text.add_fadein_child("h4","Core Leaders");
	core_text.add_fadein_child("p","This band describes success behaviours required of all leaders regardless of seniority or role. it defines the transition between the Core PQBs Competencies and the Leadership Competencies.");
	
	//core_image_last.fadein(function (){_this.ring_03_full()})
	jQuery("img[src='"+core_image_last_src+"']").stop().fadeIn("fast",function (){_this.ring_03_full()});
	
}

cips_animation.prototype.ring_03_full = function () {
	var _this = this;
	for (var i=0;i<this.ring_03.length-1;i++) {
		var core_image1_src = this.image_dir+this.ring_03[i];
		var core_image1 = this.new_image(core_image1_src);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein()
		jQuery("img[src='"+core_image1_src+"']").stop().fadeIn("fast");
	}
	
	var core_image_last_src = this.image_dir+this.ring_03[i++];
	var core_image_last = this.new_image(core_image_last_src);
	core_image_last.setAttribute("usemap","#cips_circle");
	this.element.appendChild(core_image_last);
	//core_image_last.fadein(function (){_this.ring_04_full()})
	jQuery("img[src='"+core_image_last_src+"']").stop().fadeIn("fast",function (){_this.ring_04_full()});

	var core_text = document.createElement("div");
	this.cips_details_body.appendChild(core_text);
	
	core_text.add_fadein_child("h4","Functional Leaders");
	core_text.add_fadein_child("p","This band describes those additional success behaviours required of all Functional Leaders. This band therefore defines the growth and progression needed to perform at a level above Core Leaders.");

}

cips_animation.prototype.ring_04_full = function () {
	var _this = this;
	for (var i=0;i<this.ring_04.length-1;i++) {
		var core_image1_src = this.image_dir+this.ring_04[i];
		var core_image1 = this.new_image(core_image1_src);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein()
		jQuery("img[src='"+core_image1_src+"']").fadeIn("fast");
	}
	
	var core_image_last_src = this.image_dir+this.ring_04[i++];
	var core_image_last = this.new_image(core_image_last_src);
	core_image_last.setAttribute("usemap","#cips_circle");
	this.element.appendChild(core_image_last);
	//core_image_last.fadein(function (){_this.ring_05_full()})
	jQuery("img[src='"+core_image_last_src+"']").stop().fadeIn("fast",function (){_this.ring_05_full()});
	
	var core_text = document.createElement("div");
	this.cips_details_body.appendChild(core_text);
	core_text.add_fadein_child("h4","Business Leaders");
	core_text.add_fadein_child("p","This band describes those additional success behaviours required of all Business Leaders. Defining the stretch and growth needed to perform at a level above Functional Leaders (ie a Head of Department that leads multiple teams).");
}

cips_animation.prototype.ring_05_full = function () {
	var _this = this;
	for (var i=0;i<this.ring_05.length-1;i++) {
		var core_image1_src = this.image_dir+this.ring_05[i];
		var core_image1 = this.new_image(core_image1_src);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein(function (){_this.add_commands()})
		//core_image1.fadein();
		jQuery("img[src='"+core_image1_src+"']").stop().fadeIn("fast");
	}
	
	var core_image_last_src = this.image_dir+this.ring_05[i++];
	var core_image_last = this.new_image(core_image_last_src);
	core_image_last.setAttribute("usemap","#cips_circle");
	this.element.appendChild(core_image_last);
	//core_image_last.fadein(function (){_this.ring_06_full()})
	jQuery("img[src='"+core_image_last_src+"']").stop().fadeIn("fast",function (){_this.ring_06_full()});
	
	var core_text = document.createElement("div");
	this.cips_details_body.appendChild(core_text);
	core_text.add_fadein_child("h4","Strategic Leaders");
	core_text.add_fadein_child("p","This band describes those additional success behaviours required for members of the Strategic Leaders category. Defining the stretch and growth needed to perform at a level above Business Leaders.");
}

cips_animation.prototype.ring_06_full = function () {
	var _this = this;
	for (var i=0;i<this.ring_06.length;i++) {
		var core_image1_src = this.image_dir+this.ring_06[i];
		var core_image1 = this.new_image(core_image1_src);
		core_image1.setAttribute("usemap","#cips_circle");
		this.element.appendChild(core_image1);
		//core_image1.fadein(_this.add_commands());
		jQuery("img[src='"+core_image1_src+"']").stop().fadeIn("fast",_this.add_commands());
	}
}

cips_animation.prototype.show_core = function () {
	var zIndex = 1;
	for (var c=0; c<this.core_base.length; c++ ) {
		zIndex++;
		var base_src = this.image_dir + this.core_base[c];
		//base_image_src = 
		var base_image = this.element.querySelectorAll("img[src='"+base_src+"']")[0];
		//base_image.setOpacity(0);
		jQuery(base_image).hide();
		//base_image.fadein();
		jQuery(base_image).stop().fadeIn("fast");
		base_image.style.zIndex=zIndex;

	}
	
	jQuery(this.cips_details_body).stop().fadeOut("fast");
	//this.cips_details_body.fadeout();
	var cips_details_behaviours = document.getElementById("cips_details_behaviours");
	cips_details_behaviours.innerHTML = "<div class=default_core style=color:#003366;>Loading...</div>";
	//cips_details_behaviours.fadein()
	jQuery(cips_details_behaviours).stop().fadeIn("fast");
	
	var _webservice = new webservice('<?php echo WEBSERVICE ?>?joott_cmd=default_core&domain=cips', this.show_default_core);
}


cips_animation.prototype.show_default_core = function () {
	var cips_details_behaviours = document.getElementById("cips_details_behaviours");
	cips_details_behaviours.innerHTML = core_default;
}

cips_animation.prototype.hide_core = function () {
	var zIndex = -1;
	for (var c=0; c<this.core_base.length; c++ ) {
		zIndex--;
		var base_src = this.image_dir + this.core_base[c];
		var base_image = this.element.querySelectorAll("img[src='"+base_src+"']")[0];
		//base_image.setOpacity(0);
		jQuery(base_image).hide();
		//base_image.fadein();
		jQuery(base_image).stop().fadeIn("fast");
		base_image.style.zIndex=zIndex;
	}
	
	for (c=0; c<this.core_part.length; c++ ) {
		zIndex--;
		var base_src = this.image_dir + this.core_part[c];
		var base_image = this.element.querySelectorAll("img[src='"+base_src+"']")[0];
		//base_image.setOpacity(0);
		//base_image.fadein();
		jQuery(base_image).hide();
		jQuery(base_image).stop().fadeIn("fast");
		
		base_image.style.zIndex=zIndex;
	}
}

cips_animation.prototype.add_commands = function () {
	this.cips_circle_commands();
	this.cips_core_commands();
	this.cips_out_commands();
}

cips_animation.prototype.cips_out_commands = function () {

	//jQuery("div.cips_details_behaviours").mouseover(function (){

	//})
}

cips_animation.prototype.cips_core_commands = function () {
	var _this = this;
	var cips_map = document.getElementById("core_circle");
	
	var area = cips_map.querySelectorAll("map area");
	
	for (var a=0; a < area.length; a++) {
		area[a].onclick = function () {
			var alt = this.getAttribute("alt")
			_this.select_core_image(alt);
		
			_this.core_count++;
			var info = this.getAttribute("alt").split("_");
			var area = info[0];
			if (area=="outer") {
				_this.core_count=0;
				_this.hide_core();
				_this.core = false;
			} else {
				this.do_turn();
			}
		}
		
		area[a].do_turn = function () {
			if (_this.core_count<1) return false;
		    var alt = this.getAttribute("alt")
			_this.select_core_image(alt);
			//_this.cips_details_body.fadeout();
			jQuery(_this.cips_details_body).stop().fadeOut("fast")
		}
	}
	
}

cips_animation.prototype.select_core_image = function (alt) {

	var _this = this;
	var zIndex = -2;
	
	var info = alt.split("_");
	var ref = info[1]-1;
	
	if (ref<0) return 0;
	for (var cb=0; cb<this.core_part.length;cb++) {
		var  image_src = this.image_dir +this.core_part[cb]
		var image = this.element.querySelectorAll("img[src='"+image_src+"']")[0]
		image.style.zIndex=zIndex;
	}
	
	var core_image_src = this.image_dir +this.core_part[ref]
	
	var core_image = this.element.querySelectorAll("img[src='"+core_image_src+"']")[0]
	core_image.style.zIndex=5;
	jQuery(core_image).show();
	
	var _webservice = new webservice('<?php echo WEBSERVICE ?>?joott_cmd=get_behaviours&domain=cips&alt='+alt, function () {_this.show_behaviour()});
}

cips_animation.prototype.default_setup = function () {
	var _this = this;
	if (_this.no_change) return false;
			
	if (_this.core) return false;
			
	jQuery("div#cips_details_behaviours").html("");
	jQuery("div#cips_details_body").css({opacity:1})
	//jQuery("div#cips_details_body").show();
	jQuery("img").each(function (){
		if  (jQuery(this).css("z-index") > 0) jQuery(this).css({"z-index":0})
	})
}

cips_animation.prototype.cips_circle_commands = function () {
	var _this = this;
	var cips_map = document.getElementById("cips_map");
	
	var area = cips_map.querySelectorAll("map area");
	
	jQuery("div#cips_details_behaviours, div#cips_details_body, img").mouseover (function () {
		_this.default_setup();
	})

	jQuery("div#cips_details_behaviours, div#cips_details_body, img").mouseout (function () {
		_this.default_setup();
	})

	jQuery("img").mousemove (function () {	
		_this.default_setup();
	})

	jQuery("div#cips_details_behaviours, div#cips_details_body").mousemove (function () {	
		//_this.default_setup();
		jQuery("div#cips_details_body").fadeIn("slow")
	})
	
	
	for (var a=0; a < area.length; a++) {
		area[a].onclick = function () {
			
			var info = this.getAttribute("alt").split("_");
			var area = info[0];
			
			if (area === "core") {
				if (!_this.core) _this.show_core();
				_this.core = true;
				
			}else{
				if (_this.no_change) _this.no_change =  false;
				else _this.no_change =  true;
			}
		}
		
		area[a].onmouseout= function () {
			if (_this.no_change) return false;
			
			if (_this.core) return false;
			var info = this.getAttribute("alt").split("_");
			var area = info[0];
			if (area === "core") return false;
			
			//if (area === "outer") {
			 jQuery("div#cips_details_behaviours").html("");
			//}
			
		
		}
	 
		area[a].onmouseover = function () {
		
		
			if (_this.no_change) return false;
			
			if (_this.core) return false;
			
			var info = this.getAttribute("alt").split("_");
			var area = info[0];
			if (area === "core") return false;
			
			if (area === "outer") {
				_this.cips_details_behaviours.innerHTML=""
				jQuery("div#cips_details_body").css({display:"block"})
				jQuery("div#cips_details_behaviours").html("");
				jQuery("div#cips_details_body").stop().fadeIn("fast");
			
			//return false;
			}
	
			sessionStorage.removeItem("hold_fire");
			//_this.cips_details_body.fadeout();
			if(area !== "outer") jQuery(_this.cips_details_body).stop().fadeOut("fast");
			var alt = this.getAttribute("alt");
			_this.select_image(alt,2);
			
			
			if(area !== "outer") {
			jQuery("div#cips_details_behaviours").stop().fadeIn("fast");
			var _webservice = new webservice('<?php echo WEBSERVICE ?>?joott_cmd=get_behaviours&domain=cips&alt='+alt, _this.show_behaviour);
			
			}
		}

		
		//area[a].onmouseout = function () {
		 /*
			if (_this.no_change) return false;
			if (_this.core) return false;
			
			var info = this.getAttribute("alt").split("_");
			var area = info[0];
	
			if (area === "core") return false;
			
			if (area === "outer") {
				_this.cips_details_behaviours.innerHTML=""
				sessionStorage.setItem("hold_fire", true);
				return false;
			}
			
			jQuery(_this.cips_details_behaviours).stop().fadeOut("fast");
			jQuery(_this.cips_details_body).stop().fadeIn("fast");
			//_this.cips_details_behaviours.fadeout();
			//_this.cips_details_body.fadein();
			var alt = this.getAttribute("alt");
			_this.select_image(alt,0);
			
			var container = document.querySelectorAll(".page")[0];
			container.style.height = _this.cips_details_body.offsetHeight + 500 + "px";
			*/
		//}
	}
}

cips_animation.prototype.show_behaviour = function (hide_behaviour_ip) {

	var hide_behaviour = (hide_behaviour_ip!=undefined)?hide_behaviour_ip:false;
 
	var cips_details_behaviours = document.getElementById("cips_details_behaviours");

	cips_details_behaviours.innerHTML = new_behaviour;
	
	if (hide_behaviour) {
		
		level_behaviour = _("div.level_behaviour");
		
		for (var l=0; l<level_behaviour.length; l++) {
			level_behaviour[l].style.height = "0px";
			level_behaviour[l].style.overflow = "hidden";
		}
	}
        
	jQuery(cips_details_behaviours).stop().fadeIn("fast");
	//cips_details_behaviours.fadein();
	
	var container = document.querySelectorAll(".page")[0];
	container.style.height = cips_details_behaviours.offsetHeight + 500 + "px";
	
	
	if(_("div.core h2")) {
		_("div.core h2")[0].style.cursor = "pointer";
		_("div.core h2")[0].onclick = function () {
			var level_behaviour = _("div.level_behaviour");
			for (var d=0; d<level_behaviour.length;d++) {
				//level_behaviour[d].slideToggle();
				jQuery(level_behaviour[d]).slideToggle();
			}
		}
	}
}

cips_animation.prototype.select_image = function (alt, zIndex) {
	
	var info = alt.split("_");
	var layer = info[0];
	
	if (layer==="core") {
		if(zIndex==0) {
			for (var c=0; c<this.core_base.length; c++ ) {
				zIndex--;
				var base_src = this.image_dir + this.core_base[c];
				var base_image = this.element.querySelectorAll("img[src='"+base_src+"']")[0]
				jQuery(base_image).hide();
				jQuery(base_image).stop().fadeIn("fast");
				//base_image.setOpacity(0);
				//base_image.fadein();
				base_image.style.zIndex=zIndex;
			}
			zIndex--;
		} else {
			for (var c=0; c<this.core_base.length; c++ ) {
				zIndex++;
				var base_src = this.image_dir + this.core_base[c];
				var base_image = this.element.querySelectorAll("img[src='"+base_src+"']")[0];
				//base_image.setOpacity(0);
				//base_image.fadein();
				jQuery(base_image).hide();
				jQuery(base_image).stop().fadeIn("fast");
				base_image.style.zIndex=zIndex;
			}
			zIndex++;
		}
	}
	
	
	var ref = parseInt(info[1]) - 1;
	var image_src = "";
	
	switch (layer) {
		case "cl": image_src = this.ring_01[ref]; break;
		case "pf": image_src = this.ring_02[ref]; break;
		case "bl": image_src = this.ring_03[ref]; break;
		case "sl": image_src = this.ring_04[ref]; break;
		case "core": image_src = this.core_part[ref]; break;
		default: return false; break;
	}
	
	image_src = this.image_dir + image_src;
	jQuery("img").each (function () {
		if (jQuery(this).css("z-index")> 0)  jQuery(this).css({"z-index":0})
	} )        
	var image = this.element.querySelectorAll("img[src='"+image_src+"']")[0]
	image.style.zIndex=zIndex;
}

cips_animation.prototype.fadeAll = function () {
	var img = this.element.querySelectorAll("img");
	for (var i=0; i<img.length; i++ ) {
		//img[i].setOpacity(50);
		//jQuery(img[i]).css({opacity:0.5});
	}
}

