rich_text = function () {
	var _this = this;
	this.control_box = document.querySelectorAll("div.rich_text")[0];
	
	var button = [];
	var frameset = [];
	var legend = [];
	

	
	
	frameset[0] = document.createElement("fieldset");
	legend[0] = document.createElement("legend");
	legend[0].innerHTML ="Format Font";
	frameset[0].appendChild(legend[0]);
	
	button[0] = document.createElement("button");
	button[0].innerHTML="B";
	button[0].onclick = function () {
		document.execCommand ('bold', false, null);
	}
	
	button[1] = document.createElement("button");
	button[1].innerHTML="I";
	button[1].onclick = function () {
		document.execCommand ('italic', false, null);
	}
	
	button[2] = document.createElement("button");
	button[2].innerHTML="U";
	button[2].onclick = function () {
		document.execCommand ('underline', false, null);
	}
	
	frameset[0].appendChild(button[0]);
	frameset[0].appendChild(button[1]);
	frameset[0].appendChild(button[2]);
	
	
	frameset[1] = document.createElement("fieldset");
	legend[1] = document.createElement("legend");
	legend[1].innerHTML ="Lists";
	frameset[1].appendChild(legend[1]);

	
	button[3] = document.createElement("button");
	button[3].innerHTML="UL";
	button[3].onclick = function () {
		document.execCommand ('insertUnorderedList', false, null);
	}
	
	button[4] = document.createElement("button");
	button[4].innerHTML="OL";
	button[4].onclick = function () {
		document.execCommand ('insertOrderedList', false, null);
	}
	
	frameset[1].appendChild(button[3]);
	frameset[1].appendChild(button[4]);
	
	
	//for (var j=0;j<button.length;j++) {
	//	this.control_box.appendChild(button[j]);
	//}
	
	
	frameset[2] = document.createElement("fieldset");
	legend[2] = document.createElement("legend");
	legend[2].innerHTML ="Font Size";
	frameset[2].appendChild(legend[2]);
	
	for (i=1;i<7;i++) {
		button[i] = document.createElement("button");
		button[i].innerHTML=i;
		button[i].setAttribute("fontSize",i);
		button[i].onclick = function () {
			document.execCommand ('fontSize', false, this.getAttribute("fontSize"));
		}
		frameset[2].appendChild(button[i]);
	}
	
	//this.control_box.appendChild(frameset);
	
	
	frameset[3] = document.createElement("fieldset");
	legend[3] = document.createElement("legend");
	legend[3].innerHTML ="Unit Tables";
	frameset[3].appendChild(legend[3]);
	
	var table_button = document.createElement("button");
	table_button.innerHTML = "Add Unit Table"
	
	table_button.onclick = function (){
		_this.pasteHtmlAtCaret("<table><tr><th>Level<th>Unit Code<th>Unit Title<th>January<th>June</tr><tr><td></td><td></td><td></td><td></td><td></td></tr></table>");
	}
	var tick_button = document.createElement("button");
	tick_button.innerHTML = "Insert &#10004;"
	
	tick_button.onclick = function (){
		_this.pasteHtmlAtCaret("&#10004;");
	}
	frameset[3].appendChild(table_button);
	frameset[3].appendChild(tick_button);
	
	this.control_box.appendChild(frameset[0])
	this.control_box.appendChild(frameset[1])
	this.control_box.appendChild(frameset[2])
	this.control_box.appendChild(frameset[3])

};

rich_text.prototype.pasteHtmlAtCaret = function (html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
