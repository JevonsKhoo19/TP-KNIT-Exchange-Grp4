let slideIndex = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

let autoSlideInterval;

// Show slide function
function showSlide(index) {
  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;

  slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  // If the current slide has a video, pause auto-sliding
  const currentVideo = slides[slideIndex].querySelector("video");
  if (currentVideo) {
    clearInterval(autoSlideInterval); // stop auto-slide
    // Optionally autoplay the video
    currentVideo.play();

    // Resume auto-slide when video ends or is paused
    const resumeAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 2500);
      currentVideo.removeEventListener("ended", resumeAutoSlide);
      currentVideo.removeEventListener("pause", resumeAutoSlide);
    };

    currentVideo.addEventListener("ended", resumeAutoSlide);
    currentVideo.addEventListener("pause", resumeAutoSlide);
  }
}

// Next slide function
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// Next/Prev controls
function plusSlides(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

// Dot controls
function currentSlide(n) {
  slideIndex = n - 1;
  showSlide(slideIndex);
}

// Start auto-slide
autoSlideInterval = setInterval(nextSlide, 2500);

// Initialize first slide
showSlide(slideIndex);

const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume-slider");

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
