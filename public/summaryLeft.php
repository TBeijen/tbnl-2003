<?php
error_reporting (E_ALL);
include "source/db.php";
include "source/colors.php";
include "source/formatText.inc.php";

$errorMsg="";
$errorExists=false;

$catIndex=@$_GET['cat'];
if (!is_numeric($catIndex)) {
	$errorExists=true;
	$errorMsg="The requested page id is invalid.";
}
// first getting the categories and determining the real id of the requested category
if ($errorExists==false) {
	$dbLink = mysql_connect($dbHost,$dbUser,$dbPass) or die ("error in mysql_connect: ".mysql_error());
	mysql_select_db($dbDb,$dbLink) or die ("error in mysql_select_db: ".mysql_error());
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
	$pageResult = mysql_query($query,$dbLink) or die ("error in mysql_query: ".mysql_error());
	$i=1;
	while ($resArray = mysql_fetch_array($pageResult)) {
		if ($i==$catIndex) {
			$realId=$resArray['id'];
			$category = $resArray['name'];
			$pageTitle = "/".strtolower($category)."/overview";
		}
		$i++;
	}
	$corCatIndex=$catIndex-1;
	// getting all the pages in the requested category

	$query2 = "
		SELECT
			*
		FROM
			$tbl_pf_pages
		WHERE
			categoryId=$realId
		AND
			active=1
		ORDER BY
			rank
		;";
	$summaryItems = mysql_query($query2,$dbLink) or die ("error in mysql_query: ".mysql_error());
	$nOfItems = mysql_num_rows($summaryItems);

	$color = ${"clrCat".$catIndex."_ro"};
	$printTitle = $category." - overview";
	$printTitlePrint = "<div style='height:50px;'><H1 style='border-bottom-color:$color'>$printTitle</H1></div>";
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
<body id='textPageBody' onload="top.leftLoaded('<?=$pageTitle?>',<?=$corCatIndex?>);">
<?php
echo $printTitlePrint;

$i=1;
if ($errorExists==false) {

	echo "<hr class='summary' style='color:".$color.";'>";

	while ($sumArray = mysql_fetch_array($summaryItems)) {
		$title = $sumArray['title'];
		$pageId = $sumArray['id'];
		$summary = $sumArray['summary'];
		$sumImgFileName = $sumArray['sumImgFileName'];
		$sumImgTag = "";
		if (strlen($sumImgFileName)>0) {
			$sumImgTag = "<a href='#' onmousedown='top.loadContentById(".$pageId.",".$corCatIndex.");'><img src='contImages/".$sumImgFileName."' class='contentImage';></a>";
		}
		
		echo "<table cellspacing='0' cellpadding='0' border='0' width='100%'><tr>";
		echo "<td align='left' valign='top'>";
		echo "<h3><a href='#' onmousedown='top.loadContentById(".$pageId.",".$corCatIndex.");'>".$title."</a></h3>";
		echo "<span class='basicText'>".addSmilies($summary)."</span>";
		echo "</td>";
		echo "<td align='right' valign='top' widht='1'>".$sumImgTag."</td>";
//		echo $sumImgTag;
		echo "</tr></table>";
//		if ($i<$nOfItems) {
		echo "<hr class='summary' style='color:".$color.";'>";
//		}
		$i++;
	}
}
?>
<br>
<br>
</body>
</html>
