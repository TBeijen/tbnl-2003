var contentWindow = null; // declaring global var for the content window

// functions for loading content in iframe's
//==========================================

function loadPages(index,catIndex) {
//	setColors(catIndex); //will be changed to calling from loaded page
	loadContent(index,catIndex);
}
function loadPagesById(id,catIndex) {
//	setColors(catIndex); //will be changed to calling from loaded page
	leftTarget = 'left.php?pageId='+id+'&cat='+catIndex;
	rightTarget = 'right.php?pageId='+id+'&cat='+catIndex;
	loader1.loadContent(leftTarget);
	loader2.loadContent(rightTarget);
}
function loadContent(index,catIndex) {
	var pageId = pageArray[index]['pageId'];
	leftTarget = 'left.php?pageId='+pageId+'&cat='+catIndex;
	rightTarget = 'right.php?pageId='+pageId+'&cat='+catIndex;
//	top.status = 'left: '+leftTarget+', right: '+rightTarget;
	loader1.loadContent(leftTarget);
	loader2.loadContent(rightTarget);
}
function loadContentById(id,catIndex) {
	var pageId = id;
	leftTarget = 'left.php?pageId='+pageId+'&cat='+catIndex;
	rightTarget = 'right.php?pageId='+pageId+'&cat='+catIndex;
//	top.status = 'left: '+leftTarget+', right: '+rightTarget;
	loader1.loadContent(leftTarget);
	loader2.loadContent(rightTarget);
}
function leftLoaded(pageTitle,catIndex) {
	loader1.transferContent();
	bfh_scrollBarArray[0].reset();
	bfh_getObj('titleBarDiv').innerHTML = pageTitle;
	setColors(catIndex);
}
function rightLoaded() {
	loader2.transferContent();
	bfh_scrollBarArray[1].reset();
}
function setColors(catIndex) {
	var usedIndex = catIndex+1;
	var titleBarClass = 'titleBarCat' + usedIndex;
	bfh_getObj('titleBarDiv').className = titleBarClass;
	bfh_getObj('buttonBarRightPiece').style.backgroundColor = eval('clrCat'+usedIndex);
	return true;
}
// functions to handle image mouseovers and loads in right pane
//=============================================================

function highlightImage(imgId,imgW,imgH,bgClr,imgText) {
//	alert("check");
	theImg = bfh_getObj(imgId);
	imgXpos = bfh_getAbsX(theImg);
	imgYpos = bfh_getAbsY(theImg);
	
	theRColBLine = bfh_getObj('imgScrLineBottom');
	lineYpos = bfh_getAbsY(theRColBLine);
	
	divXpos = imgXpos;
	divYpos = imgYpos+imgH+1;
	
	if (divYpos>lineYpos) divYpos = lineYpos+1;
	
	theDiv = bfh_getObj('highLiteDiv');
	if (imgText!='') theDiv.innerHTML=imgText; 
	theDiv.style.left = divXpos+'px';
	theDiv.style.top = divYpos+'px';
	theDiv.style.visibility = 'visible';
}
function highlightNone() {
	theDiv = bfh_getObj('highLiteDiv');
	theDiv.innerHTML = "view in new window";
	theDiv.style.visibility = 'hidden';
//	top.status = "check";
}
function launchContent(imgId,type,altFile) {
		// actiontypes:
		// 0 - (default) image in pop-up window
		// 1 - download, download file should be in contDownloads/
		// 2 - other page in popup-window (for example flash or shockwave)

		if (type=='0') contentWindow = window.open("showContent.php?id="+imgId,"contentWindow","toolbar=no,location=no,menubar=no,status=yes,screenX=40,screenY=40,width=400,height=300,resizable=yes,scrollbars=yes");
		if (type=='1') location.href='contDownloads/'+altFile;
		if (type=='2') contentWindow = window.open("contAltPages/"+altFile,"contentWindow","toolbar=no,location=no,menubar=no,status=yes,screenX=40,screenY=40,width=400,height=300,resizable=yes,scrollbars=yes");

}

// functions for handling page load & resize events
//=================================================

