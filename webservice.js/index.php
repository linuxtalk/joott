<?php
//ini_set('display_errors', 1);
//error_reporting(E_ALL);
include("simple_html_dom.php");
define("PRC_WEBSERVICE","http://www.peterborough.ac.uk/WebServices/PRC/service.asmx");
$a = session_id();
if(empty($a)) session_start();

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
	$sql = "insert into online_applications ".
			"(data,hostname,pathname,reference)".
			" values ".
			"('".$raw_data."','".$hostname."','".$pathname."','".$reference."')";
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

function course_screen () {
	$domain=$_REQUEST["domain"];
	$code=$_REQUEST["code"];
	$info;
	$sql = "select * from course_list where id='".$code."'";
	connect_to_db();
	$result = mysql_query($sql);
	
	$id="New";
	$title;
	$requirements;
	$content;
	$assessment;
	$essential_resources;
	$desired_resources;
	
	$level = 0;
	$examining_board = 0;
	$department = 0;
	

	$progression;
	
	while ($row = mysql_fetch_assoc($result)) {
		$id=$row["id"];
		#title
		$title=$row["title"];
		#requirements 	
		$requirements = 
			str_replace("\\n","",mysql_real_escape_string($row["requirements"]));
		#content 	
		$content=
			str_replace("\\n","",mysql_real_escape_string($row["content"]));
		#assessment 	
		$assessment=
			str_replace("\\n","",mysql_real_escape_string($row["assessment"]));
		#essential_resources 	
		$essential_resources=
		   str_replace("\\n","",mysql_real_escape_string($row["essential_resources"]));
		#desired_resources 	
		$desired_resources=
			str_replace("\\n","",mysql_real_escape_string($row["desired_resources"]));
		#progression
		$progression=
			str_replace("\\n","",mysql_real_escape_string($row["progression"]));
		
		$level=$row["level"];
		$examining_board = $row["examining_board"];
		$department = $row["department"];
	}

	$level_sql = "select * from level order by id";
	$level_result = mysql_query($level_sql);
	$cbo_level = "<select test=".$level.">";
	while ($level_row = mysql_fetch_assoc($level_result)) {
		if ($level_row["name"]==$level) $selected = " selected ";
		else $selected = "";
		$cbo_level .= 
			"<option value='".$level_row["id"]."' ".$selected.">".$level_row["name"];
	}
	$cbo_level .= "</select>";
	
	$examining_board_sql = "select * from examining_board order by id";
	$examining_board_result = mysql_query($examining_board_sql);
	$cbo_examining_board = "<select>";
	while ($examining_board_row = mysql_fetch_assoc($examining_board_result)) {
		if ($examining_board_row["name"]==$examining_board) $selected = " selected ";
		else $selected = "";
		$cbo_examining_board .= 
			"<option value='"
				.$examining_board_row["id"]."' ".$selected.">"
					.$examining_board_row["name"];
	}
	$cbo_examining_board .= "</select>";
	
	$department_sql = "select * from department order by id";
	$department_result = mysql_query($department_sql);
	$cbo_department = "<select>";
	while ($department_row = mysql_fetch_assoc($department_result)) {
		if ($department_row["name"]==$department) $selected = " selected ";
		else $selected = "";
		$cbo_department .= 
			"<option value='".$department_row["id"]."' ".$selected.">"
				.$department_row["name"];
	}
	$cbo_department .= "</select>";
	
	
	$info= 
		"<fieldset class=id><legend>Course ID</legend><div>".$id."</div></fieldset>";
	#title
	$info.= 
		"<fieldset class=title><legend>Course Title</legend><input value='".$title."'></fieldset>";
	#department
	$info.= 
		"<fieldset class=department><legend>Course Department</legend>".$cbo_department."</fieldset>";
	#level
	$info.= 
		"<fieldset class=level><legend>Course Level</legend>".$cbo_level."</fieldset>";
	#examining_board
	$info.= "<fieldset class=examining_board><legend>Course Examining Board</legend>".$cbo_examining_board."</fieldset>";
	#requirements 
	$info.= 
		"<fieldset class=requirements><legend>Course Requirements</legend><div contenteditable=true>".$requirements."</div></fieldset>";
	#content 	
	$info.= 
		"<fieldset class=content><legend>Course Content</legend><div contenteditable=true>".$content."</div></fieldset>";
	#assessment 	
	$info.= 
		"<fieldset class=assessment><legend>Course Assessment</legend><div contenteditable=true>".$assessment."</div></fieldset>";
	#essential_resources 	
	$info.= 
		"<fieldset class=essential_resources><legend>Course Essential Resources</legend><div contenteditable=true>".$essential_resources."</div></fieldset>";
	#desired_resources 
	$info.= 
		"<fieldset class=desired_resources><legend>Course Desired Resources</legend><div contenteditable=true>".$desired_resources."</div></fieldset>";
	#progression
	$info.= 
		"<fieldset class=progression><legend>Course Progression</legend><div contenteditable=true>".$progression."</div></fieldset>";
	$info.= "<div class=save><button>Save</button></div>";
	$info.="<div class=rich_text></div>";

	echo "var course_details_screen=\"".addslashes($info)."\";";
}

