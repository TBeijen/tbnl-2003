# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.26)
# Database: tbnl_2003
# Generation Time: 2016-11-29 12:20:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table pf_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pf_categories`;

CREATE TABLE `pf_categories` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `rank` int(10) unsigned NOT NULL DEFAULT '0',
  `parentId` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(20) NOT NULL DEFAULT '',
  `summaryIntro` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `pf_categories` WRITE;
/*!40000 ALTER TABLE `pf_categories` DISABLE KEYS */;

INSERT INTO `pf_categories` (`id`, `active`, `rank`, `parentId`, `name`, `summaryIntro`)
VALUES
	(1,1,1,0,'About',''),
	(2,1,2,0,'Web & GUI',''),
	(3,1,3,0,'Graphics',''),
	(4,1,4,0,'Fun',''),
	(5,1,5,0,'Tech Corner','');

/*!40000 ALTER TABLE `pf_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pf_changeLog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pf_changeLog`;

CREATE TABLE `pf_changeLog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL DEFAULT '0000-00-00',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `shortDescr` varchar(255) NOT NULL DEFAULT '',
  `longDescr` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table pf_downloads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pf_downloads`;

CREATE TABLE `pf_downloads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pagesId` int(10) unsigned NOT NULL DEFAULT '0',
  `rank` int(10) unsigned NOT NULL DEFAULT '0',
  `fileName` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table pf_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pf_images`;

CREATE TABLE `pf_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pagesId` int(10) unsigned NOT NULL DEFAULT '0',
  `rank` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `highLiteText` varchar(50) NOT NULL DEFAULT '',
  `actionType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `tnFileName` varchar(50) NOT NULL DEFAULT '',
  `tnRoFileName` varchar(50) NOT NULL DEFAULT '',
  `tnWidth` smallint(6) NOT NULL DEFAULT '0',
  `tnHeight` smallint(6) NOT NULL DEFAULT '0',
  `fsFileName` varchar(50) NOT NULL DEFAULT '',
  `fsWidth` smallint(6) NOT NULL DEFAULT '0',
  `fsHeight` smallint(6) NOT NULL DEFAULT '0',
  `altFileName` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `pf_images` WRITE;
/*!40000 ALTER TABLE `pf_images` DISABLE KEYS */;

