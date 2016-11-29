<?
error_reporting (E_ALL);
include "source/colors.php";
include "source/db.php";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>-[ Tibo Beijen ]-</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

	<link rel='stylesheet' href='source/default.css.php' type='text/css'>
	<script language="JavaScript" type="text/javascript" src="source/bfh_settings.js"></script>
	<script language="JavaScript" type="text/javascript" src="source/bfh.js"></script>
	<script language="JavaScript" type="text/javascript" src="source/main.js"></script>
<script language="JavaScript" type="text/javascript">

// var bfh = 0;
var bfh_imgPath = 'images/';
bfh_imagesToLoad = new Array();

var bfh = 0, a = bfh_imagesToLoad, b = bfh_imgPath;
a[bfh++] = b+'titleBar1.gif';	
a[bfh++] = b+'titleBar2.gif';	
a[bfh++] = b+'titleBar3.gif';	
a[bfh++] = b+'titleBar4.gif';	
a[bfh++] = b+'titleBar5.gif';
a[bfh++] = b+'scrollUp.gif';
a[bfh++] = b+'scrollDn.gif';
a[bfh++] = b+'scrollUp_ro.gif';
a[bfh++] = b+'scrollDn_ro.gif';
a[bfh++] = b+'home.gif';
a[bfh++] = b+'home_ro.gif';
a[bfh++] = b+'contact.gif';
a[bfh++] = b+'contact_ro.gif';

// some colors used outside css
<?
echo "var clrCat1 = '".$clrCat1."';\n";
echo "var clrCat2 = '".$clrCat2."';\n";
echo "var clrCat3 = '".$clrCat3."';\n";
echo "var clrCat4 = '".$clrCat4."';\n";
echo "var clrCat5 = '".$clrCat5."';\n";
echo "var clrCat1_ro = '".$clrCat1_ro."';\n";
echo "var clrCat2_ro = '".$clrCat2_ro."';\n";
echo "var clrCat3_ro = '".$clrCat3_ro."';\n";
echo "var clrCat4_ro = '".$clrCat4_ro."';\n";
echo "var clrCat5_ro = '".$clrCat5_ro."';\n";
?>

<?
// main functionality

// connecting & selecting the approp DB
$dbLink = mysql_connect($dbHost,$dbUser,$dbPass) or die ("error in mysql_connect: ".mysql_error());
mysql_select_db($dbDb,$dbLink) or die ("error in mysql_select_db: ".mysql_error());
// getting the first 5 categories (as our page only allows us to display 5)
// categories will be put in Array for convenient printing of menu Headers
// a string will be built with the 5 approp. categorie id's so all the items can be retrieved.
$query = "
	SELECT
		id,
		active,
		rank,
		name
	FROM
		$tbl_pf_categories
	WHERE
		active=1
	ORDER BY
		rank
	LIMIT
		5
	;";
$catResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
$i=0;
while ($catResultArray = mysql_fetch_array($catResult)) {
	$categories[$i]['id'] = $catResultArray['id'];
	$categories[$i]['name'] = $catResultArray['name'];
	$i++;
}
// building the whereString
$whereClause = "(";
while (list($key,) = each($categories)) {
	$whereClause.=$categories[$key]['id'].",";
}
$whereClause = substr($whereClause,0,-1).")";

// query that retrieves all pages
$query = "
	SELECT
		$tbl_pf_categories.id,
		$tbl_pf_categories.active,
		$tbl_pf_categories.rank,
		$tbl_pf_categories.name,
	
		$tbl_pf_pages.id,
		$tbl_pf_pages.categoryId,
		$tbl_pf_pages.active,
		$tbl_pf_pages.rank,
		$tbl_pf_pages.titleShort,
		$tbl_pf_pages.altTextFile,
		$tbl_pf_pages.altImgFile
	FROM
		$tbl_pf_categories,
		$tbl_pf_pages
	WHERE
		$tbl_pf_categories.id IN $whereClause
	AND
		$tbl_pf_pages.categoryId = $tbl_pf_categories.id
	AND
		$tbl_pf_pages.active=1
	ORDER BY
		$tbl_pf_categories.rank, $tbl_pf_pages.rank ASC
	;";
$pagesResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
// temp, ff checken.... (yuk)
$rows = mysql_num_rows($pagesResult);
$fields = mysql_num_fields($pagesResult);

// building ourselves a nice array ($php-menuData) with all neccessary data...
// that array will be used to write javascript into the page
$i=0;
while ($pagesResultArray = mysql_fetch_array($pagesResult)) {
	$php_menuData[$i]['categoryId'] = $pagesResultArray["categoryId"];
	$php_menuData[$i]['pageId'] = $pagesResultArray["id"];
	$php_menuData[$i]['titleShort'] = $pagesResultArray["titleShort"];
	$php_menuData[$i]['altTextFile'] = $pagesResultArray["altTextFile"];
	$php_menuData[$i]['altImgFile'] = $pagesResultArray["altImgFile"];
	$i++;
}
echo "// *** PHP generated js vars ***\n";
echo "// =============================\n";
echo "\n";
echo "// writing vars so that the pulldown knows what to do\n";
echo "// the pageArray[] contains data for $loadFuncName() to function\n";
echo "// at the same time the bfh_pdMenuItem[] array is built (which is normally in a settings file)\n";
echo "\n";

