<?php
header("Content-type: text/css");

include "colors.php";

echo "

/* DEFAULT TAGS *\
\*==============*/

BODY {
	width: 100%;
	height: 100%;
	background-color: $clrPageBg;
	color: $clrLines;
	margin: 0px 0px 0px 0px;
	padding: 0px 0px 0px 0px;
	overflow: hidden;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
}
.basicText {
	color: $clrLines;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
}


/* MAIN LAYERS, DEFINING THE AREAS *\
\*=================================*/

#mainLeftDiv {
	position: absolute;
	height: 460px;
	width: 410px;
	top: 0px;
	left: 50%;
	margin-left: -800px;
	padding: 0px;
	background-image: url($cssImageLoc/leftDiv.gif);
	background-repeat: no-repeat;
	z-index: 1;
}
#mainRightDiv {
	position: absolute;
	height: 170px;
	width: 410px;
	top: 0px;
	left: 50%;
	margin-left: 390px;
	padding-left: 0px;
	background-image: url($cssImageLoc/rightDiv.gif);
	background-repeat: no-repeat;
	z-index: 2;
}
#mainColumnDiv {
	position: absolute;
	top: 0px;
	left: 50%;
	width: 141px;
	height: 100%;
	margin-left: 210px;
	background-color: $clrColumn;
}
	#mainColumnLeftLine {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 1px;
		height: 100%;
		background-color: $clrLines;
	}
	#mainColumnRightLine {
		position: absolute;
		top: 0px;
		left: 140px;
		width: 1px;
		height: 100%;
		background-color: $clrLines;
	}
#mainCenterDiv {
	position: absolute;
	height: 100%;
	width: 781px;
	top: 0px;
	left: 50%;
	margin-left: -390px;
	z-index: 5;
}
#mainBottomDiv {
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 20px;
	border-top: 1px solid $clrLines;
	margin: 0px;
	z-index: 6;
}

/* LAYERS INSIDE THE 'mainCenterDiv' *\
\*===================================*/

#centerTopDiv {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 370px;
	background-image: url($cssImageLoc/centerTopDiv.gif);
	background-repeat: no-repeat;
	z-index: 7;
}

#centerBottomDiv {
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 26px;
	border: 0px solid $clrLines;
	border-left: 1px solid $clrLines;
	border-right: 1px solid $clrLines;
	z-index: 7;
}
	#updatedDiv {
		position: absolute;
		left: 610px;
		top: 9px;
		font-family: arial, helvetica, sans-serif;
		font-size: 10px;
		color: $clrUpdatedText;
	}
	#statusDiv {
		position: absolute;
		left: 40px;
		top: 9px;
		font-family: arial, helvetica, sans-serif;
		font-size: 10px;
		color: $clrUpdatedText;*/
	}
#titleBarDiv {
	position: absolute;
	left: 40px;
	top: 59px;
	width: 560px;
	height: 60px;
	padding-left: 10px;
	font-family: verdana, arial, sans-serif;
	font-size: 14px;
	font-weight: bold;
	line-height: 20px;
	z-index: 7;
}
#buttonDiv {
	position: absolute;
	left: 1px;
	top: 120px;
	width: 400px;
	height: 19px;
	z-index: 8;
}
/* CLASSES OF 'titleBarDiv' *\
\*==========================*/

.titleBarCat1 {
	background-image: url($cssImageLoc/$imgTitleCat1);
	background-repeat: no-repeat;
	color: $clrTitleTextCat1;
}
.titleBarCat2 {
	background-image: url($cssImageLoc/$imgTitleCat2);
	background-repeat: no-repeat;
	color: $clrTitleTextCat2;
}
.titleBarCat3 {
	background-image: url($cssImageLoc/$imgTitleCat3);
	background-repeat: no-repeat;
	color: $clrTitleTextCat3;
}
.titleBarCat4 {
	background-image: url($cssImageLoc/$imgTitleCat4);
	background-repeat: no-repeat;
	color: $clrTitleTextCat4;
}
.titleBarCat5 {
	background-image: url($cssImageLoc/$imgTitleCat5);
	background-repeat: no-repeat;
	color: $clrTitleTextCat5;
}

/* CLASSES OF 5 MAIN BUTTONS *\
\*===========================*/