function course_admin_screen () {
	$domain=$_REQUEST["domain"];
	$college=$_REQUEST["college"];
	$info="";
	$sql = "select * from course_list where college='".$college."' order by title, level";
	connect_to_db();
	$result = mysql_query($sql);

	$info.= "<div class=course_admin_area>";
	while ($row = mysql_fetch_assoc($result)) {
		$info .= "<button code=".$row["id"].">".$row["level"]." ".$row["title"]."</button>";
	}
	$info.="</div><button code=0>New Course</button>";
	$info.="<div class=course_details></div>";
	echo "var course_admin_screen=\"".$info."\";\n";
}


function handle_text ($input) {
	$result = mysql_real_escape_string(json_decode(str_replace("_amp_","&",$input)));
	return $result;
}

function update_course() {
	$domain=$_REQUEST["domain"];
	//$data = json_decode($_REQUEST["data"]);
	
	@$id = $_REQUEST["id"];
	connect_to_db();
	
	$raw_data = mysql_real_escape_string(print_r($_REQUEST,true));
	$sql = "insert into raw_data (request) values ('".$raw_data."')";
	mysql_query($sql);
	
	@$title = $_REQUEST["title"];
	@$requirements = handle_text($_REQUEST["requirements"]);
	@$content = handle_text($_REQUEST["content"]);
	@$assessment = handle_text($_REQUEST["assessment"]);
	@$essential_resources = handle_text($_REQUEST["essential_resources"]);
	@$desired_resources = handle_text($_REQUEST["desired_resources"]);
	@$progression = handle_text($_REQUEST["progression"]);
	
	@$department = $_REQUEST["department"];
	@$examining_board = $_REQUEST["examining_board"];
	@$level = $_REQUEST["level"];
	
	if ($id=="New") {
		#insert
		$sql = "insert into course 
				(title,requirements,content,assessment,essential_resources,desired_resources,progression,
				department_id, examining_board_id, level_id)
				values
				('".$title."',".
				"'".$requirements."',".
				"'".$content."',".
				"'".$assessment."','".$essential_resources."','".$desired_resources."',".
				"'".$progression."',".
				"'".$department."',".
				"'".$examining_board."',".
				"'".$level."'".
				")";
	} else {
		#update
		$sql = "update course 
				set title='".$title."',
				requirements='".$requirements."',
				content='".$content."',
				assessment='".$assessment."',
				essential_resources='".$essential_resources."',
				desired_resources='".$desired_resources."',
				progression='".$progression."',
				department_id='".$department."', 
				examining_board_id='".$examining_board."', 
				level_id='".$level."'
				where id=".$id;
	}
	
	mysql_query($sql);

	echo "var records_updated=\"". mysql_affected_rows()."\"\n";
	
	$result="";
	if ($id=="New") $result = mysql_insert_id();
	else $result=$id;
	
	echo "var course_update_id=".$result;
	echo "\n/*";
	echo "\n".$sql."\n";
	
	print_r($_REQUEST);

	
	
	echo "\n*/";
}

function behaviour_admin_screen () {

	$domain=$_REQUEST["domain"];
	
	$sql = "select * from level where domain_id = (select id from domain where name='".$domain."') ";
	connect_to_db();
	$result = mysql_query($sql);
	$info;
	
	$info .= "<div class=behaviour_level_menu>";
	while ($row = mysql_fetch_assoc($result)) {
		$info .= "<button code=".$row["code"].">".$row["description"]."</button>";
	}
	
	$info .= "<button migrate=1_7>Migrate Behaviours<br>(1 to 7)</button>";
	$info .= "</div>";
	$info .= "<div class=behaviour_edit></div>"
	
	
?>
var behaviour_admin_screen = "<h2>Personal Qualities and Behaviour Framework</h2>";
behaviour_admin_screen+="<?php echo $info; ?>";
<?php
}

function connect_to_db () {

	$domain=$_REQUEST["domain"];
	
	switch($domain) {
		case "cips":
			$con = mysql_connect("localhost","joottinf_cips","l34d3r5h1p");
			mysql_select_db("joottinf_cips", $con);
			break;
		case "course":
			$con = mysql_connect("localhost","joottinf_courses","3duc4t3");
			mysql_select_db("joottinf_courses", $con);
			break;
		case "cms" :
			$con = mysql_connect("localhost","joottinf_users","!4cc355db~");
			mysql_select_db("joottinf_users", $con);
			break;
	}
}

function behaviour_list() {
	$info = "<div class=behaviour_list>";
	connect_to_db ();
	$domain=$_REQUEST["domain"];
	$code=$_REQUEST["code"];
	
	$sql = "select * from behaviour where domain_id = (select id from domain where name='".$domain."') and level_id = (select id from level where code='".$code."') order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		if ($code!="CC") {
			if ($row["behaviour_id"]==1) $info.="<h3>Personal and Professional Excellence</h3>";
			if ($row["behaviour_id"]==8) $info.="<h3>Builds and Develops Shared Vision</h3>";
			if ($row["behaviour_id"]==12) $info.="<h3>Analysis and Decision Making</h3>";
			if ($row["behaviour_id"]==19) $info.="<h3>Champions Business Inprovement</h3>";
			if ($row["behaviour_id"]==25) $info.="<h3>Delivers Results</h3>";
			if ($row["behaviour_id"]==30) $info.="<h3>Builds Powerful Relationships</h3>";
			if ($row["behaviour_id"]==36) $info.="<h3>Challenges Constructively</h3>";
			// case 2: $between = " and behaviour_id between 8 and 11"; 	$html.="<h2>Builds and Develops Shared Vision</h2>"; break;
			//case 3: $between = " and behaviour_id between 12 and 18"; 	$html.="<h2>Analysis and Decision Making</h2>"; break;
			//case 4: $between = " and behaviour_id between 19 and 24"; 	$html.="<h2>Champions Business Inprovement</h2>"; break;
			//case 5: $between = " and behaviour_id between 25 and 29"; 	$html.="<h2>Delivers Results</h2>"; break;
			//case 6: $between = " and behaviour_id between 30 and 35"; 	$html.="<h2>Builds Powerful Relationships</h2>"; break;
			//case 7: $between = " and behaviour_id between 36 and 39"; 	$html.="<h2>Challenges Constructively</h2>"; break; */
		} else {
			if ($row["behaviour_id"]==1) $info.="<h3>Maintains Personal Excellence</h3>";
			if ($row["behaviour_id"]==6) $info.="<h3>Customer First</h3>";
			if ($row["behaviour_id"]==9) $info.="<h3>Being One CIPS</h3>";
			if ($row["behaviour_id"]==14) $info.="<h3>Clear Thinking</h3>";
			if ($row["behaviour_id"]==18) $info.="<h3>Delivers CIPS Excellence</h3>";
		}
	
		if ($row["disabled"]==0) $checked = " checked ";
		else $checked = "";
	
		if ($checked!==""){
		$info .= "<div class=behaviour_row><input behaviour_id='".$row["id"]."' type=checkbox ".$checked."><div><span class=behaviour_id>".$row["behaviour_id"]."</span><span class=behaviour_text>".$row["text"]."</span></div></div>";
		}
	}
	$info .= "</div>";
	return $info;
}

