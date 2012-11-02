browser_check = function () {
	var _this = this;
	this.valid = true;

	if (typeof document.body.querySelectorAll == "undefined") {
		this.valid = false;
		this.div = document.createElement("div");
		this.div.innerHTML = "<div style='height:25px;'><div style='float:right;cursor:pointer' id=close_version>[&times;]</div></div>";
		this.div.innerHTML += "<div><p>Your are using a unsupported browser version.</p>";
		this.div.innerHTML += "<p>Please upgrade to the current version.</p></div>";
	
		this.div.style.position = "fixed";
		this.div.style.backgroundColor= "white";
		this.div.style.border = "1px solid black";
		this.div.style.width = "250px";
		this.div.style.top = "100px";
		this.div.style.padding = "5px";
		this.div.style.left = document.body.offsetWidth/2 - 125 + "px";
		
		document.body.appendChild(this.div);
		
		document.getElementById("close_version").onclick = function () {
			_this.div.parentNode.removeChild(_this.div);
		
		}
		
		
	}
}
