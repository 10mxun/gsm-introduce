const slides = document.querySelectorAll(".slide");

const nextButton = document.getElementById("next-button");

const prevButton = document.getElementById("prev-button");

const pageNumber = document.getElementById("page-number");

const progressBar = document.getElementById("progress-bar");

let currentSlide = 0;

const totalSlides = slides.length;

/* SLIDE UPDATE */

function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  const page = String(currentSlide + 1).padStart(2, "0");

  pageNumber.textContent = page;

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  progressBar.style.width = `${progress}%`;

  updateNavigation();
}

/* NEXT */

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;

    updateSlide();
  }
}

/* PREVIOUS */

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;

    updateSlide();
  }
}

/* BUTTON */

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);

/* KEYBOARD */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    previousSlide();
  }
});

/* NAVIGATION */

function updateNavigation() {
  if (currentSlide === 0) {
    document.body.classList.add("first-slide");
  } else {
    document.body.classList.remove("first-slide");
  }
}

/* TOUCH SWIPE */

let touchStartX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].clientX;

  const difference = touchStartX - touchEndX;

  if (difference > 50) {
    nextSlide();
  }

  if (difference < -50) {
    previousSlide();
  }
});

/* START */

updateSlide();