function edit_behaviour_screen() {
	$code=$_REQUEST["code"];
    $info =  behaviour_list();
	$info .= "<div style=clear:both><span class=behaviour_id><input></span><span class=behaviour_text><input></span><button code=".$code.">+</button> Show disabled behaviours<input type=checkbox id=show_all></div>";
?>
var edit_behaviour_screen = "<?echo $info?>";
<?php	
}

function save_behaviour() {
	connect_to_db ();
	$domain=$_REQUEST["domain"];
	$code=$_REQUEST["code"];
	$text = $_REQUEST["text"];
	$behaviour_id = $_REQUEST["id"];
	
	$sql = "delete from behaviour where behaviour_id='".$behaviour_id."' and domain_id = (select id from domain where name='".$domain."') and level_id = (select id from level where code='".$code."')";
	mysql_query($sql);
	
	$sql = "insert into behaviour (behaviour_id, domain_id, level_id, text) values ".
			"(".$behaviour_id.",(select id from domain where name='".$domain."'),(select id from level where code='".$code."'),'".$text."')";
	mysql_query($sql);
	echo "var behaviour_list=\"".behaviour_list()."\"";
}

function job_list () {
	$domain=$_REQUEST["domain"];
	
	$list;
	$list .= "<div class=job_list style='height:100px;border:1px solid black;overflow-y:auto;'>";
	connect_to_db ();
	$sql = "select * from job where domain_id = (select id from domain where name='".$domain."') order by title";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$list .= "<div style='cursor:pointer' job_id='".$row["id"]."'>".$row["title"]."</div>";
	}
	$list .= "</div>";
	return $list;
}

