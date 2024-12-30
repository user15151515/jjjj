function showSection(event, section) {
    event.preventDefault(); // Evita que el enlace recargue la página
    document.getElementById("initial-message").style.display = "none";
}

// Ocultar secciones y mostrar solo el mensaje inicial al cargar la página
window.onload = function() {
    document.getElementById("initial-message").style.display = "flex";
};

function showSectionFromButton(section) {
    document.getElementById("initial-message").style.display = "none";
    showSection({ preventDefault: () => {} }, section);
}

let isTimeElapsed = true; // Estado inicial: muestra tiempo sufrido

// Actualizar el tiempo sufrido desde una fecha específica
function updateTimeElapsed() {
    const startDate = new Date("2024-09-20T01:00:00");
    const now = new Date();
    const diffInMs = now - startDate;

    if (diffInMs < 0) {
        document.getElementById("time-counter").innerHTML = `<strong>tiempo sufrido:</strong> Aún no ha empezado el sufrimiento 🥲`;
        return;
    }

    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    document.getElementById("time-counter").innerHTML = `<strong>tiempo sufrido:</strong> ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Actualizar el tiempo faltante para el próximo día 20
function updateTimeRemaining() {
    const now = new Date();
    const next20th = new Date(now.getFullYear(), now.getMonth() + (now.getDate() > 20 ? 1 : 0), 20);
    const diffInMs = next20th - now;

    if (diffInMs <= 0) {
        document.getElementById("time-counter").innerHTML = `<strong>felicitats mi amor ily❤️🎉<small>(no més no porfa🤞)</small></strong>`;
        return;
    }

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    document.getElementById("time-counter").innerHTML = `<strong>falten:</strong> ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Alternar entre el tiempo transcurrido y el tiempo faltante
function toggleTimeMode() {
    isTimeElapsed = !isTimeElapsed;
    if (isTimeElapsed) {
        updateTimeElapsed();
    } else {
        updateTimeRemaining();
    }
}

// Configurar el evento de clic para alternar
document.getElementById("time-counter").addEventListener("click", toggleTimeMode);

// Actualizar continuamente el contador basado en el estado
setInterval(() => {
    if (isTimeElapsed) {
        updateTimeElapsed();
    } else {
        updateTimeRemaining();
    }
}, 1000);

// Mostrar inicialmente el tiempo sufrido
updateTimeElapsed();