INSERT INTO `pf_images` (`id`, `pagesId`, `rank`, `name`, `description`, `highLiteText`, `actionType`, `tnFileName`, `tnRoFileName`, `tnWidth`, `tnHeight`, `fsFileName`, `fsWidth`, `fsHeight`, `altFileName`)
VALUES
	(1,4,1,'Logitech advert #1','','',0,'tnLogitech1.jpg','tnLogitech1.jpg',140,105,'fsLogitech1.jpg',800,600,''),
	(2,4,2,'Logitech advert #2','','',0,'tnLogitech2.jpg','tnLogitech2.jpg',140,105,'fsLogitech2.jpg',500,642,''),
	(3,4,3,'Logitech advert #3','','',0,'tnLogitech3.jpg','tnLogitech3.jpg',140,155,'fsLogitech3.jpg',250,672,''),
	(4,11,1,'Water-kettle','','',0,'tnBoiler.jpg','tnBoiler.jpg',140,198,'fsBoiler.jpg',566,800,''),
	(5,9,1,'DCS #1: main screen','','',0,'tnDCS1.gif','tnDCS1.gif',140,135,'fsDCS1.gif',800,770,''),
	(6,9,3,'DCS #2: list of company profiles','','',0,'tnDCS2.gif','tnDCS2.gif',140,123,'fsDCS2.gif',800,700,''),
	(7,9,5,'DCS #3: vacancy description','','',0,'tnDCS3.gif','tnDCS3.gif',140,123,'fsDCS3.gif',800,700,''),
	(8,9,8,'DCS #4: company cms - main screen','','',0,'tnDCS4.gif','tnDCS4.gif',140,143,'fsDCS4.gif',800,815,''),
	(9,9,10,'DCS #5: dcs committee cms - main screen','','',0,'tnDCS5.gif','tnDCS5.gif',140,123,'fsDCS5.gif',800,700,''),
	(10,3,1,'IK #1: search by product name (ABC search)','','',0,'tnInter1.gif','tnInter1.gif',140,105,'fsInter1.gif',800,600,''),
	(11,3,3,'IK #2: Order printed catalogue','','',0,'tnInter2.gif','tnInter2.gif',140,105,'fsInter2.gif',800,600,''),
	(12,3,5,'IK #3: Admin page (under development)','','',0,'tnInter3.gif','tnInter3.gif',140,105,'fsInter3.gif',800,600,''),
	(13,8,1,'High Profile #1: visitors per period','','',0,'tnHighPr1.gif','tnHighPr1.gif',140,77,'fsHighPr1.gif',1000,550,''),
	(14,8,3,'High Profile #2: visitors per category','','',0,'tnHighPr2.gif','tnHighPr2.gif',140,77,'fsHighPr2.gif',1000,550,''),
	(15,8,5,'High Profile #3: visitors per item','','',0,'tnHighPr3.gif','tnHighPr3.gif',140,77,'fsHighPr3.gif',1000,550,''),
	(16,8,8,'High Profile #4: clicked banners','','',0,'tnHighPr4.gif','tnHighPr4.gif',140,77,'fsHighPr4.gif',1000,550,''),
	(17,5,1,'Tank Wars: Download tankwars.zip (184 KB)','Tank Wars: Download tankwars.zip (184 KB)','download - 184KB',1,'tnTankWars.gif','tnTankWars.gif',140,100,'',0,0,'tankwars.zip'),
	(18,13,1,'Interkontakt Catalogue v4.0: front cover','','',0,'tnIkCatCover.jpg','tnIkCatCover.jpg',140,197,'fsIkCatCover.jpg',400,562,''),
	(19,12,1,'LEADS: Slide show (requires Shockwave)','','launch - 795KB',2,'tnLdsPres.gif','tnLdsPres.gif',140,105,'',0,0,'ldsPres.html'),
	(20,12,3,'LEADS: Rolling demo (requires Shockwave)','','launch - 885KB',2,'tnLdsDemo.jpg','tnLdsDemo.jpg',140,105,'',0,0,'ldsDemo.html'),
	(21,12,5,'LEADS: Prototype (requires Shockwave)','','launch - 725KB',2,'tnLdsProto.jpg','tnLdsProto.jpg',140,105,'',0,0,'ldsProto.html'),
	(22,14,1,'Kevers.nl #1: main screen','','',0,'tnKevers1.jpg','tnKevers1.jpg',140,117,'fsKevers1.jpg',780,650,''),
	(23,14,5,'Kevers.nl #2: seat detail page','','',0,'tnKevers2.jpg','tnKevers2.jpg',140,117,'fsKevers2.jpg',780,650,''),
	(24,14,10,'Kevers.nl #3: parts overview','','',0,'tnKevers3.jpg','tnKevers3.jpg',140,117,'fsKevers3.jpg',780,650,''),
	(25,14,10,'Kevers.nl #4: contact & route','','',0,'tnKevers4.jpg','tnKevers4.jpg',140,117,'fsKevers4.jpg',780,650,'');

/*!40000 ALTER TABLE `pf_images` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pf_pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pf_pages`;

CREATE TABLE `pf_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoryId` int(10) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `rank` int(10) unsigned NOT NULL DEFAULT '0',
  `titleShort` varchar(30) NOT NULL DEFAULT '',
  `title` varchar(60) NOT NULL DEFAULT '',
  `summary` text NOT NULL,
  `sumImgFileName` varchar(50) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `altTextFile` varchar(50) NOT NULL DEFAULT '',
  `altImgFile` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `pf_pages` WRITE;
/*!40000 ALTER TABLE `pf_pages` DISABLE KEYS */;

