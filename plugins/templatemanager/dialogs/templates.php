<?php
	$path = __FILE__;
	$n = strrpos ($path, "webroot");
	if ($n === false) exit ("Failed to detect file path");
	$config = substr ($path, 0, $n)."config/database.php";
	if (!file_exists ($config)) exit ("Config file not found");
	
	require_once ($config);
	
	$dbConfig = new DATABASE_CONFIG;
	
	$c = @mysql_connect ($dbConfig->default["host"], $dbConfig->default["login"], $dbConfig->default["password"]);
	if (!$c) exit ("Failerd to connect to DB server");
	if (!mysql_select_db ($dbConfig->default["database"], $c)) exit ("Failed to select DB");
	
	if (isset($_POST["save"]))
	{
		if (get_magic_quotes_gpc ())
		{
			foreach ($_POST as $k => &$v) $v = stripslashes ($v);
			unset ($v);
			foreach ($_GET as $k => &$v) $v = stripslashes ($v);
			unset ($v);
		}

		if (isset($_POST["template_id"]) && !strlen (trim ($_POST["new_template_name"])))
			mysql_query ("update webpage_templates set info=\"".
				mysql_real_escape_string ($_POST["new_template_info"])."\" where id=\"".mysql_real_escape_string ($_POST["template_id"])."\"");
		else
		{
			if (!strlen (trim ($_POST["new_template_name"]))) $_POST["new_template_name"] = "New template";
			mysql_query ("insert into webpage_templates (name, info) values(\"".
				mysql_real_escape_string (trim($_POST["new_template_name"]))."\", \"".mysql_real_escape_string ($_POST["new_template_info"])."\")");
		}
	}
	else if (isset($_GET["template_id"]))
	{
		mysql_query ("delete from webpage_templates where id=\"".mysql_real_escape_string ($_GET["template_id"])."\"");
	}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
	<form method="post" action="">
	<input type="hidden" name="save" value="1">
<?php
	$res = mysql_query ("select id,name,info from webpage_templates order by name");
	$n = 0;
	while ($rec = mysql_fetch_assoc ($res))
	{
		echo '<input type="radio" '.($n ? '' : 'checked').' name="template_id" value="'.$rec["id"].'" />'.
			htmlspecialchars ($rec["name"]).' <input type="hidden" name="template_info_'.$rec["id"].'" value="'.
			htmlspecialchars ($rec["info"]).'"><br/>';
		$n++;
	}
	if (!$n) echo "No templates were found in DB<br/>";
?>
	<hr/>
	Save current content of the editor window as a new template with name<br/>
	<input size="50" type="text" name="new_template_name" /><br/>
	Warning: if you will not specify the name of new template the currently selected template will be rewritten.
	<input type="hidden" name="new_template_info" value="">
	</form>
</body>
</html>
