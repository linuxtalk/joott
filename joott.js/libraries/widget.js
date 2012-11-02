
widget_base = function () {}

widget_base.prototype.widget = function (id) {
    var widget = "widget[create_id='" + id + "'], create\\:widget[create_id='" + id +  "']";
    return widget;
}

widget_base.prototype.area = function () {
    var _this = this;
    var area = _this.href_section( 2 );
    return area;
}

widget_base.prototype.file = function () {
    var _this = this;
    var file = _this.href_section( 1 );
    return file
}

widget_base.prototype.href_section = function (offset) {
    var href= window.location.href;
    var href_array = href.split("/")
    var section = href_array[href_array.length - offset];
    
    return section;
}

widget_base.prototype.styleSheetExists = function (styleSheet) {
    
    var styleSheetExists = false;
    
    var styleSheetArray = styleSheet.split("/");
    var file =  styleSheetArray[styleSheetArray.length -1]
    
    //alert(document.styleSheets.length)
    for (i=0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href !== null) {
            var docstyleSheetArray = document.styleSheets[i].href.split("/")
            var docfile =  docstyleSheetArray[docstyleSheetArray.length -1]
            if ( docfile === file) styleSheetExists = true;
        }
    }
    
    return styleSheetExists;
    
}

widget_base.prototype.insert_html = function (html) {
    var range, node;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        node = range.createContextualFragment(html);
        range.insertNode(node);
     } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().pasteHTML(html);
     }
}

widget_base.prototype.getSelectedNode = function () {
    var selectedNode = false;
    if (document.selection)
        selectedNode = document.selection.createRange().parentElement();
    else {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) 
            selectedNode = selection.getRangeAt(0).startContainer.parentNode;
    }
    return selectedNode;
}

widget_base.prototype.getContainer = function () {
    var _this = this;
    
    var ancestor_id = $(_this.getSelectedNode()).closest('[id!=""]').attr("id");
    return ancestor_id;
}

widget_base.prototype.clone = function (old_json) {
    var new_json = jQuery.extend(true, {}, old_json);
    return new_json;
}

widget = function () {
    var _this = this;
   if (typeof jQuery==="undefined") {
	var _webservice = new webservice( "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js",function(){_this.ready()},true);
	
   } else  try{_this.ready()}catch(err){}
}

widget.prototype.ready = function () {
    var _this = this;

    $(document).ready(function () {
        _this.loadWidgets();
    })
	
}

widget.prototype.loadWidgets = function () {
    var _this = this;
    $("div.widget").each (function () {
        var _widget = $(this).attr("type");
        var _w = $(this);
		var head = document.getElementsByTagName('head').item(0);
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', "<?php echo $WIDGET_URL?>/" + _widget  + "/" + _widget  + ".js");
		head.appendChild(script);
		var id = "create-" + Math.floor(Math.random()*999) + "-" + Math.floor(Math.random()*999);
		_w.attr("create_id",id);
		if (getInternetExplorerVersion()==8) {
			script.onreadystatechange = function () {
				if (script.readyState === "loaded"||script.readyState === "complete") {
					try {eval("_widget = new " + _widget + " ('" + id + "');" );}
					catch (err) {console.log(err.message)}
				}
			}
		} else {
			script.onload = function() {
				try {eval("_widget = new " + _widget + " ('" + id + "');" );}
				catch (err) {console.log(err.message)}
			}
		}

    })
}

getInternetExplorerVersion = function ()
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
