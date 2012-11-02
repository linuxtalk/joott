
webservice = function (url, callback,no_version){
	this.no_version = (no_version) ? true : false;
	if(sessionStorage.getItem("hold_fire")) sessionStorage.removeItem("hold_fire")
	this.load(url, callback);
}

webservice.prototype.load = function (url, callback) {
	var _this = this;
	var head = document.getElementsByTagName('head').item(0);
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	var version = (this.no_version) ? "" : "&version="+Math.random();
	script.setAttribute('src', url+version);
	head.appendChild(script);
	if (this.getInternetExplorerVersion()==8) {
		script.onreadystatechange = function () {
			if (script.readyState === "loaded"||script.readyState === "complete") {
				if(!sessionStorage.getItem("hold_fire")) callback();
			}
		}
	} else {
		script.onload = function() {
		if(!sessionStorage.getItem("hold_fire")) callback();
		}
	}
}

webservice.prototype.getInternetExplorerVersion = function ()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
