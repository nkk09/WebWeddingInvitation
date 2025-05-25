var images = [
  "url(./photos/image1.jpg)",
  "url(./photos/image2.jpg)",
  "url(./photos/image3.jpg)",
  "url(./photos/image4.jpg)",
  "url(./photos/image5.jpg)",
  "url(./photos/image6.jpg)",
  "url(./photos/image7.jpg)",
  "url(./photos/image8.jpg)"
];

function preloadImages(imageUrls) {
  return Promise.all(imageUrls.map(imageUrl => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // Remove url() wrapper from the path
      img.src = imageUrl.replace(/^url\(['"]?(.+?)['"]?\)$/, '$1');
      img.onload = resolve;
      img.onerror = reject;
    });
  }));
}

function changeBackgroundImage() {
  const container = document.querySelector(".falling-leaves");
  const bg1 = document.createElement("div");
  const bg2 = document.createElement("div");

  bg1.className = "background-image active";
  bg2.className = "background-image";

  container.appendChild(bg1);
  container.appendChild(bg2);

  const layers = [bg1, bg2];
  let current = 0;
  let index = 1;

  bg1.style.backgroundImage = images[0];
  bg2.style.backgroundImage = images[1];

  setInterval(() => {
    // Update index of next image
    index = (index + 1) % images.length;

    // Get references to current and next layer
    const currentLayer = layers[current];
    const nextLayer = layers[1 - current];

    // Set the new image on the next layer
    nextLayer.style.backgroundImage = images[index];

    // Fade in next layer and fade out current
    nextLayer.classList.add("active");
    currentLayer.classList.remove("active");

    // Swap current layer index
    current = 1 - current;
  }, 6500);
}



// Set initial background immediately
document.addEventListener('DOMContentLoaded', async () => {
  // Preload images first
  try {
    await preloadImages(images);
    console.log('All images preloaded successfully');
  } catch (error) {
    console.error('Error preloading images:', error);
  }

  // Start background image rotation after preloading
  const firstBackground = document.querySelector(".background-image");
  if (firstBackground) {
    firstBackground.style.backgroundImage = images[0];
  }
  // Start the background rotation
  changeBackgroundImage();
});

// var leafContainer = document.querySelector(".falling-leaves"),
//   leaves = new LeafScene(leafContainer);

// leaves.init();
// leaves.render();

const background = document.createElement("div");
background.className = "background-image";
document.querySelector(".falling-leaves").appendChild(background);

const muteBtn = document.getElementById("mute-button");
const audio = document.getElementById("playAudio");
let isPlaying = true;
let isLoveButtonClicked = false; // Add at the top of the file with other global variables

const icons = {
  volume: `
        <svg id="mute-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06A4.978 4.978 0 0016.5 12z"/>
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
    `,
  mute: `
        <svg id="mute-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.14l2.36 2.36c.09-.15.14-.32.14-.47zM4.27 3L3 4.27l5 5H2v6h4l5 4v-6.73l4.73 4.73c-.73.46-1.59.73-2.5.73v2.06c1.36-.3 2.61-.97 3.63-1.91L19.73 21 21 19.73 4.27 3z"/>
        </svg>
    `,
};

muteBtn.addEventListener("click", () => {
  if (audio.paused) {
    isPlaying = true;
    audio.currentTime = 0; // Reset to the beginning
    audio.play();
    muteBtn.innerHTML = icons.volume;
  } else {
    isPlaying = false;
    audio.currentTime = 0; // Reset to the beginning
    audio.pause();
    muteBtn.innerHTML = icons.mute;
  }
});
const supportedLanguages = {
  en: { dir: "ltr", translations: window.translations_en },
  fr: { dir: "ltr", translations: window.translations_fr },
  ar: { dir: "rtl", translations: window.translations_ar },
};

function getLanguageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  if (lang && supportedLanguages[lang]) {
    return lang;
  }
  const preferredLang = getPreferredLanguage();
  if (supportedLanguages[preferredLang]) {
    return preferredLang;
  }
  return "en"; // default language
}

function loadLanguage(lang) {
  const langInfo = supportedLanguages[lang] || supportedLanguages["en"];
  applyTranslations(langInfo.translations);
  setDirection(langInfo.dir);
  // Set html lang and dir attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = langInfo.dir;
}

function applyTranslations(translations) {
  const elements = document.querySelectorAll("[data-i18n-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    if (translations && translations[key]) {
      el.innerHTML = translations[key]; // Changed from textContent to innerHTML
    }
  });
}

function setDirection(dir) {
  document.documentElement.setAttribute("dir", dir);
}

function getPreferredLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const shortLang = browserLang.split("-")[0];
  if (supportedLanguages[shortLang]) {
    return shortLang;
  }
  return "en";
}

function initializeSwiper(lang, unlocked) {
  return new Swiper(".mySwiper", {
    rtl: lang === "ar",
    initialSlide: 0,
    allowTouchMove: false,
    allowSlideNext: false,
    allowSlidePrev: false,
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    touchRatio: 1,
    resistanceRatio: 0,
    watchOverflow: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        // Skip the first bullet (cover page)
        if (index === 0) {
          return '';
        }
        return `<span class="${className}" data-index="${index - 1}"></span>`;
      },
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      formatFractionCurrent: function(number) {
        return number - 1;
      },
      // Add this property to adjust the active bullet index
      paginationBulletRender: function(swiper, index, className) {
        if (index === 0) return '';
        return '<span class="' + className + '" data-index="' + (index - 1) + '"></span>';
      }
    },
    on: {
      init: function() {
        // Hide pagination on cover page
        const paginationEl = document.querySelector('.swiper-pagination');
        paginationEl.classList.remove('show');
        
        if (unlocked) {
          this.allowTouchMove = true;
          this.allowSlideNext = true;
          this.allowSlidePrev = true;
          paginationEl.classList.add('show');
        }
      },
      slideChange: function () {
        // Show/hide pagination based on current slide
        const paginationEl = document.querySelector('.swiper-pagination');
        if (this.activeIndex === 0) {
          paginationEl.classList.remove('show');
        } else {
          // Adjust active bullet based on current slide
          const bullets = document.querySelectorAll('.swiper-pagination-bullet');
          bullets.forEach((bullet, index) => {
            if (index === this.activeIndex - 1) {
              bullet.classList.add('swiper-pagination-bullet-active');
            } else {
              bullet.classList.remove('swiper-pagination-bullet-active');
            }
          });
          paginationEl.classList.add('show');
        }

        // Disable prev swipe on first content slide (index 1)
        if (this.activeIndex === 1) {
          this.allowSlidePrev = false;
        } else {
          this.allowSlidePrev = true;
        }
      }
    }
  });
}


