<?
error_reporting (E_ALL);
include "source/db.php";
include "source/colors.php";
include "source/formatText.inc.php";

$errorMsg="";
$errorExists=false;

$imgId=@$_GET['id'];
if (!is_numeric($imgId)) {
	$errorExists=true;
	$errorMsg="The image can not be found id is invalid.";
}
if ($errorExists==false) {
	$dbLink = mysql_connect($dbHost,$dbUser,$dbPass) or die ("error in mysql_connect: ".mysql_error());
	mysql_select_db($dbDb,$dbLink) or die ("error in mysql_select_db: ".mysql_error());
	$query = "
	SELECT 
		* 
	FROM 
		$tbl_pf_images
	WHERE	
		id=$imgId 
	;";
	
	$pageResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
	if (mysql_num_rows($pageResult)!=1) {
		$errorExists=true;
		$errorMsg="The image can not be found.";
	}
}
// no error -> fill resArray
if ($errorExists==false) {
	$resArray = mysql_fetch_array($pageResult);
}
// redirecting if neccessary, only if no error exists
if ($errorExists==false) {
	if (strlen($resArray['altFileName'])>0) {
		$targetUrl = 'http://'.$_SERVER['HTTP_HOST'].'/'.$altPagesBaseDir.$resArray['altFileName'];
		header("Location: $targetUrl");
		exit;
	}
}
// no redirect, put content OR error msg in page.
if ($errorExists==true) {
	$content = $errorMsg;
} else {
	$imgWidth=$resArray['fsWidth'];
	$imgHeight=$resArray['fsHeight'];
	$halfWidth=($imgWidth/2);
	$halfHeight=($imgHeight/2);
	$windowWidth=$imgWidth+44;
	$windowHeight=$imgHeight+60;
	$content="<div style='position:absolute;left:50%;top:50%;margin-left:-".$halfWidth."px;margin-top:-".$halfHeight."px;'><img src='contImages/".$resArray['fsFileName']."' width='".$resArray['fsWidth']."' height='".$resArray['fsHeight']."' class='contentImage'></div>";
}


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>Image: <?=$resArray['name']?></title>
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="Tue, 08 Apr 1997 17:20:00 GMT">
	<link rel='stylesheet' href='source/default.css.php' type='text/css'>
<script language="JavaScript"> 
function onLoad() {
	this.moveTo(40,40);
	myWidth = <?=$windowWidth?>;
	myHeight = <?=$windowHeight?>;
	if (myWidth>(screen.availWidth-80)) myWidth=screen.availWidth-80;
	if (myHeight>(screen.availHeight-80)) myHeight=screen.availHeight-80;
	this.resizeTo(myWidth,myHeight);
	this.focus();
}

function stopError() { return true; }
window.onerror=stopError; 
</script> 
</head>

<body style="overflow:auto;" onload="onLoad();">
<? echo $content; ?>
</body>
</html>
