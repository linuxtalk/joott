if(typeof jQuery=='undefined')
{
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
    headTag.appendChild(jqTag);
}

_ = function (id) {
	if (document.getElementById(id)) return document.getElementById(id);
	else {
		var elements = document.querySelectorAll(id);
		if (elements.length>0) return elements;
		else return null;
	}
}

nfa = function () {}

if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') (function () {
     
    var Storage = function (type) {
      function createCookie(name, value, days) {
        var date, expires;
     
        if (days) {
          date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires="+date.toGMTString();
        } else {
          expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
      }
     
      function readCookie(name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i, c;
     
        for (i=0; i < ca.length; i++) {
          c = ca[i];
          while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
          }
     
          if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
          }
        }
        return null;
      }
     
      function setData(data) {
        data = JSON.stringify(data);
        if (type == 'session') {
          window.name = data;
        } else {
          createCookie('localStorage', data, 365);
        }
      }
     
      function clearData() {
        if (type == 'session') {
          window.name = '';
        } else {
          createCookie('localStorage', '', 365);
        }
      }
     
      function getData() {
        var data = type == 'session' ? window.name : readCookie('localStorage');
        return data ? JSON.parse(data) : {};
      }
     
     
      // initialise if there's already data
      var data = getData();
     
      return {
        length: 0,
        clear: function () {
          data = {};
          this.length = 0;
          clearData();
        },
        getItem: function (key) {
          return data[key] === undefined ? null : data[key];
        },
        key: function (i) {
          // not perfect, but works
          var ctr = 0;
          for (var k in data) {
            if (ctr == i) return k;
            else ctr++;
          }
          return null;
        },
        removeItem: function (key) {
          delete data[key];
          this.length--;
          setData(data);
        },
        setItem: function (key, value) {
          data[key] = value+''; // forces the value to a string
          this.length++;
          setData(data);
        }
      };
    };
     
    if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
    if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');
     
 })();


function mouseX(evt) {
if (evt.pageX) return evt.pageX;
else if (evt.clientX)
   return evt.clientX + (document.documentElement.scrollLeft ?
   document.documentElement.scrollLeft :
   document.body.scrollLeft);
else return null;
}
function mouseY(evt) {
if (evt.pageY) return evt.pageY;
else if (evt.clientY)
   return evt.clientY + (document.documentElement.scrollTop ?
   document.documentElement.scrollTop :
   document.body.scrollTop);
else return null;
}