$menuX = 0;
$menuY = 0;
$currentCatId = $php_menuData[0]['categoryId'];

echo "var pageArray = new Array();\n";
echo "bfh_pdMenuItem[0] = new Array();";

for ($j=0;$j<$i;$j++) {
	if ($php_menuData[$j]['categoryId']!=$currentCatId) {
		// moving to the next category (which is the next pulldown)
		$menuX++;
		$menuY=0;
		$currentCatId=$php_menuData[$j]['categoryId']; //whoops, vergeten.....
		echo "bfh_pdMenuItem[$menuX] = new Array();";
	}
	echo "pageArray[$j] = new Array();\n";
	echo "pageArray[$j]['pageId']      = ".$php_menuData[$j]['pageId'].";\n";
	echo "pageArray[$j]['catIndex']    = ".$menuX.";\n";
//	echo "pageArray[$j]['altTextFile'] = '".$php_menuData[$j]['altTextFile']."';\n";
//	echo "pageArray[$j]['altImgFile']  = '".$php_menuData[$j]['altImgFile']."';\n";
	echo "// $menuX\n";
	echo "\n";
	echo "bfh_pdMenuItem[$menuX][$menuY] = new Array();\n";
	echo "bfh_pdMenuItem[$menuX][$menuY]['label'] = '".$php_menuData[$j]['titleShort']."';\n";
	echo "bfh_pdMenuItem[$menuX][$menuY]['action'] = '".$loadFuncName."(".$j.",".$menuX.")';\n";
	
	$menuY++;
}
?>


function pageInit() {
	bfh_preloadImages();
	bfh_buildAllMenus('mainCenterDiv');
	setSizes();
	buildLoaders();
	buildScrollBars();
	makeRollOvers();
	loadPages(0,0);
}
</script>
</head>

<body onload='pageInit();' onresize="allResizeStuff();">
<!-- static decoration -->
<div id="mainLeftDiv"></div>
<div id="mainRightDiv"></div>
<div id="mainColumnDiv">
	<div id="mainColumnLeftLine"></div>
	<div id="mainColumnRightLine"></div>
</div>
<div id="mainBottomDiv"></div>
<div id="imgScrLineTop"></div>
<div id="imgScrLineBottom"></div>

<!-- main center column -->
<div id="mainCenterDiv">
	<!-- layout, background images -->
	<div id="centerTopDiv"></div>
	<div id="centerBottomDiv">
		<div id="updatedDiv">site updated: 2003/06/03</div>
		<div id="statusDiv">...</div>
	</div>
	<div id="titleBarDiv" class="titlebarCat1">/about/welcome</div>
	<div id="btn_home"><img id="img_home" src="images/home.gif" width="39" height="19" alt="" border="0" onmousedown="loadPages(0,0);"></div>
	<div id="btn_contact"><img id="img_contact" src="images/contact.gif" width="39" height="19" alt="" border="0" onmousedown="loadPages(3,0);"></div>
	<!-- button row -->
	<div id="mainButton1" class="mainButton"><?=$categories[0]['name']?></div>
	<div id="mainButton2" class="mainButton"><?=$categories[1]['name']?></div>
	<div id="mainButton3" class="mainButton"><?=$categories[2]['name']?></div>
	<div id="mainButton4" class="mainButton"><?=$categories[3]['name']?></div>
	<div id="mainButton5" class="mainButton"><?=$categories[4]['name']?></div>
	<div id="buttonBarRightPiece"></div>
			
	<!-- content divs -->
	<div id="textContainer">
		<div id="textDiv">
		</div>
	</div>
	<div id="imgContainer">
		<div id="imgDiv"></div>
	</div>

	<div id="textScrollContainer">
		<img id="btnTextScrollUp" src="images/scrollUp.gif" width="19" height="20" alt="" border="0">
		<img id="btnTextScrollDn" src="images/scrollDn.gif" width="19" height="20" alt="" border="0">
		<img id="scrollerText" class="grab" src="images/scrollBar.gif" width="19" height="81" alt="" border="0">
	</div>
	
	<div id="imgScrollContainer">
		<img id="btnImgScrollUp" src="images/scrollUp.gif" width="19" height="20" alt="" border="0">
		<img id="btnImgScrollDn" src="images/scrollDn.gif" width="19" height="20" alt="" border="0">
		<img id="scrollerImg" src="images/scrollBar.gif" width="19" height="81" alt="" border="0">
		<div id="imgScrLineRight"></div>
	</div>
</div>
<div id="highLiteDiv">view in new window</div>
<!-- iframe loaders -->
<iframe id="ldrText" name="ldrText" style="position:absolute;width:auto;height:auto;visibility:hidden;"></iframe>
<!--<iframe id="ldrText" name="ldrText" style="z-index:50;position:absolute;width:auto;height:auto;"></iframe>-->
<iframe id="ldrImages" name="ldrImages" style="position:absolute;width:auto;height:auto;visibility:hidden;"></iframe>
</body>
</html>