function load_job_matrix () {
	$form;
	$form .= "<div class=job_matrix>";
	$form .= job_list();
	$form .= "</div>";
	$form .= "<div><input><button class=btn_add_job>+</button></div>";
	$form .= "<div class=job_title></div>";
	$form .= "<div class=matrix_body>";
	$form .= "</div>";
	echo "var job_matrix=\"".$form."\";";
}

function save_job () {
	$domain=$_REQUEST["domain"];
	$job=$_REQUEST["job_title"];
	connect_to_db ();
	$sql = "insert into job (title, domain_id) values ('".$job."',(select id from domain where name='".$domain."'))";
	mysql_query($sql);
	$details;
	$details .= job_list();
	echo "var job_details=\"".$details."\";";
}

function get_job_matrix () {
	$details;
	$domain=$_REQUEST["domain"];
	$job=$_REQUEST["job_title"];
	$job_id=$_REQUEST["job_id"];
	connect_to_db ();
	$sql = "select * from behaviour_matrix where name='".$domain."' order by field(code,'CL','PF','BL','SL'),behaviour_id";
	$result = mysql_query($sql);
	$code="";
	while ($row = mysql_fetch_assoc($result)) {
		if($code !== $row["description"]) {
			$code = $row["description"];
			$details.="<h2>".$code."</h2>";
		}
		$details.="<div class=behaviour_row>";
		//$details.="<span class=code>".$row["code"]."</span>";
		//$details.="<span class=description>".$row["description"]."</span>";
		$details.="<span class=behaviour_id>".$row["behaviour_id"]."</span>";
		$details.="<span class=text>".$row["text"]."</span>";
		$check = "";
		
		$check_sql = "select * from job2behaviour where job_id=".$job_id." and behaviour_id=".$row["behaviour_ref"];
		$check_result =  mysql_query($check_sql);
		
		$check = (mysql_num_rows($check_result)==0)?"":" checked=checked ";
		$details.="<span class=recorded_behaviour_id><input type=checkbox ".$check." job_id='".$job_id."' behaviour_id='".$row["behaviour_ref"]."'  code='".$row["code"]."'     ></span>";
		$details.="</div>";
	} 
	
	echo "var job_behaviour_matrix=\"".$details."\";";

}

function save_job_matrix () {
	$details;
	
	$domain=$_REQUEST["domain"];
	$checked =$_REQUEST["checked"];
	$job_id =$_REQUEST["job_id"];
	$code =$_REQUEST["code"];
	$behaviour_id =$_REQUEST["behaviour_id"];
	
	if ($checked==="true") $sql="insert into job2behaviour (job_id, behaviour_id) values (".$job_id.",".$behaviour_id.")";
	else $sql="delete from job2behaviour where job_id=".$job_id." and behaviour_id=".$behaviour_id;
	connect_to_db ();
	mysql_query($sql);
}

function get_behaviour_list() {
	$details;
	$domain=$_REQUEST["domain"];
	$level=$_REQUEST["level"];

	$sql = "select behaviour_id from behaviour where domain_id = (select id from domain where name='".$domain."') and level_id=".$level." order by behaviour_id";
    connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
	
			$details.="<div level=\"".$level."\">".$row["behaviour_id"]."</div>";
	}
	
	echo "var behaviour_id_list='".$details."';";
}

function get_behaviour_text() {
	$details;
	
	$domain=$_REQUEST["domain"];
	$level=$_REQUEST["level"];
	$behaviour=$_REQUEST["behaviour"];
	
	$sql = "select text from behaviour where domain_id = (select id from domain where name='".$domain."') and level_id=".$level." and behaviour_id=".$behaviour;
    connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
	
			$details.="<div>".$row["text"]."</div>";
	}

	echo "var behaviour_text_result='".$details."';";
}


