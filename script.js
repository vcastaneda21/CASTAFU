// Fecha de la boda (23 de enero de 2027 a las 6 PM)
const weddingDate = new Date("2027-01-23T18:00:00");

// Función para actualizar conteo regresivo
function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    } else {
        document.getElementById('countdown').innerText = "¡El día llegó!";
    }
}

// Función para manejar el envío del formulario RSVP
function handleSubmit(event) {
    event.preventDefault(); // Evita el envío real para simular confirmación
    const confirmation = document.getElementById('confirmation');
    confirmation.style.display = 'block';
    setTimeout(() => {
        confirmation.style.display = 'none';
    }, 3000); // Oculta el mensaje después de 3 segundos
}

// Función para alternar entre pre-boda y post-boda (para pruebas)
function toggleStage() {
    const preBoda = document.getElementById('pre-boda');
    const postBoda = document.getElementById('post-boda');
    if (preBoda.classList.contains('active')) {
        preBoda.classList.remove('active');
        postBoda.classList.add('active');
    } else {
        postBoda.classList.remove('active');
        preBoda.classList.add('active');
    }
}

// Función para alternar música de fondo
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    console.log('Intentando reproducir audio...');
    if (music.paused) {
        music.play().then(() => {
            console.log('Audio reproduciendo correctamente.');
            btn.innerText = '⏸';
        }).catch(error => {
            console.error('Error al reproducir audio:', error);
        });
    } else {
        music.pause();
        console.log('Audio pausado.');
        btn.innerText = '♪';
    }
}

// Intentar autoplay al cargar y manejar banner
window.addEventListener('load', () => {
    const music = document.getElementById('bg-music');
    const banner = document.getElementById('audio-banner');
    music.play().then(() => {
        console.log('Autoplay exitoso.');
        document.getElementById('music-btn').innerText = '⏸';
        banner.style.display = 'none'; // Oculta banner si funciona
    }).catch(error => {
        console.error('Autoplay bloqueado:', error);
        // Deja el banner visible para que el usuario haga clic
    });
});

// Ocultar banner y activar audio con un clic en la página
document.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    const banner = document.getElementById('audio-banner');
    if (music.paused) {
        music.play().catch(error => {
            console.error('Error al activar audio:', error);
        });
    }
    banner.style.display = 'none'; // Oculta banner después de clic
}, { once: true }); // Solo una vez

// Cambio automático de etapa
function checkStage() {
    const now = new Date();
    if (now >= weddingDate) {
        document.getElementById('pre-boda').classList.remove('active');
        document.getElementById('post-boda').classList.add('active');
    } else {
        document.getElementById('pre-boda').classList.add('active');
        document.getElementById('post-boda').classList.remove('active');
        updateCountdown();
    }
}

// Inicializar
checkStage();
setInterval(checkStage, 1000);