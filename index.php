<?php
// Ścieżki do folderów z plikami CSS i JS
$cssDirectory = 'css';
$jsDirectory = 'js';

// Funkcja do generowania wersji na podstawie daty modyfikacji
function getFileVersion($filePath) {
    return file_exists($filePath) ? filemtime($filePath) : '1.0';
}

// Ścieżki do konkretnych plików
$mobileCssPath = $cssDirectory . '/mobile.css';
$desktopCssPath = $cssDirectory . '/desktop.css';
$mainJsPath = $jsDirectory . '/main.js';

// Generowanie wersji dla tych plików
$mobileCssVersion = getFileVersion($mobileCssPath);
$desktopCssVersion = getFileVersion($desktopCssPath);
$mainJsVersion = getFileVersion($mainJsPath);
?>
<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title>Template page</title>
    <!-- Główne pliki CSS -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/mobile.css?ver=<?php echo $mobileCssVersion; ?>">
    <link rel="stylesheet" media="(min-width:1100px)" href="css/desktop.css?ver=<?php echo $desktopCssVersion; ?>">
</head>

<body>
<div class="blinds" id="blinds">
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
      <div class="blind"></div>
    </div>
    <div class="main">
        <?php include 'includes/header.php'; ?>
        <div class="content"></div>
    </div>
    <?php include 'includes/footer.php'; ?>
    <div id="messageAlert" class="hide">
        <span class="close_x">+</span>
        <h2></h2>
    </div>
    <!-- Główny plik JavaScript -->
    <script src="js/main.js?ver=<?php echo $mainJsVersion; ?>"></script>
</body>

</html>