function do_login () {

	$domain=$_REQUEST["domain"];
	$password=$_REQUEST["password"];
	$username=$_REQUEST["username"];
	
	$sql = "select * from users where username='".$username."' and password='".$password."'";
	connect_to_db ();
	$result = mysql_query($sql);
	

	if (mysql_num_rows($result)>0){
		//$_SESSION["is_logged_on"] = true;
		echo "sessionStorage.setItem(\"joott_is_logged_on\",true);";
		echo "sessionStorage.setItem(\"joott_user\",\"".$username."\");";
		echo "var login_result='OK';";
		echo "window.location.reload();";
	} else {
		echo "var login_result='NOK';\n";
		echo "/*\n";
		echo $sql;
		echo "*/\n";
		
		
	}
}

function is_logged_on (){
 echo "var is_logged_on_result=".$_SESSION["is_logged_on"];
}

function logged_on () {
	$_SESSION["is_logged_on"] = $_REQUEST["user"];
}

function SubjectAreaList () {
	$webservice = PRC_WEBSERVICE."//SubjectAreaList?StudyYear=2012&Mode=&Category=School Leavers";
?>
 var x=21;
<?php
}

function pqbf_job_list() {
	//$details;
	$details = "<select><option value=0>Please choose job grade...</selct>";
	$domain=$_REQUEST["domain"];

	$sql = "select * from job where domain_id = (select id from domain where name='".$domain."') order by title";
	connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		//$details.="<span job_id='".$row["id"]."'>".$row["title"]."</span>";
		$details .= "<option value='".$row["id"]."'>".$row["title"]."</option>";
	}
	$details .= "</select>";
	
	echo "var pqbf_job_list_result=\"".$details."\";";
}

function pqbf_b_list () {
	$details;
	$domain=$_REQUEST["domain"];
	$job_id=$_REQUEST["job_id"];
	
	$sql = "select distinct * from job_matrix where job_id=".$job_id." and disabled = 0 order by code,behaviour_id";
	
	echo "var sql =\"".$sql."\"\n";
	connect_to_db ();
	$result = mysql_query($sql);
	
	//$count = mysql_num_rows($result);
	//echo "var sql_count =\"".$count."\"\n";
	
	while ($row = mysql_fetch_assoc($result)) {
		//$info[$row["code"]][$row["behaviour_id"]] .= "<div class='num behaviour'>".$row["behaviour_id"]."</div>";
		
		$info[$row["code"]][$row["behaviour_id"]] .= "<div class='".$row["code"]." behaviour'>".$row["text"]."</div>";
	}

	//Professional and Professional Excellence
	echo "var pape_data=\"\";\n";
	echo "var badsv_data=\"\";\n";
	echo "var aadm_data=\"\";\n";
	echo "var cbi_data=\"\";\n";
	echo "var dr_data=\"\";\n";
	echo "var bpr_data=\"\";\n";
	echo "var cc_data=\"\";\n";
	
	//echo "/*";
	//print_r ($info);
	//echo "*/\n/*";
	
	for ($i=1;$i<=7;$i++)   behaviour_holder($info, $i, "pape_data");
	for ($i=8;$i<=11;$i++)  behaviour_holder($info, $i, "badsv_data");
	for ($i=12;$i<=18;$i++) behaviour_holder($info, $i, "aadm_data");
	for ($i=19;$i<=24;$i++) behaviour_holder($info, $i, "cbi_data");
	for ($i=25;$i<=29;$i++) behaviour_holder($info, $i, "dr_data");
	for ($i=30;$i<=35;$i++) behaviour_holder($info, $i, "bpr_data");
	for ($i=36;$i<=39;$i++) behaviour_holder($info, $i, "cc_data");
	
	get_core ();
}

function behaviour_holder ($info, $i, $j_variable) {
	//echo "/*".$i."*/\n";
	if(!isset($info["CL"][$i]) and !isset($info["PF"][$i]) and !isset($info["BL"][$i]) and !isset($info["SL"][$i])) return false;
	
	
	
	echo $j_variable."+=\"<div class='behaviour_holder {$c}'>\";\n";
		
	echo $j_variable."+=\"<div class='num behaviour'>".$i."</div>\";\n";
	
	if(isset($info["CL"][$i])) echo $j_variable."+=\"".$info["CL"][$i]."\";\n";
	else echo $j_variable."+=\"<div class='behaviour CL_blank'></div>\";\n";
		
	if(isset($info["PF"][$i])) echo $j_variable."+=\"".$info["PF"][$i]."\";\n";
	else echo $j_variable."+=\"<div class='behaviour PF_blank'></div>\";\n";
		
	if(isset($info["BL"][$i])) echo $j_variable."+=\"".$info["BL"][$i]."\";\n";
	else echo $j_variable."+=\"<div class='behaviour Bl_blank'></div>\";\n";
		
	if(isset($info["SL"][$i])) echo $j_variable."+=\"".$info["SL"][$i]."\";\n";
	else echo $j_variable."+=\"<div class='behaviour SL_blank'></div>\";\n";

	echo $j_variable."+=\"</div>\";\n";
}

