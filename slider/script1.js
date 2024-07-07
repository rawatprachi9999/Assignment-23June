const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('#nextBtn');
const prevButton = document.querySelector('#prevBtn');
const dots = document.querySelectorAll('.slider-dot');

let currentIndex = 0;

const updateSlidePosition = () => {
    const amountToMove = -currentIndex * 100;
    track.style.transform = `translateX(${amountToMove}%)`;
};

const updateDots = () => {
    dots.forEach((dot, index) => {
        dot.classList.toggle('current-slide', index === currentIndex);
    });
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlidePosition();
        updateDots();
    });
});

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlidePosition();
    updateDots();
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    updateSlidePosition();
    updateDots();
});
