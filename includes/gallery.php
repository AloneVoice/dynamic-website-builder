<?php
$directory = '../assets/gallery/';
$images = array();

// Pobierz wszystkie pliki z rozszerzeniem .jpg, .png, etc.
$files = glob($directory . '*.{jpg,png,jpeg,gif}', GLOB_BRACE);

foreach ($files as $file) {
    $images[] = basename($file);
}

// Zwróć dane w formacie JSON
header('Content-Type: application/json');
echo json_encode($images);
?>