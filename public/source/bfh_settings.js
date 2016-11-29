

		// some default settings
var bfh_menuTimeOut = 350; //msec
var bfh_defOuterBorderWidth = 1;
var bfh_defInnerBorderWidth = 1;
var bfh_defMenuWidth = 140; //is EXCL. border. Mozilla renders border outside width, IE inside.
var bfh_defItemHeight = 20; //is INCL. borders between items.
var bfh_defZIndex = 90;
			// default class for container DIV, use to set opacity, cursor, text-style
var bfh_defContainerClass = 'bfhDefCont'; 
			// default classes for items, esp. useful if all pulldowns will have the same style
var bfh_defItemClass = 'bfhDefItem';
var bfh_defItemClass_ro = 'bfhDefItem_ro';
var bfh_defCaptionClass = 'bfhDefCaption';


// MENU ITEMS
//===========
// LABEL: 1 rule -> no DIV's
// TYPE:
//  0: item (default), can be left out.
//  1: caption, has no action or rollover
// ACTION: a javascript statement.

var i=0,j=0;
bfh_pdMenuItem = new Array();
bfh_pdMenuProp = new Array();

// next pulldown
bfh_pdMenuItem[i] = new Array();
bfh_pdMenuProp[i] = new Array();

bfh_pdMenuProp[i]['itemClass'] = 'pd0Item';
bfh_pdMenuProp[i]['itemClass_ro'] = 'pd0Item_ro';
bfh_pdMenuProp[i]['captionClass'] = 'pd0Head';
bfh_pdMenuProp[i]['ctrlrId'] = 'mainButton1';
bfh_pdMenuProp[i]['contLeft'] = 20;
bfh_pdMenuProp[i]['contTop'] = 139; //139

// next pulldown
i++;j=0;

bfh_pdMenuItem[1] = new Array();
bfh_pdMenuProp[1] = new Array();

bfh_pdMenuProp[1]['itemClass'] = 'pd1Item';
bfh_pdMenuProp[1]['itemClass_ro'] = 'pd1Item_ro';
bfh_pdMenuProp[1]['ctrlrId'] = 'mainButton2';
bfh_pdMenuProp[1]['contLeft'] = 120;
bfh_pdMenuProp[1]['contTop'] = 139; //139

// next pulldown
i++;j=0;
bfh_pdMenuItem[i] = new Array();
bfh_pdMenuProp[i] = new Array();

bfh_pdMenuProp[i]['itemClass'] = 'pd2Item';
bfh_pdMenuProp[i]['itemClass_ro'] = 'pd2Item_ro';
bfh_pdMenuProp[i]['captionClass'] = 'pd2Head';
bfh_pdMenuProp[i]['ctrlrId'] = 'mainButton3';
bfh_pdMenuProp[i]['contLeft'] = 220;
bfh_pdMenuProp[i]['contTop'] = 139; //139

// next pulldown
i++;j=0;
bfh_pdMenuItem[i] = new Array();
bfh_pdMenuProp[i] = new Array();

bfh_pdMenuProp[i]['itemClass'] = 'pd3Item';
bfh_pdMenuProp[i]['itemClass_ro'] = 'pd3Item_ro';
bfh_pdMenuProp[i]['captionClass'] = 'pd3Head';
bfh_pdMenuProp[i]['ctrlrId'] = 'mainButton4';
bfh_pdMenuProp[i]['contLeft'] = 320;
bfh_pdMenuProp[i]['contTop'] = 139; //139

// next pulldown
i++;j=0;
bfh_pdMenuItem[i] = new Array();
bfh_pdMenuProp[i] = new Array();

bfh_pdMenuProp[i]['itemClass'] = 'pd4Item';
bfh_pdMenuProp[i]['itemClass_ro'] = 'pd4Item_ro';
bfh_pdMenuProp[i]['captionClass'] = 'pd4Head';
bfh_pdMenuProp[i]['ctrlrId'] = 'mainButton5';
bfh_pdMenuProp[i]['contLeft'] = 420;
bfh_pdMenuProp[i]['contTop'] = 139; //139

// additional functionality of the pulldown menu-buttons, besides showing and hiding the menu.
function bfh_additCtrlMouseOver(id) {
	// put code here that should be executed besides the show/hide menu stuff.
	var myIndex = id.substr(10,1);
	var myColor = eval('clrCat'+myIndex+'_ro');
	bfh_getObj(id).style.backgroundColor = myColor;
}
function bfh_additCtrlMouseOut(id) {
	// put code here that should be executed besides the show/hide menu stuff.
	var myIndex = id.substr(10,1);
	var myColor = eval('clrCat'+myIndex);
	bfh_getObj(id).style.backgroundColor = myColor;
}
function bfh_additCtrlMouseDown(id) {
	// put code here that should be executed besides the show/hide menu stuff.
	var myIndex = id.substr(10,1);
	var titleBarClass = 'titleBarCat' + myIndex;
	bfh_getObj('titleBarDiv').className = titleBarClass;
	bfh_getObj('buttonBarRightPiece').style.backgroundColor = eval('clrCat'+myIndex);
	// load summary pages left & right
	loader1.loadContent('summaryLeft.php?cat='+myIndex);
	loader2.loadContent('summaryRight.php?cat='+myIndex);
}
