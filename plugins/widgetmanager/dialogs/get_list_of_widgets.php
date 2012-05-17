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
    $widgets_array = array(
        array('name' => 'first_widget', 'img_path' => '/img/widgets/first_widget.png', 'nick' => 'first'),
        array('name' => 'second_widget', 'img_path' => '/img/widgets/second_widget.png', 'nick' => 'second'),
        array('name' => 'thrid_widget', 'img_path' => '/img/widgets/thrid_widget.png', 'nick' => 'thrid'),
        array('name' => 'fourth_widget', 'img_path' => '/img/widgets/fourth_widget.png', 'nick' => 'fourth')
    );
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Widget Manager</title>
</head>

<body>
	<form>
<?php
	foreach ($widgets_array as $widget) {
		?>
        <input type="radio" name="widget_nick" value="<?php echo $widget['nick']?>"><img src="<?php echo $widget['img_path']?>">
        <p><?php echo $widget['name']?></a></p>
        <?php
    }
?>
	</form>
</body>
</html>
