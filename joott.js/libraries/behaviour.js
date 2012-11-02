behaviour = function () {
	var _this = this;
	this.behaviours  = {
		'CL' : [11,12,13,14],
		'PF' : [11,12,13,14,15,16],
		'BL' : [11,12,13,14,15,16,17,18],
		'SL' : [11,12,13,14,15,16,17,18,19,20,21]
	}
	
	if(window.addEventListener) {
		window.addEventListener(
			'load', 
			function () {_this.load()}, false);
	} else if(window.attachEvent) {
		window.attachEvent(
			'onload', 
			function () {_this.load()});
	}
}

behaviour.prototype.load = function () {
	var _this = this;
	var buttons = _(".jobs span");
	
	for (var b=0; b<buttons.length;b++ ) {
		buttons[b].onclick = function () {
			var job = this.getAttribute("job");
			
			_this.hide_all();
			
			var divs = _(".job_highlight");
			for (var d=0; d < divs.length; d++) {
				divs[d].removeClass("job_highlight")
			}
			this.addClass("job_highlight")
			
			if (job==="CL") {
				var heads = _(".behaviour_body")[0]
				heads.style.overflow="hidden"
				heads.style.height="0px"
			
				this.do_animation = true;
				this.intervals = 5;
				this.animation = function () {
					this.do_animation = _(".behaviour_body")[0].slideDown(600);
				}
				this.animate();
			} else {
				var behaviour = _(("div."+job.toLowerCase()+".behaviour"));
				
				for (var b=0; b<behaviour.length;b++) {
					
					behaviour[b].setOpacity(0)
				}
				this.do_animation = true;
				this.intervals = 5;
				this.opacity = 0
				this.animation = function () {
					this.opacity += 1;
					
					var heads = _(".behaviour_body")[0]
					var behaviour = _(("div."+job.toLowerCase()+".behaviour"));
				
					for (var b=0; b<behaviour.length;b++) {
					
						behaviour[b].setOpacity(this.opacity)
					}
					
					if (this.opacity >= 100) this.do_animation = false;
				}
				this.animate();
				
			}
			
			for (var d=0;d<_this.behaviours[job].length;d++) {
				
				var behaviours=_("div[behaviour]");
				for (var s=0; s<behaviours.length; s++ ) {
					var beh = behaviours[s].getAttribute("behaviour");
					if (beh==_this.behaviours[job][d]) {
						behaviours[s].style.display="block";
					}
				}
			}
		}
	}
	
}

behaviour.prototype.hide_all = function () {
	var divs = _(".behaviour");
	
	for (var d=0; d<divs.length; d++) {
		divs[d].style.display = "none";
	}
}