function course_search_screen () {

	$college = $_REQUEST["college"];
	$info = "";
	
	$sql = "select * from course_count where college_name='".$college."' and courses>0";
	connect_to_db ();
	$result = mysql_query($sql);
	$info .= "<div class=department_list>";
	while ($row = mysql_fetch_assoc($result)) {
		$info.="<div department_name='".$row["department_name"]."' count='".$row["courses"]."'>".$row["department_name"]."(".$row["courses"].")</div>";
	}
	$info .= "</div>";

	echo "var course_search_screen=\"".$info."\"";

}

function get_course_list() {
	$college = $_REQUEST["college"];
	$department_name = $_REQUEST["department_name"];
	$info = "";
	$sql = "select * from course_list where college='".$college."' and department='".$department_name."' order by title,level";
	connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$info.="<div course_id='".$row["id"]."'>".$row["title"]." (".$row["level"].")</div>";
	}
	echo "var course_list_result=\"".$info."\"";
}

function get_course_details () {
	$course_id = $_REQUEST["course_id"];
	$info = "";//"<div><div class=close_details>[&times;]</div></div>";
	$sql = "select * from course_list where id=".$course_id ;
	connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$info.= "<h2>".$row["title"]." (".$row["examining_board"]." ".$row["level"].")"."</h2>";
		$info.= "<h2>Requirements</h2>";
		$info.="<div>".$row["requirements"]."</div>";
		$info.= "<h2>Course Content</h2>";
		$info.="<div>".$row["content"]."</div>";
		#assessment 	
		$info.= "<h2>Assessment</h2>";
		$info.="<div>".$row["assessment"]."</div>";
		#essential_resources 	
		$info.= "<h2>Essential Resources</h2>";
		$info.="<div>".$row["essential_resources"]."</div>";
		#desired_resources 	
		$info.= "<h2>Desired Resources</h2>";
		$info.="<div>".$row["desired_resources"]."</div>";
		#progression
		$info.= "<h2>Progression</h2>";
		$info.="<div>".$row["progression"]."</div>";
	}
	echo "var course_details_result=\"".$info."\"";
}

function set_behaviour_status () {
	$id = $_REQUEST["behaviour_id"];
	$disabled = ($_REQUEST["value"]==="true") ? 0 : 1;
	$sql = "update behaviour set disabled = ".$disabled." where id=".$id;
	connect_to_db ();
	mysql_query($sql);
?>
/*
<?php echo $sql; ?>

<?php echo mysql_error() ?>

*/

<?php
	
}

function get_cms_user_details () {
	
	$user = $_REQUEST["user"];
	$sub_domain = $_REQUEST["sub_domain"];
	$sql = "select * from user_details where username='".$user."' and domain_name='".$sub_domain."'";
	connect_to_db ();
	$result = mysql_query($sql);
	$info = "";
	while ($row = mysql_fetch_assoc($result)) {
		$info .= "var email=\"".$row["email"]."\";";
		$info .= "var username=\"".$row["username"]."\";";
		$info .= "var firstname=\"".$row["firstname"]."\";";
		$info .= "var surname=\"".$row["surname"]."\";";
		$info .= "var role=\"".$row["role_name"]."\";";
	}
	echo $info;
}

