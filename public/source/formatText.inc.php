<?php
function fMainText($myText,$accentColor,$defColor) {
	global $parseSmilies;
	// make sure html tags are in lowercase
	$from = array("<li>","</li>");
	$to = array("<li style='color:".$accentColor.";'><div style='color:".$defColor.";'>","</div></li>");
	$myText=str_replace($from,$to,$myText);
	// replacing :) and ;) with smilies!
	if ($parseSmilies==1) {
		$from = array(":)",";)");
		$to = array("<img src=\"images/sml_smile.gif\" width=\"12\" height=\"12\" border=\"0\">","<img src=\"images/sml_wink.gif\" width=\"12\" height=\"12\" border=\"0\">");
		$myText=str_replace($from,$to,$myText);
	}
	return $myText;
}
function addSmilies($myText) {
	global $parseSmilies;
	if ($parseSmilies==1) {
		$from = array(":)",";)");
		$to = array("<img src=\"images/sml_smile.gif\" width=\"12\" height=\"12\" border=\"0\">","<img src=\"images/sml_wink.gif\" width=\"12\" height=\"12\" border=\"0\">");
		$myText=str_replace($from,$to,$myText);
	}
	return $myText;
}
