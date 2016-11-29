// Browser_From_Hell function set
//===============================================================

var bfh_rollOvers = new Array();
var bfh_menuArray = new Array();
var bfh_menuItemArray = new Array();
var bfh_closeTimerActive = false;


// BFH - GENERAL
//===============================================================

function bfh_domBrowserCheck() {
	// only the object-based browser checks...
	// apps can identify as whatever they want...	
	this.IE4 = (document.all&&!document.getElementById)?true:false;
	this.IE5 = (document.all&&document.getElementById)?true:false;
	this.IE4UP = (this.IE4||this.IE5)?true:false;
	this.IE5UP = (this.IE5)?true:false;

	this.NN4 = (document.layers)?true:false;
	this.W3CDOM = (document.getElementById&&document.createElement)?true:false;
}
is = new bfh_domBrowserCheck();

function bfh_getObj(id) {
	// returns an object by it's id.
	// works in IE4UP, NN6/Mozilla and recent Opera versions
	if (is.IE4UP) {
		theObj = document.all[id];
	}	else if (is.W3CDOM) {
		theObj = document.getElementById(id);
	}
	return theObj;	
}

function bfh_preloadImages() {
	// preload  Images
	// declare images to load in main document,
	// using the 'bfh_imagesToLoad' array.
	//   var bfh = 0;
	//   bfh_imagesToLoad = new Array();
	//   bfh_imagesToLoad[bfh++] = 'imagepath&name';
	var ldImg = new Array();
	var i,q=0;
	if (document.images) {
		for(i=0; i<bfh_imagesToLoad.length; i++) {
			ldImg[q] = new Image;
			ldImg[q++].src = bfh_imagesToLoad[i];
		}
	}
}

