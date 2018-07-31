<?php

	$project_name = "project_name"; // Название вашего сайта
	$admin_email  = "admin_email";  // Почта на какую придет письмо
	$form_subject = "form_subject"; // Тема письма

	$method = $_SERVER['REQUEST_METHOD'];

	if ( $method === 'POST' ) {

		$name = $_POST['name'];
		$phone = $_POST['phonenumber'];

		$message = "<table border='1'>
					<caption>Сообщение</caption>
						<tr>
							<th>Имя</th>
							<th>Номер</th>
						</tr>
						<tr>
							<td>. $name .</td>
							<td>. $phone .</td>
						</tr>
					</table>";
		
		function adopt($text) {
			return '=?UTF-8?B?'.Base64_encode($text).'?=';
		}

		$headers = "MIME-Version: 1.0" . PHP_EOL .
				   "Content-Type: text/html; charset=utf-8" . PHP_EOL .
				   'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
				   'Reply-To: '.$admin_email.'' . PHP_EOL;

		mail($admin_email, adopt($form_subject), $message, $headers );

	}

	header( 'Location: /', true, 307 );