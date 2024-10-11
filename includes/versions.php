<?php
// Ścieżki do folderów z plikami CSS i JS
$cssDirectory = '../css';
$jsDirectory = '../js';

// Funkcja do skanowania folderu i generowania wersji na podstawie daty modyfikacji
function generateVersions($directory, $extension) {
    $versions = [];
    if (is_dir($directory)) {
        $files = scandir($directory);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === $extension) {
                $filePath = $directory . '/' . $file;
                $fileName = pathinfo($file, PATHINFO_FILENAME);

                // Tworzymy wpis z wersją opartą na dacie ostatniej modyfikacji pliku
                $versions[$fileName] = [
                    'version' => filemtime($filePath),
                    'exists' => true
                ];
            }
        }
    }
    return $versions;
}

// Generujemy wersje dla plików CSS i JS
$cssVersions = generateVersions($cssDirectory, 'css');
$jsVersions = generateVersions($jsDirectory, 'js');

// Łączymy wersje CSS i JS w jedną tablicę
$versions = [
    'css' => $cssVersions,
    'js' => $jsVersions
];

// Zwracamy wersje jako JSON
header('Content-Type: application/json');
echo json_encode($versions);
?>