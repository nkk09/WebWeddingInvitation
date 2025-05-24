var images = [
  "url(./photos/image1.jpg)",
  "url(./photos/image2.jpg)",
  "url(./photos/image3.jpg)",
  "url(./photos/image4.jpg)",
  "url(./photos/image5.jpg)",
  "url(./photos/image6.jpg)",
  "url(./photos/image7.jpg)",
  "url(./photos/image8.jpg)",
  "url(./photos/image9.jpg)",
  "url(./photos/image10.jpg)",
  "url(./photos/image11.jpg)",
  "url(./photos/image12.jpg)",
  "url(./photos/image13.jpg)"
];

// var LeafScene = function (el) {
//   this.viewport = el;
//   this.world = document.createElement("div");
//   this.leaves = [];
//   this.background = document.createElement("div");

//   this.background.className = "background-image";
//   this.viewport.appendChild(this.background);

//   this.options = {
//     numLeaves: 20,
//     wind: {
//       magnitude: 1.2,
//       maxSpeed: 12,
//       duration: 300,
//       start: 0,
//       speed: 0,
//     },
//   };

//   this.width = this.viewport.offsetWidth;
//   this.height = this.viewport.offsetHeight;

//   // animation helper
//   this.timer = 0;

//   this._resetLeaf = function (leaf) {
//     leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
//     leaf.y = -10;
//     leaf.z = Math.random() * 200;
//     if (leaf.x > this.width) {
//       leaf.x = this.width + 10;
//       leaf.y = (Math.random() * this.height) / 2;
//     }
//     if (this.timer == 0) {
//       leaf.y = Math.random() * this.height;
//     }
//     leaf.rotation.speed = Math.random() * 10;
//     var randomAxis = Math.random();
//     if (randomAxis > 0.5) {
//       leaf.rotation.axis = "X";
//     } else if (randomAxis > 0.25) {
//       leaf.rotation.axis = "Y";
//       leaf.rotation.x = Math.random() * 180 + 90;
//     } else {
//       leaf.rotation.axis = "Z";
//       leaf.rotation.x = Math.random() * 360 - 180;
//       leaf.rotation.speed = Math.random() * 3;
//     }
//     leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
//     leaf.ySpeed = Math.random() + 1.5;
//     return leaf;
//   };

//   this._updateLeaf = function (leaf) {
//     var leafWindSpeed = this.options.wind.speed(
//       this.timer - this.options.wind.start,
//       leaf.y
//     );
//     var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
//     leaf.x -= xSpeed;
//     leaf.y += leaf.ySpeed;
//     leaf.rotation.value += leaf.rotation.speed;
//     var t =
//       "translateX(" +
//       leaf.x +
//       "px) translateY(" +
//       leaf.y +
//       "px) translateZ(" +
//       leaf.z +
//       "px) rotate" +
//       leaf.rotation.axis +
//       "(" +
//       leaf.rotation.value +
//       "deg)";
//     if (leaf.rotation.axis !== "X") {
//       t += " rotateX(" + leaf.rotation.x + "deg)";
//     }
//     leaf.el.style.webkitTransform = t;
//     leaf.el.style.MozTransform = t;
//     leaf.el.style.oTransform = t;
//     leaf.el.style.transform = t;
//     if (leaf.x < -10 || leaf.y > this.height + 10) {
//       this._resetLeaf(leaf);
//     }
//   };

//   this._updateWind = function () {
//     if (
//       this.timer === 0 ||
//       this.timer > this.options.wind.start + this.options.wind.duration
//     ) {
//       this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
//       this.options.wind.duration =
//         this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
//       this.options.wind.start = this.timer;
//       var screenHeight = this.height;
//       this.options.wind.speed = function (t, y) {
//         var a =
//           ((this.magnitude / 2) * (screenHeight - (2 * y) / 3)) / screenHeight;
//         return (
//           a *
//             Math.sin(((2 * Math.PI) / this.duration) * t + (3 * Math.PI) / 2) +
//           a
//         );
//       };
//     }
//   };
// };

// LeafScene.prototype.init = function () {
//   for (var i = 0; i < this.options.numLeaves; i++) {
//     var leaf = {
//       el: document.createElement("div"),
//       x: 0,
//       y: 0,
//       z: 0,
//       rotation: {
//         axis: "X",
//         value: 0,
//         speed: 0,
//         x: 0,
//       },
//       xSpeedVariation: 0,
//       ySpeed: 0,
//       path: {
//         type: 1,
//         start: 0,
//       },
//       image: 1,
//     };
//     this._resetLeaf(leaf);
//     this.leaves.push(leaf);
//     this.world.appendChild(leaf.el);
//   }
//   this.world.className = "leaf-scene";
//   this.viewport.appendChild(this.world);
//   this.world.style.webkitPerspective = "400px";
//   this.world.style.MozPerspective = "400px";
//   this.world.style.oPerspective = "400px";
//   this.world.style.perspective = "400px";
//   var self = this;
//   window.onresize = function (event) {
//     self.width = self.viewport.offsetWidth;
//     self.height = self.viewport.offsetHeight;
//   };
// };

// LeafScene.prototype.render = function () {
//   this._updateWind();
//   for (var i = 0; i < this.leaves.length; i++) {
//     this._updateLeaf(this.leaves[i]);
//   }
//   this.timer++;
//   requestAnimationFrame(this.render.bind(this));
// };

function changeBackgroundImage() {
  var index = 0;
  setInterval(function () {
    document.querySelector(".background-image").style.backgroundImage =
      images[index];
    index = (index + 1) % images.length;
  }, 3000);
}

// var leafContainer = document.querySelector(".falling-leaves"),
//   leaves = new LeafScene(leafContainer);

// leaves.init();
// leaves.render();
// changeBackgroundImage();

const background = document.createElement("div");
background.className = "background-image";
document.querySelector(".falling-leaves").appendChild(background);
changeBackgroundImage();

const muteBtn = document.getElementById("mute-button");
const audio = document.getElementById("playAudio");
let isPlaying = true;

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

function setupLanguageSwitcher() {
  const switcher = document.getElementById("language-switcher");
  if (!switcher) return;
  switcher.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", selectedLang);
    window.location.href = url.toString();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLanguageFromURL();
  loadLanguage(lang);
  const switcher = document.getElementById("language-switcher");
  if (switcher) {
    switcher.value = lang;
  }
  setupLanguageSwitcher();

  // Initialize Swiper with navigation
  swiper = new Swiper(".mySwiper", {
    rtl: lang === "ar",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Auto-play audio when page loads
  const audioElement = document.querySelector("#playAudio");
  if (audioElement && isPlaying) {
    audioElement.play();
  }
});
