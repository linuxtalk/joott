<?php
include("simple_html_dom.php");
define("PRC_WEBSERVICE","http://www.peterborough.ac.uk/WebServices/PRC/service.asmx");


function log_enquiry () {
	$raw_data = $_REQUEST["data"];
	$data = json_decode($raw_data);
	$hostname = $data->hostname;
	$pathname = $data->pathname;
	$reference = rand(1,1000)."-".rand(1,1000)."-".rand(1,1000);
	
	$title = $data->title;
	
	if (isset($data->forward_to_email)) {
		$forward_to_email = $data->forward_to_email;
		$message = print_r($data, true);
		$subject = $title.": Reference ".$reference;
		$headers = "From: Online Enquiry<noreply@" . $hostname . ">\r\n"; 
		mail($forward_to_email, $subject, $message, $headers);
	}
	
	$con = mysql_connect("localhost","joottinf_forms","k4w454ki1");
	mysql_select_db("joottinf_forms", $con);
	$sql = "insert into online_applications
			(data,hostname,pathname,reference)
			values
			('".$raw_data."','".$hostname."','".$pathname."','".$reference."')";
	mysql_query($sql,$con);
	mysql_close($con);				
?>
var response = "<?echo $reference?>";
<?php
}



function gallery_list() {
	$url = "http://".$_REQUEST["url"]."/images/thumb/";
	
	$html = file_get_html($url);
	$a = $html->find('a');
	//echo "/*";
	//echo $url . $html;
	//echo  "*/";
	$count = count($a);
	echo "var result='".$url." ". $count."';";
}

function behaviour_admin_screen () {
	$con = mysql_connect("localhost","joottinf_cips","l34d3r5h1p");
	mysql_select_db("joottinf_cips", $con);
	$domain=$_REQUEST["domain"];
	
	$sql = "select * from level where domain_id = (select id from domain where name='".$domain."') ";
	$result = mysql_query($sql);
	$info;
	
	$info .= "<div class=behaviour_level_menu>";
	while ($row = mysql_fetch_assoc($result)) {
		$info .= "<button code=".$row["code"].">".$row["code"]."<br>".$row["description"]."</button>";
	}
	$info .= "</div>";
	$info .= "<div class=behaviour_edit></div>"
	
?>
var behaviour_admin_screen = "<h2>Personal Qualities and Behaviour Framework</h2>";
behaviour_admin_screen+="<?php echo $info; ?>";
<?php
}

function edit_behaviour_screen() {
    $info;
	$con = mysql_connect("localhost","joottinf_cips","l34d3r5h1p");
	mysql_select_db("joottinf_cips", $con);
	$domain=$_REQUEST["domain"];
	$code=$_REQUEST["code"];
	
	$sql = "select * from behaviour where domain_id = (select id from domain where name='".$domain."') and level_id = (select id from level where code='".$code."')";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$info .= "<div>".$row["text"]."</div>";
	}
	
	
?>
var edit_behaviour_screen = "<?echo $info?>";
<?php	
}


function SubjectAreaList () {
	$webservice = PRC_WEBSERVICE."//SubjectAreaList?StudyYear=2012&Mode=&Category=School Leavers";
?>
 var x=21;
<?php

}




switch($_REQUEST["joott_cmd"]) {
case "edit_behaviour_screen":
	edit_behaviour_screen();
	break;
case "behaviour_admin_screen":
	behaviour_admin_screen();
	break;
case "gallery_list":
	gallery_list();
	break;
case "SubjectAreaList": 
	SubjectAreaList ();
	break;
default:
log_enquiry ();
}
?>