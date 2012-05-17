<?php
  
  # if any of these characters exist this is probably an attack of some kind, so remove them, and later we'll check to make sure the @ symbol is back and that the email is valid
  #$replace = array("t"); 
 # $search = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "3", "5", "7", "9", "@"); 
 # $toEmail = str_replace($search, $replace, $_REQUEST['sendto']);   
  
  # actually decode here
 # $replace = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "3", "5", "7", "9", "@"); 
 # $search = array("Aort248", "AEt2B48", "o4Ct248", "FrDt2HJ", "REST248", "oMn86F", "wxGCD26", "86FGHsy", "04IxvIz", "KvwLMA4", "86Ft24L8", "oMEt248", "o6nt488", "ort2ort48o", "oxCpDt2xCD", "IqxvM248", "orFrt248", "osrtFGsy", "tooM24a8", "oIxuvIxv", "or2ovwLMA", "wooo4Et", "oAxEt48", "y86Ft24T28", "oFIt2488z", "2Ft24848", "orS4T2488", "wT62488xCD2", "oE8t2t2or", "oM40Ixva", "orMnwLM", "ot24vt48");  
  
 # $toEmail = str_replace($search, $replace, $toEmail); 
 $toEmail = $_POST['sendto']; 
  if (strpos($toEmail, '@')) {  
	$headers = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From : admin@zuha.com';
	$message = "";
	foreach ($_POST as $key => $value) { 
	     if($key == "submit") continue;
		 $message .= $key.' : '.$value."<br>";
	} 

	//echo $_REQUEST['sendto']."<br>".$_REQUEST['subject']."<br>".$message;
	mail($toEmail, $_POST['subject'], $message, $headers);
	header('Location: '.$_POST['redirectUrl'].'?e=sent'); 
		
  } else { 
	header('Location: '.$_POST['redirectUrl'].'?e=sent'); 
  	echo 'invalid to address';
  }