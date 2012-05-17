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
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
	<form>
<?php
	$res = mysql_query ("select id,name from webpages order by name");
	while ($rec = mysql_fetch_assoc ($res))
		echo '<input type="radio" name="page_id" value="'.$rec["id"].'" />'.htmlspecialchars ($rec["name"]).'<br/>';
?>
	</form>
</body>
</html>
