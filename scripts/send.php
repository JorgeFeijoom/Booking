<?php
    $sendTo = "jorgefeijoom@gmail.com";
    $titulo = $_POST["subject"];
    $ip = $_SERVER["REMOTE_ADDR"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // NO SPAM:
    $headers = "From: $name <$email>\r\n";  
    $headers .= "X-Mailer: PHP5\n";
    $headers .= 'MIME-Version: 1.0' . "\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    
    $mensaje = "<br/>\nNombre: " . $name . "<br/>\nEmail: " . $email . "<br/>\nComentario: " . $message;

    mail($sendTo, $titulo, $mensaje, $headers);
?>