function get_behaviours () {
	$alt = $_REQUEST["alt"];
	
	$info = explode("_",$_REQUEST["alt"]);
	
	switch ($info[0]) {
		case "cl": 		$level = 1; break;
		case "pf": 		$level = 2; break;
		case "bl": 		$level = 3; break;
		case "sl": 		$level = 4; break;
		case "core": 	$level = 5; break;
		default: 		$level = 0; break;
	}

	$html = "<div class=".$info[0].">";
	
	$between = "";
	if ($info[0] === "core"){
		switch ($info[1]){
			case 1: $between = " and behaviour_id between 1 and 5"; 	
				$html.="<h2>A: Maintains Personal Excellence</h2>"; 
				$html.="<div class=core_text>Successful CIPS employees are perceived as ambassadors of CIPS, demonstrate a professional attitude in all matters and endeavour to ensure continuous personal improvement</div>";
				break;
			case 2: $between = " and behaviour_id between 6 and 8"; 	
				$html.="<h2>B: Customer First</h2>"; 
				$html.="<div class=core_text>Successful CIPS employees demonstrate a commitment to customer excellence, providing exceptional service, endeavouring to understand the customers’ needs and expectations and act on them.</div>";
				break;
			case 3: $between = " and behaviour_id between 9 and 13"; 	
				$html.="<h2>C: Being one CIPS</h2>"; 
				$html.="<div class=core_text>Successful CIPS employees share expertise and information across the team and business to support others, seek to understand others’ perspectives and demonstrate communication across the wider team.</div>";
				break;
			case 4: $between = " and behaviour_id between 14 and 17"; 	
				$html.="<h2>D: Clear Thinking</h2>"; 
				$html.="<div class=core_text>Successful CIPS employees make effective decisions, keep up to date with relevant developments in CIPS and maintain an understanding of the CIPS business</div>";
				break;
			case 5: $between = " and behaviour_id between 18 and 21"; 	
				$html.="<h2>E: Delivers CIPS Excellence </h2>"; 
				$html.="<div class=core_text>Successful CIPS employees take accountability for delivering high quality results and constantly look to enhance CIPS performance and customer experience.</div>";
				break;
		}
	} else {
		switch ($info[1]){
			case 1: $between = " and behaviour_id between 1 and 7"; 	$html.="<h2>Personal and professional Excellence</h2>"; break;
			case 2: $between = " and behaviour_id between 8 and 11"; 	$html.="<h2>Builds and Develops Shared Vision</h2>"; break;
			case 3: $between = " and behaviour_id between 12 and 18"; 	$html.="<h2>Analysis and Decision Making</h2>"; break;
			case 4: $between = " and behaviour_id between 19 and 24"; 	$html.="<h2>Champions Business Inprovement</h2>"; break;
			case 5: $between = " and behaviour_id between 25 and 29"; 	$html.="<h2>Delivers Results</h2>"; break;
			case 6: $between = " and behaviour_id between 30 and 35"; 	$html.="<h2>Builds Powerful Relationships</h2>"; break;
			case 7: $between = " and behaviour_id between 36 and 39"; 	$html.="<h2>Challenges Constructively</h2>"; break;
		}
	}
	$sql = "select * from behaviour where level_id=".$level." and disabled=0 ".$between." order by behaviour_id";
	connect_to_db ();
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		if ($info[0]==="core") $number_info = "&bull;";
		else $number_info = $row["behaviour_id"];
		$html .= "<div class=level_behaviour><span class=numb>".$number_info."</span><span class=text>".$row["text"]."</span></div>";
	}

	//$html.="<ul class=behaviour_list style=overflow:hidden>";
	//while ($row = mysql_fetch_assoc($result)) {
	//	$html .= "<li class=level_behaviour><span class=text>".$row["text"]."</span></li>";
	//}
	//$html.="</ul>";
	
	$html.= "</div>";
?>

var new_behaviour="<?php echo $html ?>";
var sql ="<?php echo $sql ?>";

<?php	

}

