document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".top-nav");
  const hamburger = document.querySelector(".hamburger");
  const bars = hamburger.querySelectorAll(".bar");
  const contentDiv = document.querySelector(".content");
  const basePath = "/template/"; // Zmienna bazowa - ustaw tutaj odpowiednią ścieżkę
  const blinds = document.querySelectorAll(".blind"); // Każdy pasek

  let versions = {};
  
  // Przykład użycia: tworzymy zmienną --base-blur z 50% przezroczystości
  createBlurColor("--base", 0.9); // Tworzy --base-blur z przezroczystością 0.5
  createBlurColor("--light-back", 0.9); // Tworzy --base-blur z przezroczystością 0.5
  createBlurColor("--dark-back", 0.85); // Tworzy --base-blur z przezroczystością 0.5

  function createBlurColor(variableName, opacity) {
    // Odczytanie wartości zmiennej CSS z :root
    const rootStyles = getComputedStyle(document.documentElement);
    const baseColor = rootStyles.getPropertyValue(variableName).trim(); // np. #48b64a

    // Sprawdzenie, czy zmienna ma poprawny format (powinna być #RRGGBB)
    if (!/^#[0-9A-F]{6}$/i.test(baseColor)) {
      throw new Error("Błędny format koloru. Wymagany format to #RRGGBB.");
    }

    // Konwersja koloru na wersję z przezroczystością
    const blurColor = addOpacityToHexColor(baseColor, opacity);

    // Ustawienie nowej zmiennej --<variableName>-blur w :root
    const newVariableName = `${variableName}-blur`;
    document.documentElement.style.setProperty(newVariableName, blurColor);
  }

  // Funkcja pomocnicza do konwersji koloru na heksadecymalny z przezroczystością
  function addOpacityToHexColor(hexColor, opacity) {
    hexColor = hexColor.replace("#", "");

    const alphaHex = decimalToHex(opacity);
    return `#${hexColor}${alphaHex}`;
  }

  // Funkcja pomocnicza do konwersji wartości opacity na hex
  function decimalToHex(opacity) {
    const decimalValue = Math.round(opacity * 255);
    const hexValue = decimalValue.toString(16).padStart(2, "0");
    return hexValue.toUpperCase();
  }

  // Funkcja do pobierania wersji z versions.php
  async function fetchVersions() {
    try {
      const response = await fetch(`${basePath}includes/versions.php`);
      versions = await response.json();
    } catch (error) {
      console.error("Error fetching versions:", error);
    }
  }

  // Funkcja do ładowania nowej strony z obsługą żaluzji
  async function loadPage(page) {
    let isFetching = true; // Flaga oznaczająca trwające pobieranie
    let fetchedData = null; // Przechowuje dane, jeśli pobieranie zakończy się przed zasłanianiem

    // Rozpocznij pobieranie i zasłanianie równocześnie
    startBlindsAnimation();
    fetchPageContent(page)
      .then((data) => {
        isFetching = false;
        fetchedData = data;

        // Jeśli zasłanianie już się zakończyło, od razu aktualizujemy treść i odsłaniamy
        if (isBlindsAnimationFinished()) {
          updateContentAndReveal(fetchedData, page);
        }
      })
      .catch((err) => {
        console.error("Error loading page:", err);
        isFetching = false;
        // Zwiń żaluzje w przypadku błędu
        resetBlinds();
        contentDiv.innerHTML =
          "<p>Error loading content. Please try again later.</p>";
      });

    // Czekaj na zakończenie animacji zasłaniania
    setTimeout(() => {
      if (!isFetching && fetchedData) {
        // Jeśli pobieranie jest zakończone, aktualizuj treść i odsłaniaj
        updateContentAndReveal(fetchedData, page);
      }
    }, blinds.length * 20);
  }

  // Funkcja do uruchomienia animacji zasłaniania
  function startBlindsAnimation() {
    blinds.forEach((blind, index) => {
      setTimeout(() => {
        blind.classList.remove("hidden");
        blind.classList.add("show"); // Obrót do widocznego stanu
      }, index * 20);
    });
  }

  // Funkcja do sprawdzenia, czy animacja żaluzji się zakończyła
  function isBlindsAnimationFinished() {
    const blindsArr = Array.from(blinds);
    return blindsArr.every((blind) => blind.classList.contains("show"));
  }

  // Funkcja do pobierania zawartości strony
  async function fetchPageContent(page) {
    const response = await fetch(`${basePath}pages/${page}.php`);
    const html = await response.text();

    // Parsowanie pobranego HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Wyciągnięcie zawartości i metadanych
    return {
      newContent: doc.querySelector(".content").innerHTML,
      newTitle: doc.querySelector("title").textContent,
      newDescription: doc
        .querySelector('meta[name="description"]')
        .getAttribute("content"),
      newKeywords: doc
        .querySelector('meta[name="keywords"]')
        .getAttribute("content"),
    };
  }

  // Funkcja do aktualizacji treści i odsłaniania
  function updateContentAndReveal(data, page) {
    // Podmiana zawartości, tytułu i metadanych
    contentDiv.innerHTML = data.newContent;
    document.title = data.newTitle;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", data.newDescription);
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", data.newKeywords);

    // Aktualizacja linków do CSS i JS
    updateAssets(page);

    // Zmiana adresu URL bez odświeżania strony
    history.pushState({ page }, data.newTitle, basePath + page);

    // Zaktualizuj aktywne linki w menu
    document.querySelectorAll("nav a").forEach((link) => {
      const path = link.getAttribute("href");
      if (path === page) link.classList.add("active");
      else link.classList.remove("active");
    });

    // Odsłanianie żaluzji po załadowaniu treści
    if (page != 'gallery')
    blinds.forEach((blind, index) => {
      setTimeout(() => {
        blind.classList.remove("show");
        blind.classList.add("hidden");
      }, index * 20);
    });
  }

  // Funkcja do zwijania żaluzji w przypadku błędu
  function resetBlinds() {
    blinds.forEach((blind, index) => {
      setTimeout(() => {
        blind.classList.remove("show");
        blind.classList.add("hidden");
      }, index * 20 + 100);
    });
  }

  // Funkcja do aktualizacji linków CSS i JS
  function updateAssets(page) {
    const cssInfo = versions.css[page] || { version: "1.0" };
    const jsInfo = versions.js[page] || { version: "1.0" };

    const cssVersion = cssInfo.version;
    const jsVersion = jsInfo.version;

    const cssUrl = `css/${page}.css?ver=${cssVersion}`;
    const jsUrl = `js/${page}.js?ver=${jsVersion}`;

    // Sprawdzenie, czy plik CSS istnieje, zanim zostanie załadowany
    const pageCssLink = document.querySelector("link[data-page-css]");
    if (cssVersion !== "1.0") {
      if (pageCssLink) {
        pageCssLink.href = cssUrl;
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.href = cssUrl;
        newLink.setAttribute("data-page-css", "");
        document.head.appendChild(newLink);
      }
    } else if (pageCssLink) {
      pageCssLink.remove();
    }

    // Sprawdzenie, czy plik JS istnieje, zanim zostanie załadowany
    const pageJsScript = document.querySelector("script[data-page-js]");
    if (jsVersion !== "1.0") {
      // Jeśli skrypt już istnieje, usuń go i dodaj ponownie
      if (pageJsScript) {
        pageJsScript.remove();
      }

      // Tworzymy nowy skrypt, co wymusza jego załadowanie i wykonanie
      const newScript = document.createElement("script");
      newScript.src = jsUrl;
      newScript.setAttribute("data-page-js", "");
      document.body.appendChild(newScript);
    } else if (pageJsScript) {
      pageJsScript.remove();
    }
  }

  // Ustalanie domyślnej strony
  function determineInitialPage() {
    const path = window.location.pathname
      .replace(basePath, "")
      .replace(/^\/+/, "");
    const page = path || "home";
    loadPage(page);
  }

  function slide() {
    hamburger.classList.toggle("droped");
    nav.classList.toggle("slide");
    bars[0].classList.toggle("rotBottom");
    bars[1].classList.toggle("disapear");
    bars[2].classList.toggle("rotTop");
  }

  // Obsługa kliknięć w linki w menu
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("href");
      if (!link.classList.contains("active")) {
        loadPage(page);
        slide();
      }
    });
  });

  // Obsługa przywracania stanu (przyciski wstecz i do przodu w przeglądarce)
  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  });

  // Ładowanie wersji i początkowej strony
  fetchVersions().then(determineInitialPage);

  hamburger.addEventListener("click", (e) => {
    slide();
  });
});
