const images = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function showImage(index) {
  // Remove a classe 'active' da imagem atual
  images[currentIndex].classList.remove('active');
  
  // Atualiza o índice (volta ao início se chegar ao fim)
  currentIndex = (index + images.length) % images.length;
  
  // Adiciona a classe 'active' na nova imagem
  images[currentIndex].classList.add('active');
}

// Eventos de clique
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));

// Carrossel automático - muda a cada 5 segundos
setInterval(() => {
  showImage(currentIndex + 1);
}, 5000);