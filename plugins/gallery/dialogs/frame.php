<?php


$path = __FILE__;
$n = strrpos ($path, "ckeditor");
if ($n === false) exit ("Failed to detect file path");
$path = substr ($path, 0, $n);
	

if($_GET["id"] != "s"){
$baseDir = $path. 'img/';

$path2 = $_SERVER["PHP_SELF"];
$n = strrpos ($path2, "ckeditor");
$path2 = substr ($path2, 0, $n).'img/';




$folder=opendir($baseDir);
while($file=readdir($folder)){
   if(!is_dir($file)){ 
        print '<div style="float:left; margin:10px;height:135px; width:20%;">';
        print '<img src="'. $path2.$file .'" alt="" /><br />';
        print '</div>';
    }
}
    
}else{
?> 

<div id="setting">
<form action="" method="">
	<input type="text" name="" />
	<input type="text" name="" />
	<input type="text" name="" />
	<input type="text" name="" />
	<input type="text" name="" />
</form>
</div> 
<?php } ?>
