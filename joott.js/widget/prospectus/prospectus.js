
prospectus = function (id) {
    var _this = this;
    _this.initialize(id)
}

prospectus.prototype = new widget_base ()

prospectus.prototype.initialize = function (id) {
    var _this = this;
    _this.id = id;
    _this.widget = _this.widget(id);
    
    _this.php_file = "/modules/widget/prospectus/prospectus.php"
    
    if (! _this.styleSheetExists("widget_prospectus.css")) {
        $("head").append("<link href=\"/modules/widget/prospectus/css/widget_prospectus.css\" type=text/css rel=stylesheet />")
	}
		
	
	$(_this.widget).addClass("widget_prospectus");
	    
    $(document).scroll(function () {
        var top = 100;
        
        if ($(document).scrollTop() > $(window).height()- top)  {
          top += $(document).scrollTop();
        } 
         $(_this.widget).stop().animate({
            top: top +  "px"
        })  
    })
 
    //_this.my_prospectus= $.jStorage.get("my_prospectus");
    
    
    //window.sessionStorage.setItem("my_prospectus",null);
    _this.my_prospectus = window.sessionStorage.getItem("my_prospectus");
    if (_this.my_prospectus === null)_this.my_prospectus = {}
    else _this.my_prospectus = JSON.parse(_this.my_prospectus)
    
    
    //_this.my_prospectus_open = $.jStorage.get("my_prospectus_open");
    _this.my_prospectus_open = window.sessionStorage.getItem("my_prospectus_open");
    if (_this.my_prospectus_open === null) _this.setView( 1 );
    
    //_this.pdf_id = $.jStorage.get("pdf_id");
    _this.pdf_id = window.sessionStorage.getItem("pdf_id");
    if (_this.pdf_id === null) {
        _this.pdf_id = Math.floor(Math.random()*999)+"-"+Math.floor(Math.random()*999);
        //$.jStorage.set("pdf_id", _this.pdf_id);
        window.sessionStorage.setItem("pdf_id", _this.pdf_id);
    }
 
     _this.loadcontent();
}

prospectus.prototype.setView = function (id) {
    var _this = this;
    _this.my_prospectus_open = id;
    //$.jStorage.set("my_prospectus_open",id);
    window.sessionStorage.setItem("my_prospectus_open", id);
    
}

prospectus.prototype.loadcontent = function () {
	var _this = this;
   
	var url = "/modules/widget/prospectus/template/prospectus.html"
	$.ajax({
		async: true,
		cache: false,
		url: url,
		success: function (result) {
			var prospectus = document.querySelectorAll("div[create_id="+_this.id+"]");
			prospectus[0].innerHTML = result;
			//prospectus[0].style.position = "relative";
	
			if(prospectus[0].getAttribute("parent")) {
				
				var parent = document.querySelectorAll("div."+prospectus[0].getAttribute("parent"))[0];
				parent.appendChild(prospectus[0]);
				
			
			}

			_this.loadcourselist ()
           
			$("#closed_tab").click (function () {
					_this.setView(1)
					$(this).animate({ width: 'hide', left: "250px" });
					$("#prospectus_build_holder").animate({width:'show',left:"-7px"})
			})
            
			$(".icon_close").click (function () {
				_this.setView(0)
				$("#prospectus_build_holder").animate({width:'hide', left:"210px"})
				$("#closed_tab").animate({ width: 'show', left: "156px"  })
			})
            
			document.querySelectorAll(".icon_help")[0].onclick = function () {
				$(".help_area").toggle("slow");
			}
            
			$("#add_prospectus_arrow").click(function () {
				var ProspectusCode = sessionStorage.getItem("ProspectusCode");
				var ProspectusTitle = ($("div#course_details > h2").html()) ? $("div#course_details > h2").html() : $("div.course_details > h2").html();
		
				if (ProspectusTitle) {
					var StudyYear = (sessionStorage.getItem("start_date"))? sessionStorage.getItem("start_date"):"";
					StudyYear = StudyYear.split(" ");
					StudyYear = StudyYear[2];
               
					_this.my_prospectus[ProspectusCode] = {};
					_this.my_prospectus[ProspectusCode].title = ProspectusTitle;
					_this.my_prospectus[ProspectusCode].year = StudyYear;
					//$.jStorage.set("my_prospectus", _this.my_prospectus);
					window.sessionStorage.setItem("my_prospectus", JSON.stringify(_this.my_prospectus));
					_this.loadcourselist ();
				}
			})
           
            $("#download_prospectus_btn").click(function(){
                _this.download_pdf();
            })
            
            
            if (_this.my_prospectus_open == 1) {
                var t= setTimeout(function () {
                $("#closed_tab").animate({ width: 'hide', left: "250px" });
                $("#prospectus_build_holder").animate({width:'show',left:"-7px"})},250)
            }
        }
    });
    
}

prospectus.prototype.download_pdf = function  () {
    var _this = this;
    
    var data = {};
    data.pdf_id = _this.pdf_id;
    data.download_prospectus = 1;
    data.my_prospectus = _this.my_prospectus;
    
    
    $.ajax({
        async: false,
        url: _this.php_file,
        data: data,
        cache: false,
        success: function (result) {
            window.open("/modules/widget/prospectus/pdf/" + _this.pdf_id + ".pdf")
        }
    });
    
}

prospectus.prototype.loadcourselist = function () {
    var _this = this;
    var html = "";
    $.each(_this.my_prospectus, function (i, item) {
        html += "<div id=\"content_item\"><div class=\"delete_icon\"></div><div class=\"content_text\">" + item.title + "</div></div>";
    })
    
    $("#builder_content").html(html);
    
    $(".delete_icon").click (function () {
                //alert(1)
                var title = $(this).siblings(".content_text").html()
                $.each(_this.my_prospectus, function (i, item) {
                    
                    if ((item.title === title)||(item.title === null)) delete  _this.my_prospectus[i];
                })
                //$.jStorage.set("my_prospectus", _this.my_prospectus);
                window.sessionStorage.setItem("my_prospectus", JSON.stringify(_this.my_prospectus));
                _this.loadcourselist ()
            })
}