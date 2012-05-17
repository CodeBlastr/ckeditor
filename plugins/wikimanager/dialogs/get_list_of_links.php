<?php
	$path = __FILE__;
	$n = strrpos ($path, "webroot");
	if ($n === false) exit ("Failed to detect file path");
	$config = substr ($path, 0, $n)."config/database.php";
	if (!file_exists ($config)) exit ("Config file not found");
	
	$n2 = strrpos ($_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'], "ckeditor");
	$config2 = substr ($_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'], 0, $n2);

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
	<form name="wiki">
	Select the wiki page : 
	<select name="page">
		<option value=""></option>
<?php
	$res = mysql_query ("SELECT id, title, wiki_id 
						 FROM wiki_pages 
						 ORDER BY title");
						 
	while ($rec = mysql_fetch_assoc ($res))
		echo '<option value="'. $rec["wiki_id"] .'/'. htmlspecialchars($rec["title"]) .'"  >'. htmlspecialchars($rec["title"]) .'</option>';
?>
	</select>
	<input type="hidden" name="url" value="<?php echo "http://". $config2  ?>" />
	</form>
</body>
</html>
