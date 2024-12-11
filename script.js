//Menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

//Scroll secciones menu
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Botones back y next
const carousel = document.getElementById('carousel');
const images = carousel.children;
let index = 0;

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
});

function updateCarousel() {
    const offset = -index * 100; // Mueve el carrusel a la izquierda
    carousel.style.transform = `translateX(${offset}%)`;
}