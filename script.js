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

// Botones back y next
const carousel = document.getElementById('carousel');
const images = carousel.children;
let index = 0;

// Manejadores de eventos para los botones
document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
});

// Función para actualizar el carrusel
function updateCarousel() {
    const offset = -index * 100; // Mueve el carrusel a la izquierda
    carousel.style.transform = `translateX(${offset}%)`;
}

// Variables para el deslizamiento
let startX = 0;
let endX = 0;

// Manejadores de eventos táctiles
carousel.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Posición inicial del toque
});

carousel.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX; // Posición actual del toque
});

carousel.addEventListener('touchend', () => {
    const diffX = startX - endX; // Diferencia de posición

    // Umbral para determinar si es un deslizamiento
    const threshold = 50; // Puedes ajustar este valor

    if (diffX > threshold) {
        // Deslizamiento a la izquierda
        index = (index + 1) % images.length;
        updateCarousel();
    } else if (diffX < -threshold) {
        // Deslizamiento a la derecha
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    }
});