<?
error_reporting (E_ALL);
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
	$query = "
	SELECT 
		* 
	FROM 
		$tbl_pf_images
	WHERE	
		$tbl_pf_images.pagesId=$reqId 
	ORDER BY
		rank
	;";
	$imgResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
	$nOfImages = mysql_num_rows($imgResult);
}

$clrIndex = $catIndex+1;
if ($clrIndex>5) $clrIndex=5;
$color = ${"clrCat".$clrIndex."_ro"};
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
<body id='imgPageBody' onload="top.rightLoaded();">
<table border="0" cellspacing="0" cellpadding="0">
<?
$i=1;
while ($resImage = mysql_fetch_array($imgResult)) {
	$imgId = $resImage['id'];
	$imgName = $resImage['name'];
	$tnFileName = $resImage['tnFileName'];
	$tnRoFileName = $resImage['tnRoFileName'];
	$tnWidth = $resImage['tnWidth'];
	$tnHeight = $resImage['tnHeight'];
	$actionType = $resImage['actionType'];
	$highLiteText = $resImage['highLiteText'];
	$altFile = $resImage['altFileName'];
?>
	<tr>
		<td width="138" height="1" bgcolor="<?=$clrLines?>"><img src="images/spacer.gif" width="138" height="1" border="0"></td>
	</tr>
	<tr>
		<td><img id="thumbNail<?=$i?>" src="contImages/<?=$tnFileName?>" border="0" width="<?=$tnWidth?>" height="<?=$tnHeight?>" title="<?=$imgName?>"
			onmouseout="top.highlightNone();" onmouseover="top.highlightImage('thumbNail<?=$i?>',<?=$tnWidth?>,<?=$tnHeight?>,'<?=$color?>','<?=$highLiteText?>');" onmousedown="top.launchContent(<?=$imgId?>,'<?=$actionType?>','<?=$altFile?>');"></td>
	</tr>
	<tr>
		<td width="138" height="1" bgcolor="<?=$clrLines?>"><img src="images/spacer.gif" width="138" height="1" border="0"></td>
	</tr>
<?
	if ($i<$nOfImages) {
?>
	<tr>
		<td width="138" height="20"><img src="images/spacer.gif" width="138" height="40" border="0"></td>
	</tr>
<?
	}
	$i++;
}
?>
</table>
</body>
</html>
