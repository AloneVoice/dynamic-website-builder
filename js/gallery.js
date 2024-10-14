if (typeof galleryContainer === "undefined") {

const galleryContainer = document.querySelector('.gallery');
const fullsizeContainer = document.getElementById('fullsize-container');
const fullsizeImage = document.getElementById('fullsize-image');
const closeBtn = document.getElementById('close-fullsize');
const prevBtn = document.getElementById('prev-image');
const nextBtn = document.getElementById('next-image');
const blindsG = document.querySelectorAll(".blind"); // Każdy pasek
let currentIndex = 0;
let images = [];

// Pobierz listę zdjęć
galleryLoaded = false
console.log('start')
fetch('./includes/gallery.php')
  .then(response => response.json())
  .then(data => {
    images = data;
    showThumbnails();
  })
  .catch(error => console.error('Błąd podczas pobierania zdjęć:', error));

// Wyświetl miniaturki
function showThumbnails() {
  galleryContainer.innerHTML = '';
  let loadedImages = 0;
  images.forEach((image, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = `assets/gallery/${image}`;
    imgElement.classList.add('thumbnail');
    imgElement.onload = function() {
      loadedImages++;
      if (loadedImages === images.length) {
        createRows(); // Wywołaj układanie miniaturek
        galleryContainer.style.opacity = '1';
        blindsG.forEach((blind, index) => {
            setTimeout(() => {
              blind.classList.remove("show");
              blind.classList.add("hidden");
            }, index * 20);
          });
      }
    };
    imgElement.addEventListener('click', () => openFullsize(index));
    galleryContainer.appendChild(imgElement);
  });
}

// Otwórz zdjęcie w pełnym ekranie
function openFullsize(index) {
  currentIndex = index;
  fullsizeImage.src = `assets/gallery/${images[currentIndex]}`;
  fullsizeContainer.style.display = 'flex';
}

// Zamknij pełnoekranowy widok
closeBtn.addEventListener('click', () => {
  fullsizeContainer.style.display = 'none';
});

// Przejdź do poprzedniego zdjęcia
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  openFullsize(currentIndex);
});

// Przejdź do następnego zdjęcia
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  openFullsize(currentIndex);
});

// Układanie miniaturek (tworzenie wierszy)
function createRows() {
    const images = galleryContainer.querySelectorAll("img");
    const imagesArray = Array.from(images);
  
    const existingFillers = galleryContainer.querySelectorAll(".filler");
    existingFillers.forEach(filler => filler.remove());
  
    let sum = 0;
    let tempArray = [];
    imagesArray.forEach((img, i) => {
      let scaleHeight = 250;
      if (galleryContainer.offsetWidth < 600) scaleHeight = 200;
      if (galleryContainer.offsetWidth < 400) scaleHeight = 150;
      const imgScale = img.naturalWidth / img.naturalHeight;
      img.width = scaleHeight * imgScale;
      img.height = scaleHeight;
      sum += img.width;
      const diff = galleryContainer.offsetWidth - sum;
      tempArray.push(img);
      let scale = galleryContainer.offsetWidth / sum;
      if ((diff < img.width && scale < 1.6) || i === imagesArray.length - 1) {
        if (i === imagesArray.length - 1 && scale > 1.6) {
          scale = 1.6;
          const scaledSum = tempArray.reduce((acc, img) => acc + (img.width * scale), 0);
          const remainingSpace = galleryContainer.offsetWidth - scaledSum;
          const fillerDiv = document.createElement("div");
          const titleElement = document.createElement("span");
          titleElement.innerText = '...wkrĂłtce kolejne realizacje...';
          fillerDiv.classList.add("filler");
          if (remainingSpace < 132) fillerDiv.style.fontSize = '.8rem';
          fillerDiv.style.width = `${remainingSpace - 2}px`;
          fillerDiv.style.height = `${scaleHeight * scale - 2}px`;
          fillerDiv.appendChild(titleElement);
          galleryContainer.appendChild(fillerDiv);
        }
        scaleImgs(tempArray, scale, imagesArray);
        sum = 0;
        tempArray = [];
      }
    });
  
    // Ukryj loader i pokaĹź galeriÄ dopiero po przeskalowaniu i wyĹwietleniu obrazĂłw
   
  }
  
  function scaleImgs(arr, scl, imagesArray) {
    arr.forEach((img) => {
      const imgScale = img.offsetWidth / img.offsetHeight;
      const div = img.parentElement;
      img.addEventListener("click", () => {
        openFullsize(img.src, title, rodzaj);
      });
      if (imagesArray.length > 1) {
        img.width = img.width * scl - 2;
        img.height = img.width / imgScale;
      }
    });
  }
  

// Przeskalowanie podczas zmiany rozmiaru okna
// createRows()
window.onresize = createRows;

  
}