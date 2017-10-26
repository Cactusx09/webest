<?php
require 'class.phpmailer.php';

$subject = 'Заявка с сайта "Webest"';
$yourmail = "admin@makello.biz";

$form = $_POST['form'];
$mail = $_POST['mail'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$msg = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>$subject</h2>\r\n";
$msg .= "<p><strong style='font-weight:bold'>Наименование формы: </strong> ".$form."</p>\r\n";
if($_REQUEST['name'] != null){
	$msg .= "<p><strong>Имя: </strong> ".$name."</p>\r\n";
}
if($_REQUEST['phone'] != null){
	$msg .= "<p><strong style='font-weight:bold'>Телефон: </strong> ".$phone."</p>\r\n";
}
if($_REQUEST['mail'] != null){
	$msg .= "<p><strong style='font-weight:bold'>Email: </strong> ".$mail."</p>\r\n";
}


$mail = new PHPMailer();
$mail->From = $yourmail;
$mail->FromName = 'Webest';
$mail->AddAddress('cactusx09@gmail.com', '');
$mail->IsHTML(true);
$mail->Subject = 'Новая заявка с сайта "Webest"';
if (isset($_FILES['upload']))
{
	if ($_FILES['upload']['error'] == 0)
	{
		$mail->AddAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);
	}
}else{
	$msg .= "<p>Файл не прикреплен</p>";
}
$msg .= "</body></html>";
$mail->Body = $msg;
if (!$mail->Send()) die('Mailer Error: ' . $mail->ErrorInfo);
?>
