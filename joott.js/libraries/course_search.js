course_search = function () {
	var _this = this;
	var course_search_area = document.querySelectorAll("div.course_search");
	
	if (course_search_area.length==0) return false;
	
	this.webservice = "<?php echo WEBSERVICE ?>";
	this.course_search_area = course_search_area[0];
	this.college = this.course_search_area.getAttribute("college");
	
	this.page = document.querySelectorAll("div.page")[0];
	
	var params = "college="+this.college;
	var _webservice = new webservice(this.webservice+"?joott_cmd=course_search_screen&domain=course&"+params, 
									function(){_this.compile_screen()});
};

course_search.prototype.compile_screen = function () {
	var _this = this;
	this.course_search_area.innerHTML = course_search_screen;
	
	this.course_list_area = document.createElement("div");
	this.course_list_area.className = "course_list_area";
	this.course_search_area.appendChild(this.course_list_area)
	
	var _department_list = this.course_search_area.querySelectorAll("div.department_list > div");
	for (var d=0; d<_department_list.length; d++ ) {
		_department_list[d].onclick = function (){
			var count = this.getAttribute("count");
			var department_name=this.getAttribute("department_name");
			_this.course_list_area.innerHTML = "";
			
			for (var d1=0; d1<_department_list.length; d1++ ) {
				_department_list[d1].removeClass("course_area_clicked");
			}
			
			this.addClass("course_area_clicked");
			
			if (_this.course_div && _this.course_div.parentNode) _this.course_div.parentNode.removeChild(_this.course_div);
			var _h2 = document.createElement("h2");
			_h2.innerHTML = department_name;
			_this.course_list_area.appendChild(_h2);
			
			_this.course_list_area_body = document.createElement("div");
			_this.course_list_area.appendChild(_this.course_list_area_body);
			
			if (count==0) {
				_this.course_list_area_body.innerHTML = "No Courses";
			} else {
				var params = "college="+_this.college+"&department_name="+department_name;
				var _webservice = new webservice(_this.webservice+"?joott_cmd=get_course_list&domain=course&"+params, 
									function(){_this.show_course_list()});
			
			}
		}
	}
}

course_search.prototype.show_course_list = function () {
	var _this = this;
	this.course_list_area_body.innerHTML = course_list_result;
	
	var department_list = document.querySelectorAll("div.department_list")[0];
	
	//console.log(this.course_list_area_body.offsetHeight)
	//console.log(department_list.offsetHeight)
	
	department_list.style.height = this.course_list_area_body.offsetHeight+80+"px";
	
	this.page.style.height = department_list.offsetHeight + 100+ "px";

	var course = this.course_search_area.querySelectorAll("div[course_id]");
	for (var c=0; c<course.length;c++) {
		course[c].onclick = function () {
		
			for (var c1=0; c1<course.length; c1++ ) {
				course[c1].removeClass("course_clicked");
			}
			
			this.addClass("course_clicked");
			
			var course_id = this.getAttribute("course_id");
			sessionStorage.setItem("ProspectusCode",course_id);
			var params = "course_id="+course_id;
			var _webservice = new webservice(_this.webservice+"?joott_cmd=get_course_details&domain=course&"+params, 
									function(){_this.show_course_details()});
		}
	}
}

course_search.prototype.show_course_details = function () {
	var _this = this;
	this.course_div = document.querySelectorAll("div.course_details");
	for (var cd=0;cd<this.course_div.length;cd++ ) this.course_div[cd].parentNode.removeChild(this.course_div[cd]);
	this.course_div = document.createElement("div")
	this.course_div.className="course_details"
	this.course_div.innerHTML = course_details_result;
	this.course_search_area.appendChild(this.course_div)
	
	this.page.style.height =  this.course_search_area.offsetHeight + 100+ "px";

	try{
		this.course_div.querySelectorAll("div.close_details")[0].onclick = function () {
			_this.course_div.parentNode.removeChild(_this.course_div);
		}
	}catch (err) {}
}

