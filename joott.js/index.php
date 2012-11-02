<?php

$SUBDOMAIN = basename($_SERVER["DOCUMENT_ROOT"]);
$WIDGET_URL = "http://{$SUBDOMAIN}.joott.info/joott.js/widget";

define ("WEBSERVICE", "http://".$SUBDOMAIN.".joott.info/webservice.js/index.php");
define ("WIDGET_URL", "http://".$SUBDOMAIN.".joott.info/joott.js/widget");

include("libraries/jquery-1.8.2.js");
echo "\n";
include("libraries/jquery/j_make_zoomable.js");
echo "\n";
include("libraries/core.js");
include("libraries/element.js");
include("libraries/application_form.js");
include("libraries/webservice.js");
include("libraries/mobile_app.js");
include("libraries/gallery.js");
include("libraries/gallery_admin.js");
include("libraries/behaviour.js");
include("libraries/pqbf.js");
include("libraries/authorize.js");

include("libraries/storage.js");
include("libraries/media_area.js");
include("libraries/obj_tier.js");
include("libraries/context_menu.js");

include("libraries/cips_administration.js");
include("libraries/cips_animation.js");
include("libraries/cips_core.js");

include("libraries/course_administration.js");
include("libraries/rich_text.js");
include("libraries/course_search.js");

include("libraries/cms_administration.js");

#Components
include("libraries/cms_user_details.js");
include("libraries/cms_user_roles.js");
include("libraries/cms_new_user.js");
include("libraries/cms_menu_button.js");
include("libraries/cms_button_close.js");
include("libraries/cms_input_area.js");
include("libraries/cms_form_header.js");
include("libraries/cms_new_page.js");

include("libraries/browser_check.js");

#Joott Widgets
include("libraries/widget.js");

include("libraries/joott.js");

include ("libraries/jquery/sub_menu.js");
//include ("libraries/jquery/ul_structure.js");

include ("libraries/jquery/image_management.js");

?>