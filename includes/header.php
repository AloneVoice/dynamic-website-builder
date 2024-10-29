<div class="header">
    <div class="left-box">
        <a href="./">
            LOGO
        </a>
    </div>
    <div class="middle-box">
        <nav class="top-nav">
            <div class="nav-inside">
                <ul>
                    <?php
                    // Mapowanie nazw plików na nazwy wyświetlane w menu z ustaloną kolejnością
                    $pages = [
                        'home' => 'Home',
                        'about' => 'About',
                        'gallery' => 'Gallery',
                        'contact' => 'Contact',
                        'activate' => null
                    ];

                    // Ścieżka do folderu z podstronami
                    $pagesDirectory = 'pages';

                    // Skanujemy folder 'pages' i generujemy listę plików
                    $files = scandir($pagesDirectory);

                    // Tworzymy tablicę dla plików, które nie są zmapowane wraz z ich datami utworzenia
                    $unmappedFiles = [];

                    foreach ($files as $file) {
                        // Pomijamy "." i ".." oraz sprawdzamy, czy plik ma rozszerzenie .php
                        if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                            // Usuwamy rozszerzenie .php z nazwy pliku, aby stworzyć nazwę podstrony
                            $pageName = pathinfo($file, PATHINFO_FILENAME);

                            // Jeśli plik nie jest zmapowany w tablicy $pages, dodajemy go do $unmappedFiles
                            if (!array_key_exists($pageName, $pages)) {
                                // Ścieżka do konkretnego pliku
                                $filePath = $pagesDirectory . '/' . $file;

                                // Dodajemy plik do tablicy niezmapowanych plików z czasem utworzenia
                                $unmappedFiles[$pageName] = [
                                    'name' => ucfirst($pageName),
                                    'ctime' => filectime($filePath) // Czas utworzenia pliku
                                ];
                            }
                        }
                    }

                    // Sortujemy niezmapowane pliki według czasu utworzenia (ctime)
                    uasort($unmappedFiles, function ($a, $b) {
                        return $a['ctime'] <=> $b['ctime'];
                    });

                    // Generujemy linki z mapowania $pages, które mają ustaloną kolejność
                    foreach ($pages as $pageName => $displayName) {
                        $filePath = $pagesDirectory . '/' . $pageName . '.php';
                        if (file_exists($filePath) && $displayName != null) {
                            echo '<li><a href="' . $pageName . '">' . $displayName . '</a></li>';
                        }
                    }

                    // Dodajemy niezmapowane pliki do menu w kolejności wg czasu utworzenia
                    foreach ($unmappedFiles as $pageName => $data) {
                        echo '<li><a href="' . $pageName . '">' . $data['name'] . '</a></li>';
                    }
                    ?>
                </ul>
            </div>
        </nav>
    </div>
    <div class="right-box">
        <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </div>
</div>