function switchLanguage(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, '', url.toString());

  const langInfo = supportedLanguages[lang];
  if (langInfo) {
    loadLanguage(lang);
    updateLanguageButtonStates(lang);
    
    const currentIndex = swiper.activeIndex;
    swiper.destroy(true, true);
    swiper = initializeSwiper(lang, isLoveButtonClicked);
    
    if (isLoveButtonClicked) {
      swiper.allowTouchMove = true;
      swiper.noSwiping = false;
      swiper.allowSlideNext = true;   // Allow next for both languages
      swiper.allowSlidePrev = true;   // Allow prev for both languages
      if (currentIndex === 0) {
        swiper.slideTo(0, 0);         // Ensure we're not on cover page
      } else {
        swiper.slideTo(1, 0);
      }
    }

  }
}

// Update the event listener in the DOMContentLoaded section
document.addEventListener("DOMContentLoaded", async () => {
    // Keep existing initialization code
    const lang = getLanguageFromURL();
    loadLanguage(lang);
    
    // Add countdown initialization
    startCountdown();
    
    // Rest of your existing code...
    const params = new URLSearchParams(window.location.search);
    const count = params.get("guests");

    if (count && count >= 1 && count <= 5) {
document.getElementById("guestCount").textContent = count;
    } else {
      document.getElementById("guestCount").textContent = "1"; // default fallback
    }
    
    // Update active button state
    const enButton = document.getElementById('en-button');
    const arButton = document.getElementById('ar-button');
    if (lang === 'ar') {
      arButton.classList.add('active');
      enButton.classList.remove('active');
    } else {
      enButton.classList.add('active');
      arButton.classList.remove('active');
    }
    
    // Initially disable swiping
    swiper = initializeSwiper(lang, false);


    // Update the love button click handler
    const loveButton = document.querySelector(".love-story-btn");
    if (loveButton) {
        loveButton.addEventListener("click", () => {
            isLoveButtonClicked = true;
            
            // Start the audio
            const audioElement = document.getElementById("playAudio");
            if (audioElement && isPlaying) {
                audioElement.play().then(() => {
                    muteBtn.innerHTML = icons.volume;
                }).catch(error => {
                    console.log("Playback prevented:", error);
                });
            }

            // Enable swiping and show pagination
            swiper.allowTouchMove = true;
            swiper.noSwiping = false;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            
            // Show pagination
            const paginationEl = document.querySelector('.swiper-pagination');
            paginationEl.classList.add('show');
            
            // Move to next slide
            swiper.slideTo(1, 600);
            swiper.update();
        });
    }
    
    // Add RSVP deadline check
    if (isRsvpDeadlinePassed()) {
      const form = document.getElementById('rsvpForm');
      const deadlineMessage = document.createElement('div');
      deadlineMessage.className = 'deadline-message';
      deadlineMessage.setAttribute('data-i18n-key', 'deadlinePassed');
      deadlineMessage.textContent = 'RSVP deadline has passed';
      
      if (form) {
        // Disable all form elements
        const formElements = form.querySelectorAll('input, select, button');
        formElements.forEach(element => {
          element.disabled = true;
        });
        
        // Replace form with message
        form.style.opacity = '0.5';
        form.parentNode.insertBefore(deadlineMessage, form.nextSibling);
      }
    }
});

function isRsvpDeadlinePassed() {
  const deadline = new Date('2025-07-02');
  const today = new Date();
  return today > deadline;
}

function handleRSVP(event) {
  event.preventDefault();
  const count = document.getElementById('guestCount').textContent;
  
  const message = `Hello Antoine & Sandy! 
I would like to confirm my attendance with ${count} guest(s).`;
  
  window.open(`https://wa.me/96171486921?text=${encodeURIComponent(message)}`, '_blank');
}

function handleDecline() {
  const message = `Hello Antoine & Sandy! 
Unfortunately, I will not be able to attend your wedding celebration. Thank you for thinking of me.`;
  
  window.open(`https://wa.me/96171486921?text=${encodeURIComponent(message)}`, '_blank');
}

// Add the countdown function at the end of the file
function startCountdown() {
  const weddingDate = new Date("2025-08-02T00:00:00");
  const countdownEl = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    const lang = getLanguageFromURL();
    const translations = supportedLanguages[lang].translations;

    if (diff <= 0) {
      countdownEl.textContent = translations.bigDay;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.textContent = translations.daysLeft.replace("{days}", days);
  }

  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

function updateLanguageButtonStates(selectedLang) {
    const enButton = document.getElementById('en-button');
    const arButton = document.getElementById('ar-button');
    
    if (selectedLang === 'ar') {
        arButton.classList.add('active');
        enButton.classList.remove('active');
    } else {
        enButton.classList.add('active');
        arButton.classList.remove('active');
    }
}
