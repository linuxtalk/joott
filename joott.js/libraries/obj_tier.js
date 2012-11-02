
obj_tier = function () {
	this.createRequestObject()
}

obj_tier.prototype.createRequestObject = function () {
	try {this.reqObj = new XMLHttpRequest()} 
	catch(e) {
		try {
			var mObj = "Microsoft.XMLHttp";
			this.reqObj = new ActiveXObject(mObj);
		}catch(e) {}
	}
}

obj_tier.prototype.request = function(params,callback) {
	var _this = this;
  
	if (this.reqObj) try {
		this.reqObj.open(
			"POST", 
			"/modules/joott/", 
			false
		);
		this.reqObj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		this.reqObj.send(params);
		
		this.reqObj.onreadystatechange = 
			function () {
				var state = _this.reqObj.readyState;
				var status = _this.reqObj.status;
				
				if (state==4 && status==200) {
					if (typeof callback == "function") callback(_this.reqObj.responseText)
					if(typeof _this.reqObj.responseText==="unknown") return ""
					else 
					return _this.reqObj.responseText
				}
			}
	} catch (e) {}
	
	return this.reqObj.responseText;
}
