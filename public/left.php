<?php
error_reporting (E_ALL);
$parseSmilies=1;
include "source/db.php";
include "source/colors.php";
include "source/formatText.inc.php";

$errorMsg="";
$errorExists=false;

$reqId=@$_GET['pageId'];
$catIndex=@$_GET['cat'];
if (!is_numeric($reqId)) {
	$errorExists=true;
	$errorMsg="The requested page id is invalid.";
}
if ($errorExists==false) {
	$dbLink = mysql_connect($dbHost,$dbUser,$dbPass) or die ("error in mysql_connect: ".mysql_error());
	mysql_select_db($dbDb,$dbLink) or die ("error in mysql_select_db: ".mysql_error());
	// $query = "SELECT * FROM $tbl_pf_pages	WHERE	$tbl_pf_pages.id=$reqId ;";
	$query = "
	SELECT 
		* 
	FROM 
		$tbl_pf_pages,
		$tbl_pf_categories
	WHERE	
		$tbl_pf_pages.id=$reqId 
	AND
		$tbl_pf_pages.categoryId=$tbl_pf_categories.id
	;";
	
	$pageResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
	if (mysql_num_rows($pageResult)!=1) {
		$errorExists=true;
		$errorMsg="The page can not be found.";
	}
}
// no error -> fill resArray
if ($errorExists==false) {
	$resArray = mysql_fetch_array($pageResult);
}
// redirecting if neccessary, only if no error exists
if ($errorExists==false) {
	if (strlen($resArray['altTextFile'])>0) {
		$targetUrl = 'http://'.$_SERVER['HTTP_HOST'].'/'.$altPagesBaseDir.$resArray['altTextFile'];
		header("Location: $targetUrl");
		exit;
	}
}
// no redirect, put content OR error msg in page.
if ($errorExists==true) {
	$content = $errorMsg;
} else {
	$content="";
	$clrIndex = $catIndex+1;
	if ($clrIndex>5) $clrIndex=5;
	$color = ${"clrCat".$clrIndex."_ro"};

	$title = $resArray['title'];
	$titleShort = $resArray['titleShort'];
	$category = $resArray['name'];
	$pageTitle = "/".strtolower($category)."/".strtolower($titleShort);
	
	$titlePrint = "<div style='height:50px;'><H1 style='border-bottom-color:$color'>$title</H1></div>";

//	$titlePrint = "<div class='H1' style='border-bottom-color:$color'>$title</div>";
	$content=fMainText($resArray['content'],$color,$clrLines);
//	$content.=$resArray['content'];
}


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>Untitled</title>
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="Tue, 08 Apr 1997 17:20:00 GMT">

<script language="JavaScript"> 
function stopError() { return true; }
window.onerror=stopError; 
</script> 
</head>

<!--<body id='textPageBody' onload="parent.xferContent('blaat');">-->
<body id='textPageBody' onload="top.leftLoaded('<?=$pageTitle?>',<?=$catIndex?>);">
<?php echo $titlePrint; ?>
<?php echo $content; ?>
<br>
<br>
</body>
</html>