function allResizeStuff() {
	setSizes();
	for (i in bfh_scrollBarArray) {
		bfh_scrollBarArray[i].resize();
	}
	var1 = bfh_scrollBarArray[0].offsetYMax;
	var2 = bfh_getObj(bfh_scrollBarArray[0].innerDivId).scrollHeight;
	var3 = bfh_getObj(bfh_scrollBarArray[0].outerDivId).scrollHeight;
	var4 = bfh_getObj(bfh_scrollBarArray[0].innerDivId).offsetHeight;
	var5 = bfh_getObj(bfh_scrollBarArray[0].outerDivId).offsetHeight;

//	top.status='offsetYMax='+var1+', innerD.scrH='+var2+', innerD.offsH='+var4+', outerD.scrH='+var3+', outerD.offsH='+var5;
}

function setSizes() {
	// resizes content & scrollerDiv's
	var pHeight = bfh_getPageHeight();
	var contDivH = pHeight - 221;
	var textScrollH = pHeight - 160;
	var corFactor = (!document.all)?1:0;
	bfh_getObj('textContainer').style.height = contDivH;
	bfh_getObj('imgContainer').style.height = contDivH;
	bfh_getObj('textScrollContainer').style.height = textScrollH;
	bfh_getObj('imgScrollContainer').style.height = contDivH + corFactor;
//	top.status = bfh_getObj('textDiv').scrollHeight;
}

// functions to set up the loaders & scrollbars
// ============================================

function buildLoaders() {
	//textLoader
	loader1 = new bfh_iframeLoader();
	loader1.iframeId = 'ldrText';
	loader1.divId = 'textDiv';
	loader1.bodyId = 'textPageBody';
	loader1.loadingText = 'Loading...';
	//imgLoader
	loader2 = new bfh_iframeLoader();
	loader2.iframeId = 'ldrImages';
	loader2.divId = 'imgDiv';
	loader2.bodyId = 'imgPageBody';
	loader2.loadingText = 'Loading...';
}
function buildScrollBars() {
	// text layer scrollbar
	bfh_scrollBarArray[0] = new bfh_scrollBar(0);
	sb1 = bfh_scrollBarArray[0];
	sb1.scrYDivId = 'textScrollContainer';
	sb1.upBtnId = 'btnTextScrollUp';
	sb1.upBtnImg = 'images/scrollUp.gif';
	sb1.upBtnRoImg = 'images/scrollUp_ro.gif';
	sb1.dnBtnId = 'btnTextScrollDn';
	sb1.dnBtnImg = 'images/scrollDn.gif';
	sb1.dnBtnRoImg = 'images/scrollDn_ro.gif';
	sb1.scrollerYId = 'scrollerText';
	sb1.scrollerYImg = 'images/scrollBar.gif';
	sb1.scrollerYRoImg = 'images/scrollBar_ro.gif';
	sb1.scrollerYPadTop = 59;
	sb1.scrollerYPadBot = 120;
	sb1.outerDivId = 'textContainer';
	sb1.innerDivId = 'textDiv';
	sb1.build();
	// 2nd scrollbar
	bfh_scrollBarArray[1] = new bfh_scrollBar(1);
	sb2 = bfh_scrollBarArray[1];
	sb2.scrYDivId = 'imgScrollContainer';
	sb2.upBtnId = 'btnImgScrollUp';
	sb2.upBtnImg = 'images/scrollUp.gif';
	sb2.upBtnRoImg = 'images/scrollUp_ro.gif';
	sb2.dnBtnId = 'btnImgScrollDn';
	sb2.dnBtnImg = 'images/scrollDn.gif';
	sb2.dnBtnRoImg = 'images/scrollDn_ro.gif';
	sb2.scrollerYId = 'scrollerImg';
	sb2.scrollerYImg = 'images/scrollBar.gif';
	sb2.scrollerYRoImg = 'images/scrollBar_ro.gif';
	sb2.scrollerYPadTop = 19;
	sb2.scrollerYPadBot = 100;
//	sb2.outerDivId = 'imgContainer';
//	sb2.innerDivId = 'imgDiv';
	sb2.outerDivId = 'imgContainer';
	sb2.innerDivId = 'imgDiv';
	sb2.otherObjToHide[0] = 'imgScrLineTop';
	sb2.otherObjToHide[1] = 'imgScrLineBottom';
	sb2.build();
}

function makeRollOvers() {
	bfh_makeRollover('img_home','images/home.gif','images/home_ro.gif')
	bfh_makeRollover('img_contact','images/contact.gif','images/contact_ro.gif')
}