function get_core () {
	$html="";
	$html.="<h2>A: Maintains Personal Excellence</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees are perceived as ambassadors of CIPS, demonstrate a professional attitude in all matters and endeavour to ensure continuous personal improvement:</div>";
	connect_to_db ();
	
	$sql = "select * from behaviour where level_id=5 and behaviour_id between 1 and 5 order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$html .= "<div class=level_behaviour><span class=numb>&bull;</span><span class=text>".$row["text"]."</span></div>";
	}
	
	$html.="<h2>B: Customer First</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees demonstrate a commitment to customer excellence, providing exceptional service, endeavouring to understand the customers’ needs and expectations and act on them:</div>";
	$sql = "select * from behaviour where level_id=5 and behaviour_id between 6 and 8 order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$html .= "<div class=level_behaviour><span class=numb>&bull;</span><span class=text>".$row["text"]."</span></div>";
	}			
	
	$html.="<h2>C: Being one CIPS</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees share expertise and information across the team and business to support others, seek to understand others’ perspectives and demonstrate communication across the wider team:</div>";
	$sql = "select * from behaviour where level_id=5 and behaviour_id between 9 and 13 order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$html .= "<div class=level_behaviour><span class=numb>&bull;</span><span class=text>".$row["text"]."</span></div>";
	}

	$html.="<h2>D: Clear Thinking</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees make effective decisions, keep up to date with relevant developments in CIPS and maintain an understanding of the CIPS business:</div>";
	$sql = "select * from behaviour where level_id=5 and behaviour_id between 14 and 17 order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$html .= "<div class=level_behaviour><span class=numb>&bull;</span><span class=text>".$row["text"]."</span></div>";
	}

	$html.="<h2>E: Delivers CIPS Excellence </h2>"; 
	$html.="<div class=core_text>Successful CIPS employees take accountability for delivering high quality results and constantly look to enhance CIPS' performance and customer experience:</div>";
	$sql = "select * from behaviour where level_id=5 and behaviour_id between 18 and 21 order by behaviour_id";
	$result = mysql_query($sql);
	while ($row = mysql_fetch_assoc($result)) {
		$html .= "<div class=level_behaviour><span class=numb>&bull;</span><span class=text>".$row["text"]."</span></div>";
	}
	//$html.="<ul>";
	//while ($row = mysql_fetch_assoc($result)) {
	//	$html .= "<li class=level_behaviour><span class=text>".$row["text"]."</span></div>";
	//}
	//$html.="</ul>";
?>
var core_data="<?php echo $html ?>";

<?php
}

function default_core () {
$html="";
	$html.="<h2>A: Maintains Personal Excellence</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees are perceived as ambassadors of CIPS, demonstrate a professional attitude in all matters and endeavour to ensure continuous personal improvement</div>";
	$html.="<h2>B: Customer First</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees demonstrate a commitment to customer excellence, providing exceptional service, endeavouring to understand the customers’ needs and expectations and act on them.</div>";
	$html.="<h2>C: Being one CIPS</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees share expertise and information across the team and business to support others, seek to understand others’ perspectives and demonstrate communication across the wider team.</div>";
	$html.="<h2>D: Clear Thinking</h2>"; 
	$html.="<div class=core_text>Successful CIPS employees make effective decisions, keep up to date with relevant developments in CIPS and maintain an understanding of the CIPS business</div>";
	$html.="<h2>E: Delivers CIPS Excellence </h2>"; 
	$html.="<div class=core_text>Successful CIPS employees take accountability for delivering high quality results and constantly look to enhance CIPS performance and customer experience.</div>";
?>
var core_default="<?php echo $html ?>";

<?php

}

function cips_migrate () {
	connect_to_db ();
	$sql = "delete from behaviour where behaviour_id between 1 and 7 and level_id between 2 and 4";
	mysql_query($sql);
	
	for ($i=2;$i<=4;$i++) {
		$sql = "insert into behaviour (level_id, behaviour_id, text, domain_id, disabled) "
				."select ".$i.", behaviour_id, text, domain_id, disabled from behaviour where level_id = 1 and  behaviour_id between 1 and 7";
		mysql_query($sql);
	
	}
?>
var cips_migrate = "complete";
<?php
}

switch($_REQUEST["joott_cmd"]) {
case "cips_migrate":
	cips_migrate();
	break;
case "default_core":
	default_core();
	break;
case "get_core":
	get_core();
	break;
case "get_behaviours":
	get_behaviours();
	break;
case "get_cms_user_details":
	get_cms_user_details();
	break;
case "set_behaviour_status":
	set_behaviour_status();
	break;
case "get_course_details":
	get_course_details ();
	break;
case "get_course_list":
	get_course_list();
	break;
case "course_search_screen";
	course_search_screen();
	break;
case "update_course";
	update_course();
	break;
case "course_screen":
	course_screen();
	break;
case "course_admin_screen":
	course_admin_screen();
	break;
case "pqbf_b_list":
	pqbf_b_list();
	break;
case "pqbf_job_list":
	pqbf_job_list();
	break;
case "is_logged_on":
	is_logged_on();
	break;
case "do_login":
	do_login();
	break;
case "get_behaviour_text":
	get_behaviour_text();
	break;
case "get_behaviour_list":
	get_behaviour_list();
	break;
case "save_job_matrix":
	save_job_matrix();
	break;
case "get_job_matrix":
	get_job_matrix();
	break;
case "save_job": 
	save_job();
	break;
case "load_job_matrix":
	load_job_matrix();
	break;
case "behaviour_list":
	echo "var behaviour_list=\"".behaviour_list()."\"";
	break;
case "save_behaviour":
	save_behaviour();
	break;
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