#btn_home {
	position: absolute;
	left: 1px;
	top: 120px;
	width: 39px;
	height: 19px;
	cursor: default;
	cursor: hand;
	z-index: 9;
}

#btn_contact {
	position: absolute;
	left: 741px;
	top: 120px;
	width: 39px;
	height: 19px;
	cursor: default;
	cursor: hand;
	z-index: 9;
}

.mainButton {
	position: absolute;
	top: 120px;
	width: 99px;
	height: 19px;
	line-height: 17px;
	color: $clrLinesLight;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
	font-weight: bold;
	text-align: -moz-center;
	text-align: center;
	filter: Alpha(opacity=90);
	-moz-opacity: 90%;
	z-index: 9;
	cursor: default;
	cursor: hand;
}

#mainButton1 {
	left: 41px;
	background-color: $clrCat1;
}
#mainButton2 {
	left: 141px;
	background-color: $clrCat2;
}
#mainButton3 {
	left: 241px;
	background-color: $clrCat3;
}
#mainButton4 {
	left: 341px;
	background-color: $clrCat4;
}
#mainButton5 {
	left: 441px;
	background-color: $clrCat5;
}

#buttonBarRightPiece {
	position: absolute;
	top: 120px;
	left: 541px;
	width: 59px;
	height: 19px;
	background-color: $clrCat1;
	filter: Alpha(opacity=90);
	-moz-opacity: 90%;
	z-index: 9;
}

/* 5 PULLDOWN RELATED CLASSES *\
\*============================*/

.bfhDefCont {
	position: absolute;
	visibility: hidden;
	/* don't change above values */
	border-color: $clrLinesLight;
	border-style: solid;
	color; $clrLinesLight;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
	font-weight: normal;
	text-align: -moz-center;
	text-align: center;
	filter: Alpha(opacity=90);
	-moz-opacity: 90%;
}

.bfhDefItem {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	background-color: $clrCat1;
	border-color: $clrMenuLineCat1;
	border-style: solid;
	cursor: default;
	cursor: hand;

}

.pd0Cont {
	position: absolute;
	left: 20px;
	top: 139px;
	border-color: $clrLinesLight;
	border-style: solid;
	color; $clrLinesLight;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
	font-weight: normal;
	text-align: -moz-center;
	text-align: center;
	filter: Alpha(opacity=90);
	-moz-opacity: 90%;
}
.pd0Item {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat1;
	border-color: $clrMenuLineCat1;
	border-style: solid;
}
.pd0Item_ro {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat1_ro;
	border-color: $clrMenuLineCat1;
	border-style: solid;
}
.pd1Item {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat2;
	border-color: $clrMenuLineCat2;
	border-style: solid;
}
.pd1Item_ro {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat2_ro;
	border-color: $clrMenuLineCat2;
	border-style: solid;
}
.pd2Item {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	color: $clrLinesLight;
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat3;
	border-color: $clrMenuLineCat3;
	border-style: solid;
}
.pd2Item_ro {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	color: $clrLinesLight;
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat3_ro;
	border-color: $clrMenuLineCat3;
	border-style: solid;
}

.pd3Item {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat4;
	border-color: $clrMenuLineCat4;
	border-style: solid;
}
.pd3Item_ro {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat4_ro;
	border-color: $clrMenuLineCat4;
	border-style: solid;
}

.pd4Item {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat5;
	border-color: $clrMenuLineCat5;
	border-style: solid;
}
.pd4Item_ro {
	position: absolute;
	border-width: 0px;
	left: 0px;
	width: 100%;
	/* don't change above values */
	line-height: 19px;
	cursor: default;
	cursor: hand;
	background-color: $clrCat5_ro;
	border-color: $clrMenuLineCat5;
	border-style: solid;
}

/* CONTAINER DIV'S *\
\*=================*/

