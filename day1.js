let slideIndex = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

let autoSlideInterval;


function showSlide(index) {
  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;

  slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

 
  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  
  const currentVideo = slides[slideIndex].querySelector("video");
  if (currentVideo) {
    clearInterval(autoSlideInterval); 
    
    currentVideo.play();

    
    const resumeAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 2500);
      currentVideo.removeEventListener("ended", resumeAutoSlide);
      currentVideo.removeEventListener("pause", resumeAutoSlide);
    };

    currentVideo.addEventListener("ended", resumeAutoSlide);
    currentVideo.addEventListener("pause", resumeAutoSlide);
  }
}


function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}


function plusSlides(n) {
  slideIndex += n;
  showSlide(slideIndex);
}


function currentSlide(n) {
  slideIndex = n - 1;
  showSlide(slideIndex);
}


autoSlideInterval = setInterval(nextSlide, 2500);


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