if ( !window.Element )
{
        Element = function(){}

        var __createElement = document.createElement;
        document.createElement = function(tagName)
        {
                var element = __createElement(tagName);
                for(var key in Element.prototype)
                        element[key] = Element.prototype[key];
                return element;
        }

        var __getElementById = document.getElementById
        document.getElementById = function(id)
        {
                var element = __getElementById(id);
                for(var key in Element.prototype)
                        element[key] = Element.prototype[key];
                return element;
        }	
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

String.prototype.rtrim=function(){return this.replace(/\s+$/,'');}

if (typeof Element==="object")  {

Element.prototype.hasClass = function (cls) {
  return this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

Element.prototype.addClass = function (cls) {
  if (!this.hasClass(cls)) this.className += " "+cls;
}

Element.prototype.removeClass = function (cls) {
  if (this.hasClass(cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      this.className=this.className.replace(reg,' ');
  }
}

Element.prototype.slideDown = function (max) {
	var h = this.offsetHeight;
	
	var d = (typeof (this.distance) !== "undefined")?this.distance:20;
	//console.log(h +">="+ max)
	if (h >= max) return false;
	this.style.height = h + d + "px"

	return true;
}

Element.prototype.slideUp = function (step) {
	var h = this.offsetHeight;
	var d = (typeof (this.distance) !== "undefined")?this.distance:20;
	var s = (step) ? step : d;
	//console.log("h="+ h)
	//console.log("d="+ d)
	//console.log("s="+ s)
	try {this.style.height = h - s + "px"} catch (err) {console.log(err)}
	if (h > 0) return true;
	else return false;
}

Element.prototype.slideToggle = function (height) {

//jQuery(this).slideToggle()

	var _this = this;
	
	this.style.overflow = "hidden";
	this.do_animation = true;
	
	var actual_height = (height!=undefined)?height:this.scrollHeight;
				
	if (this.offsetHeight == 0) {		
		this.animation = function () {
			_this.do_animation = _this.slideDown(actual_height);		
		}
	} else {
		this.animation = function () {
			_this.do_animation = this.slideUp();
		}
	}	
	this.animate();		
	
}

Element.prototype.setOpacity = function (value) {
	if(this.style.opacity!=undefined)this.style.opacity = value/100;
	else try{this.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+value+')'}
	catch(err) {this.filters.alpha.opacity = value}
}

Element.prototype.getOpacity = function () {
	if(this.style.opacity!=undefined) return this.style.opacity * 100;
	else return this.filters.alpha.opacity;
}

Element.prototype.animate = function (){
	var _this = this;
	if(!this.getAttribute("id")) this.setAttribute("id","ele_"+Math.floor((Math.random()*1000)+1))
	this.id = this.getAttribute("id");

	if (this.loop) window.clearInterval(this.loop);
	
	this.loop = window.setInterval(
	  
		function() { 
			if(_this.do_animation ){
				if (typeof _this.animation == "function")  {_this.animation()}
				else {_animation = false;}
			}
		} 
		,this.intervals)
	return this;
} 


Element.prototype.findPos = function(){
	var obj = this;
	var posX = obj.offsetLeft;var posY = obj.offsetTop;
	while(obj.offsetParent){
		if(obj==document.getElementsByTagName('body')[0]){break}
		else{
			posX=posX+obj.offsetParent.offsetLeft;
			posY=posY+obj.offsetParent.offsetTop;
			obj=obj.offsetParent;
		}
	}
	var posArray=[posX,posY]
	return posArray;
}

Element.prototype.isLandscape = function () {
	var result = (this.offsetWidth > this.offsetHeight) ? true : false;
	return result;
}

Element.prototype.isPortrait = function () {
	var result = (this.offsetWidth < this.offsetHeight) ? true : false;
	return result;
}

Element.prototype.xyratio = function () {
	return this.offsetWidth /this.offsetHeight;
}

Element.prototype.fadein = function (callback) {
	var _this = this;
	if (typeof callback == "function") this.callback = callback;
	this.do_animation = true;
	this.intervals = 5;
	this.opacity = 0
	this.animation = function () {
		this.opacity += 1;

		this.setOpacity(this.opacity)
			
		if (this.opacity >= 100) {
			this.do_animation = false;
			if (typeof _this.callback == "function")  _this.callback(); 
		}
	}
	this.animate();
}

Element.prototype.add_fadein_child = function (tag, html) {
	var child = document.createElement(tag);
	child.innerHTML = html;
	//child.setOpacity(0);
	jQuery(child).hide();
	this.appendChild(child);
	//child.fadein();
	jQuery(child).fadeIn("fast");
}

Element.prototype.fadeout = function () {
	this.do_animation = true;
	this.intervals = 5;
	this.opacity = 0
	this.animation = function () {
		this.opacity -= 1;

		this.setOpacity(this.opacity)
			
		if (this.opacity <= 0) this.do_animation = false;
	}
	this.animate();
}

Element.prototype.removeMe = function () {
	this.parentNode.removeChild(this);
}
} else {
	
	alert("This is an unsupported browser")
	var ie7_message = document.createElement("div");
	ie7_message.innerHTML = "This is an unsupported browser";
	ie7_message.style.zIndex=5000;
	ie7_message.style.positon = "fixed";
	ie7_message.style.top = "0px";
	ie7_message.style.top = "0px";
	

	jQuery(document).append(ie7_message)
}


if (typeof HTMLUListElement!=="undefined") {
HTMLUListElement.prototype.add_image_list = function (text, image, classname) {
	image = (image != undefined) ? image : "none";
	var li = document.createElement("li");
	li.innerHTML = text;
	li.style.listStyleImage = image;
	if (classname != undefined) li.className=classname;
	this.appendChild(li);
}

HTMLUListElement.prototype.float_list = function (float_ref) {
	var li = this.querySelectorAll("li");
	for ( var l=0; l<li.length;l++) {
		li[l].style.cssFloat = float_ref;
		li[l].style.marginLeft = "55px";
	}
	//li[l++].style.marginLeft = "55px";

	var end = document.createElement("div");
	end.style.clear = "both";
	this.appendChild(end);
}
}

try {
Window.prototype.basename = function () {
	var _array = this.location.pathname.split("\/");
	var _basename = (_array[_array.length-1]!="") ? _array[_array.length-1] : _array[_array.length-2];
	return _basename;
}
}catch(err){}


function posTop() {
            return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
        }

	