#textContainer {
	position: absolute;
	left: 40px;
	top: 180px;
	width: 520px;
	height: 100px;
	/* background-color: yellow;
	filter: Alpha(opacity=40);
	-moz-opacity: 40%; */
	overflow: hidden;
	z-index: 10;
}
#textDiv {
	position: absolute;
	left: 0px;
	top: 0px;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
	line-height: 18px;
}
#textScrollContainer {
	position: absolute;
	left: 580px;
	top: 140px;
	width: 20px;
	height: 300px;
	border-left: 1px solid $clrLines;
	z-index: 10;
}
	#btnTextScrollUp {
		position: absolute;
		top: 40px;
		left: 0px;
		z-index: 11;
	}
	#btnTextScrollDn {
		position: absolute;
		bottom: 20px;
		left: 0px;
		z-index: 11;
	}
	#scrollerText {
		position: relative;
		top: 59px;
		left: 0px;
		z-index: 10;
	}

#imgContainer {
	position: absolute;
	left: 601px;
	top: 180px;
	width: 139px;
	height: 100px;
/*	background-color: yellow;
	filter: Alpha(opacity=40);
	-moz-opacity: 40%; */
	overflow: hidden;
	z-index: 10;
}
#imgDiv {
	position: absolute;
	left: 0px;
	top: 0px;
	font-family: verdana, arial, sans-serif;
	font-size: 12px;
	line-height: 18px;
}
#imgScrLineTop {
	position: absolute;
	left: 50%;
	top: 180px;
	width: 140px;
	height: 1px;
	margin-left: 210px;
	background-color: $clrLines;
	z-index: 20;
	overflow: hidden;
}
#imgScrLineBottom {
	position: absolute;
	left: 50%;
	bottom: 40px;
	width: 140px;
	height: 1px;
	margin-left: 210px;
	background-color: $clrLines;
	z-index: 20;
	overflow: hidden;
}
#imgScrollContainer {
	position: absolute;
	left: 741px;
	top: 180px;
	width: 20px;
	height: 300px;
	z-index: 10;
}
	#btnImgScrollUp {
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 11;
	}
	#btnImgScrollDn {
		position: absolute;
		bottom: 0px;
		left: 0px;
		z-index: 11;
	}
	#scrollerImg {
		position: absolute;
		top: 19px;
		left: 0px;
		z-index: 10;
	}
	#imgScrLineRight {
		position: absolute;
		right: 0px;
		top: 0px;
		width: 1px;
		height: 100%;
		background-color: $clrLines;
		z-index: 11;
	}

/* MAIN CONTENT *\
\*==============*/

H1 {
	font-family: verdana, arial, sans-serif;
	font-size: 16px;
	font-weight: bold;
	color: $clrLines;
	padding-bottom: 5px;
	border-bottom-width: 1px;
	border-bottom-color: $clrLines;
	order-bottom-style: dashed;
	border-bottom-style: solid;
	display: inline;
}
H2 {
	font-family: verdana, arial, sans-serif;
	font-size: 13px;
	font-weight: bold;
	color: $clrLines;
	margin-top: 20px;
	margin-bottom: 10px;
}
H3 {
	font-family: verdana, arial, sans-serif;
	font-size: 13px;
	font-weight: bold;
	color: $clrLines;
	margin-top: 0px;
	margin-bottom: 10px;
}

P {
	margin-top: 0px;
	margin-bottom: 20px;
}
A:link {
	color: $clrBasicLink;
	text-decoration: none;
}
A:visited {
	color: $clrBasicLink;
	text-decoration: none;
}
A:hover {
	color: $clrBasicLink;
	text-decoration: underline;
}
A:active {
	color: $clrBasicLink;
	text-decoration: none;
}
UL {
	list-style-type : disc;
	list-style-position : outside;
	color: $clrLines;
	padding-top: 0px;
	margin-top: 0px;
	padding-left: 18px;
	margin-left: 0px;
}
LI {
	margin-top: 0px;
}
HR.summary {
	border-style: dashed;
	border-width: 0px;
	height: 0px;
	border-bottom-width: 1px;
	margin-top: 10px;
	margin-bottom: 10px;
}

#highLiteDiv {
	position: absolute;
	width: 139px;
	height: 20px;
	z-index: 60;
	font-family: arial, helvetica, sans-serif;
	font-size: 10px;
	line-height:20px;
	background-color: #3D3D3D;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: $clrLines;
	text-align: -moz-center;
	text-align: center;
	cursor: default;
	visibility: hidden;
}
.contentImage {
	border-style: solid;
	border-width: 1px;
	border-color: $clrLines;
}
"
