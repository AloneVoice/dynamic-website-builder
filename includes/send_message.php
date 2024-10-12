<?php
// Wczytaj PHPMailer
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Odczyt konfiguracji SMTP z pliku JSON
$config = json_decode(file_get_contents('../../../smtp_config.json'), true);

// Odbierz dane z POST
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Walidacja danych (opcjonalna)
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Wszystkie pola są wymagane.']);
    exit;
}

// Utwórz instancję PHPMailer
$mail = new PHPMailer(true);

try {
    // Konfiguracja serwera SMTP z pliku JSON
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = $config['smtp_auth'];
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port = $config['port'];
    $mail->CharSet = $config['charset'];
    $mail->SMTPDebug = $config['smtp_debug'];
    
    // Konfiguracja nadawcy
    $mail->setFrom($config['from_email'], $config['from_name']);

    // Odbiorca wiadomości
    $mail->addAddress($config['from_email'], $name); // Wprowadź poprawny adres odbiorcy

    // Treść wiadomości
    $mail->isHTML(true);
    $mail->Subject = 'Nowa wiadomość z formularza kontaktowego';
    $mail->Body    = "<p><strong>Imię:</strong> $name</p>
                      <p><strong>Email:</strong> $email</p>
                      <p><strong>Wiadomość:</strong><br>$message</p>";

    // Wysłanie wiadomości
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Błąd: {$mail->ErrorInfo}"]);
}
