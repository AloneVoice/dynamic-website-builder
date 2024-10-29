<?php
require '../db.php';

$isValidToken = false;

$email = $_COOKIE['user_email'] ?? '';

if ($email) {
    $stmt = $pdo->prepare("SELECT is_active FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $user['is_active']) {
        $isValidToken = true;
    }
}
?>

<title>Account Activation</title>
<meta name="description" content="Activate your account">
<meta name="keywords" content="account activation, confirm account, activate">
<div class="content">
    <?php if ($isValidToken): ?>
        <h1>Your account has been activated!</h1>
        <p>You can now <a href="login">log in</a>.</p>
    <?php else: ?>
        <h1>Invalid or expired activation link.</h1>
        <p>Please try registering again or contact support.</p>
    <?php endif; ?>
</div>