function bfh_getAbsX(obj) {
	var myLeft = 0;
	if (document.getElementById || document.all) {
		while (obj.offsetParent) {
			myLeft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	return myLeft;
}
function bfh_getAbsY(obj) {
	var myTop = 0;
	if (document.getElementById || document.all) {
		while (obj.offsetParent) {
			myTop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	return myTop;
}

function bfh_getPageWidth() {
	// returns the visible pagewidth, excluding scrollbars
	if (document.getElementById&&document.documentElement.ScrollTop) {
		return document.documentElement.clientWidth;
	} 
	var scrWidth = document.body.scrollWidth;
	var clWidth = document.body.clientWidth;
	if (clWidth!=0) {
		return clWidth;
	} else {
		return scrWidth;  // Moz returns 0 if body.style = hidden. return scrWidth instead.
	}
}

function bfh_getPageHeight() {
	// returns the visible pagewidth, excluding scrollbars
	if (document.getElementById&&document.documentElement.ScrollTop) {
		return document.documentElement.clientHeight;
	} 
	var scrHeight = document.body.scrollHeight;
	var clHeight = document.body.clientHeight;
	if (clHeight!=0) {
		return clHeight;
	} else {
		return scrHeight;  // Moz returns 0 if body.style = hidden. return scrWidth instead.
	}
}
function bfh_makeRollover(id,imgNorm,imgHover) {
	bfh_rollOvers[id] = new Array();
	bfh_rollOvers[id]['normal'] = imgNorm;
	bfh_rollOvers[id]['hover'] = imgHover;
	bfh_getObj(id).onmouseover = bfh_genMouseOver;
	bfh_getObj(id).onmouseout = bfh_genMouseOut;
}
function bfh_genMouseOver(e) {
	var node = (e)?e.target:window.event.toElement;
	if (!node.id||!bfh_rollOvers[node.id]) return;
	bfh_getObj(node.id).src = bfh_rollOvers[node.id]['hover'];
}
function bfh_genMouseOut(e) {
	var node = (e)?e.target:window.event.fromElement;
	if (!node.id||!bfh_rollOvers[node.id]) return;
	bfh_getObj(node.id).src = bfh_rollOvers[node.id]['normal'];
}


// BFH - GENERAL, DOM & LAYERS
//===============================================================

function bfh_createLayer (id, cssClass, targetId) {
	// create a new layer (div) with id='id'
	// className is optional, if omitted the default style attribs will be used (bfh_defaultDivStyle)
	// targetId is optional, if omitted the target will be document.body
	var target = (targetId)?bfh_getObj(targetId):document.body;
	if (is.IE4UP) {
		var attrString = (cssClass)?'class="'+cssClass+'"' : 'style="'+bfh_defaultDivStyle+'"';
		var source = '<div id="'+id+'" '+attrString+'></div>';
		target.insertAdjacentHTML('beforeEnd',source);
	} else if (is.W3CDOM) {
		var source = document.createElement("DIV");
		if (cssClass) {
			source.setAttribute('class', cssClass);
		} else {
			source.setAttribute('style', bfh_defaultDivStyle);
		}
		source.id = id;
		target.appendChild(source);
	}
}
function bfh_1stParentDiv(node) {
	if (node && node.nodeName=='DIV') return node; // there's an error here.... :( (node no props on occasions) added the xtra node statement
	while (node.parentNode) {
		node = node.parentNode;
		if (node.nodeName=='DIV') return node;
	}
}

// BFH - PULLDOWN
//===============================================================

function bfh_buildAllMenus(targetDiv) {
	for (i in bfh_pdMenuItem) {
		bfh_menuArray[i] = new bfh_pullDown(i,targetDiv);
		for (j in bfh_pdMenuProp[i]) {
			bfh_menuArray[i][j] = bfh_pdMenuProp[i][j];
		}
		bfh_menuArray[i].build();
	}
}

function bfh_pullDown(x,targetId) {
	// create a pulldown object, using the menuItems were x = 'x';
	// the object will have all methods neccessary.
	// the div containing the pulldown will have id = 'bfh_pdx'.
	// the container-div will be placed inside 'targetDiv', leave blank for 'document'
	// menu items will have id's "bfh_pdItemx_y"

	// lines: outer border will be set with the container-div style,
	// inner-lines can be set, setting the border-bottom-property of the container- and item styles,
	// the bottom-line will be set to 0px by the script.
	if ((bfh_pdMenuItem[x].length==0)||bfh_getObj('bfh_pd'+x)) return;
	
	this.menuIndex = x;
	this.ctrlrId = '';
	this.containerId = 'bfh_pd'+x;
	this.itemOffset = '20' // vertical offset of menu-items (=height+bottomborder)
	this.menuWidth = bfh_defMenuWidth;
	this.itemHeight = bfh_defItemHeight;
	this.innerBorderWidth = bfh_defInnerBorderWidth;
	this.outerBorderWidth = bfh_defOuterBorderWidth;
	this.zIndex = bfh_defZIndex;
	
	// the containerDiv, override options before build as needed.
	this.contClass = bfh_defContainerClass;
	this.contLeft = '0px';
	this.contTop = '0px';

	// the itemDiv's, override options before build as needed.
	this.itemClass = bfh_defItemClass; 
	this.itemClass_ro = bfh_defItemClass_ro; //mouseover style. optional.
	
	// captionDiv's, override options before build as needed.
	this.captionClass = bfh_defCaptionClass;

	// calculations to compensate for different handling of borders IE/Mozilla
	this.containerHeight = (bfh_pdMenuItem[x].length)*this.itemHeight-this.innerBorderWidth;
	if (is.IE4UP) this.containerHeight+=(2*this.outerBorderWidth);
	this.containerWidth = this.menuWidth;
	this.correctedItemHeight = (!is.IE4UP)?this.itemHeight-this.innerBorderWidth:this.itemHeight;

	// SHOW()
	bfh_pullDown.prototype.show = function() {
		bfh_getObj(this.containerId).style.visibility = 'visible';
	}
	// HIDE()
	bfh_pullDown.prototype.hide = function() {
		bfh_getObj(this.containerId).style.visibility = 'hidden';
	}
	// SETPOS(x-pos, y-pos)
	bfh_pullDown.prototype.setPos = function(x,y) {
		if (a=bfh_getObj(this.containerId)) {
			a.style.left = x+'px';
			a.style.top = y+'px';
		} else {
			this.contLeft = x+'px';
			this.contTop = y+'px';
		}
	}
	//ATTACH_CTRLR(id_of_menuButton) set the button that displays this menu
	bfh_pullDown.prototype.attach_ctrlr = function(id) {
		this.ctrlrId = id;
		bfh_getObj(id).onmouseover = bfh_ctrlrMouseOver;
		bfh_getObj(id).onmouseout = bfh_ctrlrMouseOut;
	}
	// BUILD(): call this AFTER setting the desired properties as listed above	
	bfh_pullDown.prototype.build = function() {
		// building the containerDiv
		//==========================
		var menuId = this.containerId;
		bfh_menuItemArray[menuId] = new bfh_menuItem(); //creating the container
		var a = bfh_menuItemArray[menuId];
		a.divId = menuId;
		a.cssClass = this.contClass;
		a.divTarget = targetId;
		a.build();
		// setting additional style-properties
		var b = bfh_getObj(menuId).style;
		b.left = this.contLeft;
		b.top = this.contTop;
		b.width = this.containerWidth+'px';
		b.height = this.containerHeight+'px';
		b.borderWidth = this.outerBorderWidth+'px';
		b.zIndex = this.zIndex;
		// attaching the show-hide functions to the controller
		if (this.ctrlrId!='') {	
			bfh_getObj(this.ctrlrId).onmouseover = bfh_ctrlrMouseOver;
			bfh_getObj(this.ctrlrId).onmouseout = bfh_ctrlrMouseOut;
			bfh_getObj(this.ctrlrId).onmousedown = bfh_ctrlrMouseDown;
		}
		
		var offSet = 0;
			// building the item Div's
			//========================
			for (i=0;i<bfh_pdMenuItem[x].length;i++) {
			var divId = 'bfh_pdItem'+x+'_'+i;
			
			// store properties in object having the same 'index' in the objects array as the div id.
			bfh_menuItemArray[divId] = new bfh_menuItem(); 
			
			var a = bfh_menuItemArray[divId];
			a.divId = divId;
			a.divTarget = menuId;
			a.html = bfh_pdMenuItem[x][i]['label'];
			if (!bfh_pdMenuItem[x][i]['type']||bfh_pdMenuItem[x][i]['type']==0) { // is item, default
				a.cssClass = this.itemClass;
				a.cssClass_ro = this.itemClass_ro;
				a.action = bfh_pdMenuItem[x][i]['action'];
			} else if (bfh_pdMenuItem[x][i]['type']==1) { // is label, no action
				a.cssClass = this.captionClass;
				a.cssClass_ro = this.captionClass;
			}
			a.build();
			a.setTop(offSet);
			// setting additional style-properties
			var b = bfh_getObj(divId).style;
			b.height = this.correctedItemHeight+'px';
			b.borderBottomWidth = this.innerBorderWidth+'px';
			b.zIndex = this.zIndex+1;
			if (i==bfh_pdMenuItem[x].length-1) {
				b.borderBottomWidth='0px';
				if (is.IE4UP) b.height = (this.correctedItemHeight-this.innerBorderWidth)+'px';
			}
			offSet += this.itemHeight;
		}
	}
}
function bfh_menuItem() {
	this.divId = '';
	this.cssClass = '';
	this.cssClass_ro = '';
	this.divTarget = '';
	this.action = '';
	this.html = '';
	
	bfh_menuItem.prototype.build = function() {
		bfh_createLayer(this.divId,this.cssClass,this.divTarget);
		if (this.html!='') bfh_getObj(this.divId).innerHTML = this.html;
		if (this.cssClass_ro!='') bfh_getObj(this.divId).onmouseover = bfh_menuMouseOver;
		if (this.cssClass_ro!='') bfh_getObj(this.divId).onmouseout = bfh_menuMouseOut;
		if (this.action!='') bfh_getObj(this.divId).onmousedown = bfh_menuMouseDown;
	}
	
	bfh_menuItem.prototype.setTop = function(offSet) {
		bfh_getObj(this.divId).style.top = offSet;
	}
}
function bfh_hideMenus() {
	for (i=0;i<bfh_menuArray.length;i++) {
		bfh_menuArray[i].hide();
	}
}

	// menu-item mouse events
	//=======================

function bfh_menuMouseOver(e) {
	var el1 = (e)?e.target:window.event.toElement;
	var el2 = (e)?e.relatedTarget:window.event.fromElement;
	var el1_1stP = bfh_1stParentDiv(el1);
	var el2_1stP = bfh_1stParentDiv(el2);
	if (el1_1stP==el2_1stP) return; //prevent textNodes or subelmnts from firing event
	var myId = el1_1stP.id;
	bfh_getObj(myId).className = bfh_menuItemArray[myId].cssClass_ro;
	if (bfh_closeTimerActive) clearTimeout(bfh_closeTimer);bfh_closeTimerActive=false;
}
function bfh_menuMouseOut(e) {
	var el1 = (e)?e.target:window.event.fromElement;
	var el2 = (e)?e.relatedTarget:window.event.toElement;
	var el1_1stP = bfh_1stParentDiv(el1);
	var el2_1stP = bfh_1stParentDiv(el2);
	if (el1_1stP==el2_1stP) return; //prevent textNodes or subelmnts from firing event
	var myId = el1_1stP.id;
	bfh_getObj(myId).className = bfh_menuItemArray[myId].cssClass;
	bfh_closeTimer = setTimeout('bfh_hideMenus()',bfh_menuTimeOut);	bfh_closeTimerActive = true;
}
function bfh_menuMouseDown(e) {
	var el1 = (e)?e.target:window.event.srcElement;
	if (window.event) window.event.cancelBubble = true;
	var el1_1stP = bfh_1stParentDiv(el1);
	var myId = el1_1stP.id;
//	test3(myId);
	bfh_hideMenus();
	eval(bfh_menuItemArray[myId].action);
}

	// controller buttons mouse events
	//================================

function bfh_ctrlrMouseOver(e) {
	var el1 = (e)?e.target:window.event.toElement;
	var el2 = (e)?e.relatedTarget:window.event.fromElement;
	var el1_1stP = bfh_1stParentDiv(el1);
	var el2_1stP = bfh_1stParentDiv(el2);
	if (el1_1stP==el2_1stP) return; //prevent textNodes or subelmnts from firing event
	var myId = el1_1stP.id;
	if (bfh_closeTimerActive) clearTimeout(bfh_closeTimer);bfh_closeTimerActive=false;
	for (i=0;i<bfh_menuArray.length;i++) {
		if (myId==bfh_menuArray[i].ctrlrId) {
			bfh_menuArray[i].show();
		} else {
			bfh_menuArray[i].hide();
		}
	}
	bfh_additCtrlMouseOver(myId);
}
function bfh_ctrlrMouseOut(e) {
	var el1 = (e)?e.target:window.event.fromElement;
	var el2 = (e)?e.relatedTarget:window.event.toElement;
	var el1_1stP = bfh_1stParentDiv(el1);
	var el2_1stP = bfh_1stParentDiv(el2);
	if (el1_1stP==el2_1stP) return; //prevent textNodes or subelmnts from firing event
	var myId = el1_1stP.id;
	
	bfh_closeTimer = setTimeout('bfh_hideMenus()',bfh_menuTimeOut);bfh_closeTimerActive=true;
	bfh_additCtrlMouseOut(myId);
}
function bfh_ctrlrMouseDown(e) {
	var el1 = (e)?e.target:window.event.srcElement;
	if (window.event) window.event.cancelBubble = true;
	var el1_1stP = bfh_1stParentDiv(el1);
	var myId = el1_1stP.id;
	bfh_hideMenus();
	bfh_additCtrlMouseDown(myId);
}

// BFH - SCROLLBAR
//===============================================================
bfh_defScrollStep = (document.all)?30:60; //set higher for sluggish Mozilla :/
bfh_defScrollRepeat = (document.all)?100:100; //rate (msec) that scrolling is repeated
var bfh_scrollBarArray = new Array();
var bfh_scrollUpButtons = new Array();
var bfh_scrollDnButtons = new Array();
var bfh_scrollYScrollers = new Array();
var bfh_scrollBtnArray = new Array();
var bfh_isScrolling = false;
var bfh_isScrollingNumber = 0;
var bfh_isScrollingDir = '';
var bfh_scrollTimer = null;

var bfh_isDragging = false;
var bfh_isDragNumber = -1;
var bfh_isDragObj;
var bfh_isDragY;
/*
var bfh_isDragScrollYStart = 0;
var bfh_mouseX;
var bfh_mouseY;
*/

function bfh_scrollBar(number) {
	this.number = number;
	//* are needed items, if default is allright maybe left out for numerical values
	this.scrYDivId = ''; //* Div containing the slider and scroll buttons
	this.upBtnId = ''; //*
	this.upBtnImg = ''; //*
	this.upBtnRoImg = ''; //* roll-over image
	this.dnBtnId = ''; //*
	this.dnBtnImg = ''; //*
	this.dnBtnRoImg = ''; //* roll-over image
	this.alwaysVisible = false; //override to true if needed...
	this.otherObjToHide = new Array(); // put id's here of other div's that have 
	// to (dis)appear together with the scrollbar. Only if alwaysVisible is false.
		
	this.outerDivId = ''; //*
	this.outerDivHeight = 0;
	this.innerDivId = ''; //*
	this.innerDivHeight = 0;
	this.scrYDivHeight = 0;
	
	this.scrollStep = bfh_defScrollStep;
	this.scrollerYId = ''; //*
	this.scrollerYImg = ''; //*
	this.scrollerYRoImg = ''; //* roll-over image
	this.scrollerYPadTop = 0; //*
	this.scrollerYPadBot = 0; //* take in acount the height of the down button and the scroller
	this.scrollerYMin = 0;
	this.scrollerYMax = 0;
	this.scrollerYRange = 0;
	this.scrollerYPos = 0;
		
	this.offsetY = 0;
	this.offsetYPerc = 0;
	this.offsetYMax = 0;
	
	// BUILD, call after setting id's etc.
	bfh_scrollBar.prototype.build = function() {
		// put all buttonId's in array so that generic event function can find the appr. info.
		a = bfh_scrollBtnArray;
		a[this.upBtnId] = new Array();// up button
		a[this.upBtnId]['number'] = this.number;
		a[this.upBtnId]['type'] = 'up';
		a[this.upBtnId]['img'] = this.upBtnImg;
		a[this.upBtnId]['imgRo'] = this.upBtnRoImg;
		a[this.dnBtnId] = new Array();// down button
		a[this.dnBtnId]['number'] = this.number;
		a[this.dnBtnId]['type'] = 'dn';
		a[this.dnBtnId]['img'] = this.dnBtnImg;
		a[this.dnBtnId]['imgRo'] = this.dnBtnRoImg;
		a[this.scrollerYId] = new Array();// slider
		a[this.scrollerYId]['number'] = this.number;
		a[this.scrollerYId]['type'] = 'slider';
		a[this.scrollerYId]['img'] = this.scrollerYImg;
		a[this.scrollerYId]['imgRo'] = this.scrollerYRoImg;
		for (j in a) {
			if (a[j]['type']=='up'||a[j]['type']=='dn') {
				bfh_getObj(j).onmouseover = bfh_scrBtnMouseOver;
				bfh_getObj(j).onmouseout = bfh_scrBtnMouseOut;
				bfh_getObj(j).onmousedown = bfh_scrBtnMouseDown;
				bfh_getObj(j).onmouseup = bfh_scrBtnMouseUp;
			}
			if (a[j]['type']=='slider') {
				bfh_getObj(this.scrollerYId).onmouseover = bfh_scrScrMouseOver;
				bfh_getObj(this.scrollerYId).onmouseout = bfh_scrScrMouseOut;
				bfh_getObj(this.scrollerYId).onmousedown = bfh_scrScrMouseDown;
				bfh_getObj(this.scrollerYId).onmouseup = bfh_scrScrMouseUp;
			}
		}
		bfh_getObj(this.scrollerYId).style.top = this.scrollerYPadTop+'px';
		this.newSize();
	}
	// NEWSIZE, call on a page-resize, scrollOffset will be maintained
	bfh_scrollBar.prototype.newSize = function() {
		// this.innerDivHeight = bfh_getObj(this.innerDivId).scrollHeight;
		// this.outerDivHeight = bfh_getObj(this.outerDivId).scrollHeight;
		// replacing the scrollHeight with offsetHeight
		this.innerDivHeight = bfh_getObj(this.innerDivId).offsetHeight;
		this.outerDivHeight = bfh_getObj(this.outerDivId).offsetHeight;
		this.offsetYMax = this.innerDivHeight - this.outerDivHeight;
		if (this.offsetYMax<=0) this.offsetYMax = 0;
		if (this.offsetY>this.offsetYMax) this.offsetY = this.offsetYMax;

		this.scrYDivHeight = (document.all)?bfh_getObj(this.scrYDivId).clientHeight:bfh_getObj(this.scrYDivId).scrollHeight;//scrollHeight;
		this.scrollerYMin = this.scrollerYPadTop;
		this.scrollerYMax = this.scrYDivHeight - this.scrollerYPadBot;
		this.scrollerYRange = this.scrollerYMax - this.scrollerYMin;
		var vis = (this.offsetYMax==0)?'hidden':'visible';
		// top.status=vis; // for debugging
		if (this.alwaysVisible==true) {
			bfh_getObj(this.scrollerYId).style.visibility = vis; // hide only the slider
		} else {
			bfh_getObj(this.scrYDivId).style.visibility = vis;// hide all the controls
			if (this.otherObjToHide.length>0) {
				for (i=0;i<this.otherObjToHide.length;i++) {
					bfh_getObj(this.otherObjToHide[i]).style.visibility = vis; // hiding additional items
				}
			}
		}
	}
	// SETSCROLLERPOS, calculates % and moves scroller accordingly
	bfh_scrollBar.prototype.setScrollerPos = function() {
		this.offsetYPerc = (this.offsetYMax!=0)?(this.offsetY/this.offsetYMax):0;
		this.scrollerYPos = this.scrollerYMin + (this.offsetYPerc*this.scrollerYRange);
		bfh_getObj(this.scrollerYId).style.top = this.scrollerYPos+'px';
	}
	// SETINNERDIVPOS	
	bfh_scrollBar.prototype.setInnerDivPos = function() {
		bfh_getObj(this.innerDivId).style.top = (0-this.offsetY);
	}
	// RESET, call after loading new content
	bfh_scrollBar.prototype.reset = function() {
//		this.innerDivHeight = bfh_getObj(this.innerDivId).scrollHeight; // maybe error?
		this.innerDivHeight = bfh_getObj(this.innerDivId).offsetHeight;
		this.offsetY = 0;
		this.offsetPerc = 0;
		this.scrollerYPos = 0;
		this.newSize();
		this.setScrollerPos();
		this.setInnerDivPos();
	}
	// RESIZE, calls a set of prototype functions, call this on the window.onresize event.
	bfh_scrollBar.prototype.resize = function() {
		this.newSize();
		this.setScrollerPos();
		this.setInnerDivPos();
	}
	// CHECKSLIDER, call on dragging, limits movement of slider and updates scroll content after dragging.
	bfh_scrollBar.prototype.checkSlider = function() {
		var yPos = parseInt(bfh_getObj(this.scrollerYId).style.top);
		if (yPos>this.scrollerYMax) yPos = this.scrollerYMax;
		if (yPos<this.scrollerYMin) yPos = this.scrollerYMin;
		bfh_getObj(this.scrollerYId).style.top = yPos+'px';
		this.offsetYPerc = ((yPos-this.scrollerYMin)/this.scrollerYRange);
		this.offsetY = ((this.offsetYPerc)*parseInt(this.offsetYMax));
		this.setInnerDivPos();
	}
	// ARROWUP
	bfh_scrollBar.prototype.arrowUp = function() {
		this.offsetY -= this.scrollStep;
		if (this.offsetY<=0) this.offsetY = 0;
		this.setInnerDivPos();
		// top.status = this.offsetY;
	}
	// ARROWDOWN
	bfh_scrollBar.prototype.arrowDn = function() {
		this.offsetY += this.scrollStep;
		if (this.offsetY>=this.offsetYMax) this.offsetY = this.offsetYMax;
		this.setInnerDivPos();
		//		top.status = this.offsetY;
	}
	// SHOW
	bfh_scrollBar.prototype.show = function() {
		bfh_getObj(this.scrContainerId).style.visibility = 'visible';
	}
	// HIDE
	bfh_scrollBar.prototype.hide = function() {
		bfh_getObj(this.scrContainerId).style.visibility = 'hidden';
	}
}
	// functions for the scrollButtons
	//================================
function bfh_scrBtnMouseOver(e) {
	var node = (e)?e.target:window.event.toElement;
	if (node.id) myId = node.id;
	bfh_getObj(myId).src = bfh_scrollBtnArray[myId]['imgRo'];
}
function bfh_scrBtnMouseOut(e) {
	var node = (e)?e.target:window.event.fromElement;
	if (node.id) myId = node.id;
	bfh_isScrolling = false;
	bfh_getObj(myId).src = bfh_scrollBtnArray[myId]['img'];
}
function bfh_scrBtnMouseDown(e) {
	var nmb = bfh_scrollBtnArray[myId]['number'];
	var dir = bfh_scrollBtnArray[myId]['type'];
	bfh_scrollBarArray[nmb].newSize();
	bfh_isScrollingNumber = nmb;
	bfh_isScrollingDir = dir;
	bfh_isScrolling = true;
	bfh_btnKeepScrolling();
}
function bfh_scrBtnMouseUp() {
	bfh_isScrolling = false;
}
function bfh_btnKeepScrolling() {
	if (bfh_isScrolling==false) return;
	var nmb = bfh_isScrollingNumber; var dir = bfh_isScrollingDir;
	if (dir=='up') bfh_scrollBarArray[nmb].arrowUp();
	if (dir=='dn') bfh_scrollBarArray[nmb].arrowDn();
	bfh_scrollBarArray[nmb].setScrollerPos();
	bfh_scrollTimer = setTimeout('bfh_btnKeepScrolling()',bfh_defScrollRepeat);
}
	// functions for the scrollSliders
	//================================
function bfh_scrScrMouseOver(e) {
	var node = (e)?e.target:window.event.toElement;
	if (node.id) myId = node.id;
	bfh_getObj(myId).src = bfh_scrollBtnArray[myId]['imgRo'];
}
function bfh_scrScrMouseOut(e) {
	var node = (e)?e.target:window.event.fromElement;
	if (node.id) myId = node.id;
	bfh_getObj(myId).src = bfh_scrollBtnArray[myId]['img'];
	// added 19jan03, Mozilla keeps draggin when draggin l/r out of the slider. So trying to copy the mouse-up events to mouse-out.
	//
	// better would be prob. copying the events to the document.onmouseup
//	bfh_isDragging = false;
//	document.onmousemove = null;
}
function bfh_scrScrMouseDown(e) {
	if (!document.all&&!document.getElementById) return;
	var firedobj = (e)?e.target:event.srcElement;
	if (bfh_scrollBtnArray[firedobj.id]) {
		bfh_isDragging = true;
		bfh_isDragObj = document.getElementById(firedobj.id);
		bfh_isDragNumber = bfh_scrollBtnArray[firedobj.id]['number'];
		temp1=parseInt(bfh_isDragObj.style.top+0);
		bfh_isDragY = (e)?e.clientY:event.clientY;
		document.onmousemove = bfh_scrDrag;
		//added 19jan03
		document.onmouseup = bfh_scrScrMouseUp;
		return false
	}
}
function bfh_scrScrMouseUp(e) {
	bfh_isDragging = false;
	document.onmousemove = null;
	document.onmouseup = null;
}
function bfh_scrDrag(e) {
	if (bfh_isDragging){
	bfh_isDragObj.style.top=(e)? temp1+e.clientY-bfh_isDragY : temp1+event.clientY-bfh_isDragY;
	bfh_scrollBarArray[bfh_isDragNumber].checkSlider();
	return false
	}
}
// BFH - IFRAME LOADER
//===============================================================

function bfh_iframeLoader() {
	this.containerId = '';
	this.divId = '';
	this.loadingId = ''; // loading... div
	this.iframeId = '';
	this.bodyId = ''; // the id of the body of the loaded page
	this.loadingText = ''; // will be ignored if loadingId is set
	
	bfh_iframeLoader.prototype.loadContent = function(url) {
		myId = this.iframeId;
		myDiv = bfh_getObj(this.divId);
		if (this.loadingId!='') {
			bfh_getObj(this.divId).style.visibility='hidden';
			bfh_getObj(this.loadingId).style.visibility='visible';
		} else if (this.loadingText!='') {
			bfh_getObj(this.divId).innerHTML=this.loadingText;
		}
		bfh_getObj(myId).src = url;
	}
	bfh_iframeLoader.prototype.transferContent = function() {
		myDiv = bfh_getObj(this.divId);
		if (this.loadingId!='') bfh_getObj(this.loadingId).style.visibility='hidden';bfh_getObj(this.divId).style.visibility='visible';
		myDiv.innerHTML = window.frames[this.iframeId].document.getElementById(this.bodyId).innerHTML;
	}
}