INSERT INTO `pf_pages` (`id`, `categoryId`, `active`, `rank`, `titleShort`, `title`, `summary`, `sumImgFileName`, `content`, `altTextFile`, `altImgFile`)
VALUES
	(1,1,1,1,'Welcome','Welcome','Some basic words of introduction.','','<p>Hi and welcome to my piece of internet. My name is Tibo Beijen. In 2002 I\'ve obtained my masters degree in Industrial Design Engineering. Since then I\'ve been doing various ICT and webdesign projects, freelance and on secondment. Besides being available as a freelance designer I\'m currently looking for a steady job in the new media industry.</p>\r\n\r\n<p>On this site I\'ll show my work and share some of my interests and perhaps even some knowledge. I intend to keep this place as up to date as possible, continually adding new work, scripts, interactive content, etc. At this moment, part of the content is still to be added, mainly in the \'fun\'-section. For more information about me look in <a href=\"#\" onmousedown=\"loadPages(1,0)\">[about/about me]</a>.</p>\r\n<p>Recently I\'ve been working on:</p>\r\n<ul><li><a href=\"#\" onmousedown=\"loadPagesById(14,1)\">Kevers.nl</a> ? Some items still to be added.</li>\r\n<li><a href=\"#\" onmousedown=\"loadPagesById(9,1)\">DelftCareerSite.nl</a> ? this site is online now.</li>\r\n<li><a href=\"#\" onmousedown=\"loadPagesById(3,1)\">Interkontakt.com </a>? updates & improvements, most recently adding a page to order a printed catalogue.</li>\r\n<li><a href=\"#\" onmousedown=\"loadPagesById(10,0)\">Tibobeijen.nl</a> ? testing, improving, testing?</li>\r\n</ul>','',''),
	(2,1,1,2,'About me','About me','Anyone curious about the guy behind this site should go here.','','<p>A little bit about the creator of this site...</p>\r\n<p>My name is Tibo Beijen (hence the url :)) and I live in Delft, the Netherlands. I studied Industrial Design Engineering at the Delft University of Technology. During the last years of my study I found the courses in the field of interface-design getting most of my attention. Doing those courses the process of creating interactive prototypes with various software programs and techniques interested me a lot so the next step was doing an internship at a web design agency (3PO in Rotterdam). I learned a lot there and it gave me a good impression of what working in the webdesign sector is about. In april 2002 I\'ve obtained my masters degree. My graduation project was to design an interface for an \'eco-design\' application: <a href=\"#\" onmousedown=\"loadPagesById(12,1)\">LEADS</a>. Since then I\'ve been doing various projects in the field of ICT and web design.</p>\r\n\r\n<p>Besides work-related interests I of course have other interest although, clich? it might sound, I consider the aforementioned fields of work also a hobby. My main passion is music: I listen to it a lot, I regularly visit concerts and I play guitar. I mostly listen to metal, electronic music and progressive rock. As long as it in some way affects me and doesn\'t pass by unnoticed every genre is allright basically. Artists I listen to a lot lately: Porcupine Tree, Nile, The Gathering, Opeth, Massive Attack, Pink Floyd, Bl&oslash;f. I used to play guitar in a band but lately the guitar-playing is mainly an ?active way of enjoying my favourite cd\'s?. Furthermore I can really enjoy reading a good novel, watching a movie, running some kilometres, playing tennis or just hanging out in a bar with some friends.</p>\r\n','',''),
	(3,2,1,5,'Interkontakt','Interkontakt','The website of Interkontakt BV, a supplier of connectors and connecting products for the electro-technical and electronic industries.','','<p><a href=http://www.interkontakt.com/ target=?_blank?>www.interkontakt.com</a></p>\r\n\r\n<p>Interkontakt BV is a supplier of connectors and connecting products for the electro-technical and electronic industries. For the past year I\'ve been responsible of keeping the company\'s website up to date. Several pages have been added and most of the pages, especially the ones that make use of the database have been rewritten, to make updates possible and to improve consistency throughout the site. In the pipeline is a content management system and a site for visitor statistics.</p>\r\n\r\n<p>The site contains an updated version of the entire printed catalogue in PDF format. Visitors can search for information in three ways: They can browse the catalogue by chapter, search by order code or search by product name.</p>\r\n\r\n<p>Used techniques:</p>\r\n<ul><li>HTML</li>\r\n<li>Javascript</li>\r\n<li>ASP</li></ul>','',''),
	(4,3,1,5,'Logitech mouse','Logitech mouse (3D modelling)','Product presentations of the Logitech Mouseman Cordless, created using 3D modelling software.','','<p>The study programme of the study Industrial Design Engineering includes a number of optional courses, one of which is <a href=http://studiolab.io.tudelft.nl/compvis/ target=?_blank?>Computer Visualisation</a>. In that course students are taught to use high-end 3D modelling software to make presentation renderings. When I followed the course the assignment was to first pick an existing product and create a 3D model of it in Alias|wavefront Maya. The model was then to be used to create different advertisements where the object should have different materials.</p>\r\n\r\n<p>For this assignment I worked together with Arthur van de Goor. Both of us have been involved in all phases of the project and both of us were quite happy getting the maximum possible grade for our work.</p>\r\n\r\n<p>Used software:</p>\r\n\r\n<ul><li>Alias|wavefront Maya</li>\r\n<li>Adobe Photoshop</li>\r\n<li>Adobe Illustrator</li>\r\n','',''),
	(5,4,1,5,'Tank Wars','Tank Wars','Download it now until the flash games arive! Guaranteed to have you waste some time ...','','<p>Pure nostalgia! I can remember playing this game more than ten years ago on a 386 computer. Sometimes the magic is gone when old games are \'rediscovered\' but this one is still highly enjoyable in my opinion. Some people might know the game \'Scorched Earth\' which is a follow-up to this game with more weaponry and options but this is the real thing! Quick and furious battles with nukes taking up as much as a quarter of the game area :). Be sure to check out the configuration utility and the command-line parameters in bomb.doc. Especially the option to set the delay of the interface speed might be useful.</p>\r\n\r\n<p> So? something similar in Flash will most probably appear here. In the meantime enjoy this oldie! (Please note that this game is shareware, albeit very old shareware?)</p>\r\n\r\n','',''),
	(6,5,1,5,'Browser From Hell','Browser From Hell (DHTML library)','Some explanation about the DHTML library I use for this site.','','<p>For this site I started working on a library of javascript functions called \'Browser From Hell\'. The \'Hell\' part originates from the start of the project when I hadn\'t yet abandoned the idea of supporting Netscape 4?  ;). The library is developed to work in any DOM-compliant browser. Although initially developed for this site, the library can easily be used for other sites. Object-oriented programming is used wherever possible to keep matters manageable and extensible.</p>\r\n\r\n<p>The library consists of three main modules:</p>\r\n\r\n<h2>1) Pulldown menu</h2>\r\n\r\n<p>After setting all the necessary parameters, the menu\'s are created by calling the bfh_buildAllMenus(\'targetDiv\') function. This function creates all the menu-layers and attaches all the event-handlers needed. On this site the parameters are retrieved from a database.</p>\r\n\r\n<h2>2) Scrollbars</h2>\r\n\r\n<p>The developer needs to specify what layers are involved, like the layer with content, the layer with all the scrollbar elements, etc. After that a function can be executed that attaches all the necessary event-handlers to the scrollbar controls. A set of methods is available to have the scrollbar perform specific tasks when new content is loaded or the window is resized.</p>\r\n\r\n<h2>3) Content-loaders</h2>\r\n\r\n<p>The text on the left and images in the right column are first loaded into a hidden iframe. Once loaded the content of that iframe is transferred to a set of layers and becomes visible. For this to work an object is created that provides two methods: loadContent() and transferContent().</p>\r\n\r\n<p>There are still quite some improvements on the to-do list:</p>\r\n<ul><li>Adding scrollwheel support.</li>\r\n<li>Adding the possibility to scroll by clicking above or below the slider.</li>\r\n<li>Restructuring some of the code and parameters to make the library better organized.</li>\r\n<li>Rewriting part of the code that handles different css box-model in IE and Mozilla.</li>\r\n<li>Putting it all together and make it available for download.</li></ul>\r\n','',''),
	(7,1,1,5,'Contact','Contact','Information needed to get in touch with me.','','<p>Anyone needing more detailed information can of course send me an email.</p>\r\n\r\n<p>Email: <a href=\"mailto:info@tibobeijen.nl\">info@tibobeijen.nl</a>\r\n<br>MSN: tebeijen@hotmail.com (don\'t use this address to email me)</p>\r\n','',''),
	(8,2,1,7,'High Profile stat','High Profile visitor statistics','A site for monitoring visitor statistics of the High Profile website.','','<p>High Profile is a publishing house providing the events sector with information. The website <a href=?http://www.highprofile.nl? target=?_blank?>www.highprofile.nl</a>, developed by 3PO, had to be equipped with a site that provides the webmasters information about visitor statistics. During my internship at 3PO I designed the statistics-site and did most of the development.</p>\r\n\r\n<p>The site provides totals for: Visitors per period, visitors per event category and visitors per specific company. The number of banner-clicks is also tracked.</p>\r\n\r\n<p>Used techniques:</p>\r\n<ul><li>HTML</li>\r\n<li>Javascript</li>\r\n<li>ASP</li></ul>\r\n','',''),
	(9,2,1,1,'DelftCareerSite','DelftCareerSite','A new site bringing together students from Delft and future employers.','','<p><a href=http://www.delftcareersite.nl target=?_blank?> www.delftcareersite.nl</a></p>\r\n\r\n<p>DelftCareerSite is started by the \'StudieVerenigingenRaad Delft\' (SVR), a student union that links together the student unions of the different faculties of the Delft University of Technology.</p>\r\n\r\n<p>The goal of DelftCareerSite is to provide an easy accessible medium where students can find information about career-opportunities. Companies, multi-nationals as well as small-scale industry, can easily participate by publishing company profiles, internships, graduation projects, vacancies and events.</p>\r\n\r\n<p>For companies there is a content-management site that enables them to edit the company profile and add or remove various items. The committee in charge of DelftCareerSite has it\'s own content-management site that makes it possible to add events, edit the introduction text or \'activate\' companies that have signed in.</p>\r\n<p>Used techniques:</p>\r\n<ul><li>HTML</li>\r\n<li>Javascript</li>\r\n<li>ASP</li>','',''),
	(10,1,1,4,'About this site','About this site','The page were updates and to-do items are listed and where I try to justify the abuse of javascript on this site.','','<p>When designing this site I was challenged by the idea of using javascript/DHTML to make a site that looks and behaves exactly as intended without making compromises to browser (in)capabilities. Going down that road there\'s of course the pitfall of making a site that\'s no more than a display of DHTML for DHTML\'s sake. I can\'t deny there\'s a certain amount of \'technology-push\' involved here but I hope to have used those techniques in such a way that it might stay unnoticed for the \'regular\' visitor (meaning: no web developer).</p>\r\n<p>This site should work with Internet Explorer 5.5 or newer or a recent version of Mozilla/Netscape. As the DOM-support of Opera 6 is pretty much non-existent I neglected Opera but to my pleasant surprise the site seems to run in Opera 7. There are still quite some graphical glitches in Opera 7 but for now I blame that to improper CSS-support of Opera ;).</p>\r\n<p>To-do:</p>\r\n<ul><li>Add content (this will stay on top for a while...)</li>\r\n<li>Add scrollwheel support for the scrolling layers.</li>\r\n<li>Make it possible to scroll by clicking above or below the sliders.</li>\r\n<li>Fix a javascript error that occurs now and then. (line 146, node not defined)</li>\r\n<li>Create an animated page build-up sequence.</li>\r\n<li>Build a new site ...</li></ul>\r\n</p>\r\n<p>Recent updates:</p>\r\n<ul><li>13 march 2003 ? site online.</li></ul>\r\n','',''),
	(11,3,1,10,'Water-kettle','Water-kettle','A design of a water-kettle, making use of non-standard components.','','<p>For one of the assignments of the course \'Vormstudie 2\' (best translated as \'study of composition\' or \'design\' in general) students have to design a product making use of \'scrap\' material or existing components not usually found in such products. For me the assignment was to design a water-kettle.</p>\r\n\r\n<p>Being in a \'brushed metal is great\' state of mind (which isn\'t quite gone yet ;)) my design is basically a metallic kettle with a hammer attached to it. The metallic finish, the solid shape, the hammer and the circular dents around the kettle all add to a high-tech, robust appearance.</p>\r\n\r\n<p>As creating a model made of real metal didn\'t fit within the scope of the given course I created a product model in 3D Studio Max to create a presentation poster.</p>\r\n\r\n<p>Used software & stimulants</p>\r\n<ul><li>3D Studio MAX</li>\r\n<li>Adobe Photoshop</li>\r\n<li>Adobe Illustrator</li>\r\n<li>Coffee</li>\r\n','',''),
	(12,2,1,10,'LEADS (graduation)','LEADS (graduation project)','My graduation project for the study Industrial Design Engineering: an user-interface for eco-design software.','','<p>The study Industrial Design Engineering ends with an individual graduation project after which students receive their masters degree. My graduation project was to design a user-interface for the LEADS eco-design system.</p>\r\n\r\n<p>The Design For Sustainability group, part of the Industrial Design Engineering faculty, comprises various research projects, one of which is LEADS (which stands for ?Lifecycle Expert Analysis of Design Strategies?). Subject of the LEADS research project is the development of a knowledge-base that uses \'case based reasoning\' to predict environmental aspects of new designs, based on information retrieved from existing products in the \'case base\'.</p>\r\n\r\n<p>The system is aimed at designers who want to design products that have low environmental impact, but don\'t have the time, the information or the extensive knowledge to do so. The system let\'s the designer input basic parameters of his concept and then calculates the environmental impact based on products in a database. As the design process continues, the designer can enter more specific data. With that data the process of finding a comparable product in the database becomes more reliable which results in a more accurate calculated impact.</p>\r\n\r\n<p>The slide show and rolling demo I used at the final presentation are available on the right. Also included is an interactive prototype I used during the project to get feedback from users. Please note that not all buttons and functions work in the prototype and that specific details have been improved since.</p>\r\n\r\n<p>The slide show, demo and the prototype require the Macromedia Shockwave plug-in.</p>','',''),
	(13,3,1,13,'Interkontakt (DTP)','Interkontakt product catalogue','DTP work for Interkontakt\'s printed product catalogue.','','<p>Back in 1993, Interkontakt decided to abandon the drawing table and to switch to desktop publishing. That involved digitally recreating all of the technical drawings (which proved to be a very effective way to master cloning, duplicating, mirroring and rotating skills in Freehand ;)). All of the catalogue design was done in-house and the result was version 3 of the product catalogue, published in 1995. </p>\r\n\r\n<p>In 2001 version 4 has been released, of which the cover is displayed to the right. Since then I regularly add and edit pages as new products are being introduced or disappear.</p>\r\n\r\n<p>The product catalogue can be viewed in PDF-format at <a href=\"http://www.interkontakt.com/\" target=\"_blank\"> www.interkontakt.com</a>.</p>\r\n\r\n<p>Used software:</p>\r\n<ul><li>Adobe Pagemaker</li>\r\n<li>Macromedia Freehand</li>\r\n<li>Adobe Photoshop</li></ul>','',''),
	(14,2,1,3,'Kevers.nl','Kevers.nl','A site for a shop that sells parts for the volkswagen beetle.','','<p><a href=http://www.kevers.nl/ target=\"_blank\">www.kevers.nl</a></p>\r\n\r\n<p>Andre van Wijlen sells various parts for the Volkswagen Beetle and also offers repair services. Not being present on the internet yet a site was needed that gives visitors a good impression of the services he offers as well as the neccessary contact information.</p>\r\n\r\n<p>His shop \"the Wolfsburcht\"  specializes in seats and gearboxes so emphasis has been put on those areas. As there is no plan yet of putting online an extensive list of available products the site has been made quite picture-intensive. The images should give visitors an indication of the wide variety of available products.</p>\r\n\r\n<p>For the seats overview page and the pages that contain detailed information per seat, one XML document is used to store the data. This makes the (occasional) updates easily managable and also offers the possibility to add a content management system when (and if) there\'s a need for it.</p>\r\n\r\n<p>Used techniques:</p>\r\n<ul><li>HTML</li>\r\n<li>Javascript</li>\r\n<li>ASP</li>\r\n<li>XML</li></ul>','','');

/*!40000 ALTER TABLE `pf_pages` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
