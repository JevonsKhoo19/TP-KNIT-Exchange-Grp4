const faders = document.querySelectorAll(".day");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

if (lightbox && lightboxImg && captionText && closeBtn) {
  document.querySelectorAll(".photos img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      captionText.innerHTML = img.alt;
    });
  });

  closeBtn.onclick = function() {
    lightbox.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === lightbox) {
      lightbox.style.display = "none";
    }
  };
}


const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume-slider");

if (music && playBtn && volumeSlider) {
  playBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playBtn.textContent = "⏸️";
    } else {
      music.pause();
      playBtn.textContent = "▶️";
    }
  });

  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.flip-card');
  const modal = document.getElementById('password-modal');
  const modalInput = document.getElementById('modal-input');
  const modalSubmit = document.getElementById('modal-submit');
  const modalClose = document.querySelector('.close-modal');
  const modalInstruction = document.getElementById('modal-instruction');
  const modalError = document.getElementById('modal-error');
  const accessPopup = document.getElementById('access-popup'); 

  let currentCard = null;

 
  function showAccessGranted() {
    accessPopup.classList.add('show');
    setTimeout(() => {
      accessPopup.classList.remove('show');
    }, 2500); 
  }

  cards.forEach(card => {
    const password = card.getAttribute('data-password');
    const unlockBtn = card.querySelector('.unlock-btn');

    if (unlockBtn) {
      unlockBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        currentCard = card;
        modal.style.display = 'block';
        modalInput.value = '';
        modalError.style.display = 'none';
        modalInstruction.textContent = `Enter password for ${card.querySelector('h3').textContent}:`;

        modalSubmit.onclick = () => {
          if (modalInput.value === password) {
            card.querySelector('.flip-card-inner').classList.add('flipped');
            modal.style.display = 'none';
            showAccessGranted(); 
          } else {
            modalError.style.display = 'block';
          }
        };
      });
    }
  });

  modalClose.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});






document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-lang-btn').forEach(button => {
    button.addEventListener('click', () => {
      const cardBack = button.closest('.flip-card-back'); 
      const english = cardBack.querySelector('.english');
      const japanese = cardBack.querySelector('.japanese');

      if (english && japanese) {
        const isEnglishVisible = window.getComputedStyle(english).display !== 'none';

        if (isEnglishVisible) {
          english.style.display = "none";
          japanese.style.display = "block";
          button.textContent = "English";
        } else {
          english.style.display = "block";
          japanese.style.display = "none";
          button.textContent = "日本語";
        }
      }
    });
  });
});
