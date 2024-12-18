// Función para mostrar la sección seleccionada y ocultar las demás
function showSection(event, section) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Ocultar ambas secciones
    document.getElementById("initial-message").style.display = "none";
    document.getElementById("love-tester-section").style.display = "none";
    document.getElementById("perdo-section").style.display = "none";

    // Restablecer la sección seleccionada
    if (section === 'love-tester') {
        resetLoveTester(); // Reiniciar el Love Tester
        document.getElementById("love-tester-section").style.display = "flex";
    } else if (section === 'perdo') {
        resetPerdo(); // Reiniciar el apartado Perdó
        document.getElementById("perdo-section").style.display = "flex";
    }
}

function toggleMenu() {
    const menu = document.querySelector('.main-menu ul');
    const hamburger = document.querySelector('.hamburger');

    // Alternar clases para mostrar/ocultar el menú y animar el botón
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
}



// Ocultar secciones y mostrar solo el mensaje inicial al cargar la página
window.onload = function() {
    document.getElementById("initial-message").style.display = "flex";
    document.getElementById("love-tester-section").style.display = "none";
    document.getElementById("perdo-section").style.display = "none";
};

function showInitialScreen(event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Ocultar todas las secciones
    document.getElementById("love-tester-section").style.display = "none";
    document.getElementById("perdo-section").style.display = "none";

    // Mostrar solo el mensaje inicial
    document.getElementById("initial-message").style.display = "flex";
}

// Mostrar la sección seleccionada desde los botones iniciales y ocultar el mensaje inicial
function showSectionFromButton(section) {
    // Oculta el contenedor inicial
    document.getElementById("initial-message").style.display = "none";
    // Muestra la sección seleccionada
    showSection({ preventDefault: () => {} }, section);
}

// Función para reiniciar el Love Tester a su estado inicial
function resetLoveTester() {
    const container = document.querySelector('.container');
    container.classList.remove('party-mode', 'dislike-mode');
    container.innerHTML = `
        <h1>Love Tester</h1>
        <p>¡Comprueba vuestra compatibilidad!</p>
        <form id="love-tester-form">
            <input type="text" id="name1" placeholder="Tu Nombre" required>
            <input type="text" id="name2" placeholder="Su Nombre" required>
            <button type="submit">Test</button>
        </form>
        <div id="result">
            <div class="progress-bar-container">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
            <div id="percentage"></div>
        </div>
    `;

    // Restablecer valores iniciales y asignar el evento de submit al formulario reiniciado
    document.getElementById("name1").value = '';
    document.getElementById("name2").value = '';
    document.getElementById("progress-bar").style.width = '0';
    document.getElementById("percentage").textContent = '';
    document.getElementById("love-tester-form").addEventListener("submit", loveTesterSubmitHandler);
}

// Función manejadora del evento submit para el Love Tester
function loveTesterSubmitHandler(event) {
    event.preventDefault();
    
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const progressBar = document.getElementById('progress-bar');
    const percentageDiv = document.getElementById('percentage');
    const container = document.querySelector('.container');

    // Resultados personalizados
    const customResults = {
        'jana-èlia': 100,
        'èlia-amaia': 10, 
        'itziar-èlia': -10,  
    };

    const key = `${name1}-${name2}`;
    const reverseKey = `${name2}-${name1}`;

    let score;
    if (customResults[key] !== undefined) {
        score = customResults[key];
    } else if (customResults[reverseKey] !== undefined) {
        score = customResults[reverseKey];
    } else {
        score = Math.floor(Math.random() * 91) + 10;
    }

    progressBar.style.width = '0';
    percentageDiv.textContent = '';
    
    setTimeout(() => {
        progressBar.style.width = `${score}%`;
        percentageDiv.textContent = `${score}%`;
    }, 100);

    // Activar modo fiesta para 'jana-èlia'
    if ((key === 'jana-èlia' || key === 'èlia-jana') && score === 100) {
        container.classList.add('party-mode');
        party.confetti(container, {
            count: party.variation.range(100, 200),
            spread: 60,
            size: party.variation.range(1, 2),
        });

        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            heart.style.opacity = 0.9;
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 3500);
        }

        const heartInterval = setInterval(createHeart, 100);
        setTimeout(() => {
            clearInterval(heartInterval);
            container.classList.remove('party-mode');
        }, 5000);
    }

    // Efecto "desagrado" para 'itziar-èlia'
    if ((key === 'itziar-èlia' || key === 'èlia-itziar') && score === -10) {
        container.classList.add('dislike-mode');
        container.innerHTML = '<h2 class="rotating-text">Puta🫵</h2>';
        
        function createDislikeEmoji(emoji) {
            const dislikeEmoji = document.createElement('div');
            dislikeEmoji.classList.add('dislike-emoji');
            dislikeEmoji.textContent = emoji;
            dislikeEmoji.style.left = `${Math.random() * 100}vw`;
            dislikeEmoji.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            document.body.appendChild(dislikeEmoji);
            setTimeout(() => { dislikeEmoji.remove(); }, 3500);
        }

        // Guardar los intervalos para poder limpiarlos después
        const poopInterval = setInterval(() => createDislikeEmoji('💩'), 200);
        const thumbsDownInterval = setInterval(() => createDislikeEmoji('👎'), 300);

        // Detener la caída de emojis y reiniciar el contenedor después de 5 segundos
        setTimeout(() => {
            clearInterval(poopInterval);
            clearInterval(thumbsDownInterval);
            resetLoveTester();  // Reinicia el contenedor
        }, 5000);
    }
}

// Asignar el manejador de submit al formulario "Love Tester" al cargar la página
document.getElementById("love-tester-form").addEventListener("submit", loveTesterSubmitHandler);

// Función para reiniciar el apartado Perdó a su estado inicial
function resetPerdo() {
    const container = document.getElementById("container");
    container.style.display = "block";
    document.getElementById("final-message").style.display = "none";
    document.body.style.backgroundColor = "#ffefef";

    const noButton = document.querySelector(".no");
    noButton.style.padding = "15px 25px";
    noButton.style.fontSize = "16px";
    noButton.style.display = "inline-block";

    const yesButton = document.querySelector(".yes");
    yesButton.style.padding = "15px 25px";
    yesButton.style.fontSize = "16px";
}

// Funciones para el apartado Perdón
let yesButton = document.querySelector(".yes");
let noButton = document.querySelector(".no");

function sayNo() {
    yesButton.style.padding = (parseFloat(window.getComputedStyle(yesButton).paddingTop) + 2) + 'px ' + (parseFloat(window.getComputedStyle(yesButton).paddingLeft) + 2) + 'px';
    yesButton.style.fontSize = (parseFloat(window.getComputedStyle(yesButton).fontSize) + 1) + 'px';

    const currentPaddingTop = parseFloat(window.getComputedStyle(noButton).paddingTop);
    const currentPaddingLeft = parseFloat(window.getComputedStyle(noButton).paddingLeft);
    const currentFontSize = parseFloat(window.getComputedStyle(noButton).fontSize);

    if (currentPaddingTop > 1 && currentPaddingLeft > 1 && currentFontSize > 1) {
        noButton.style.padding = (currentPaddingTop - 1) + 'px ' + (currentPaddingLeft - 1) + 'px';
        noButton.style.fontSize = (currentFontSize - 0.5) + 'px';
    } else {
        noButton.style.display = "none";
    }
}

function sayYes() {
    document.getElementById("container").style.display = "none";
    document.getElementById("final-message").style.display = "block";
    generateConfetti();
}

function generateConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(confetti);
        setTimeout(() => { confetti.remove(); }, 3000);
    }
}

function getRandomColor() {
    const colors = ["#ff4a4a", "#ff7a7a", "#ffbaba", "#ff8e8e", "#ff6161"];
    return colors[Math.floor(Math.random() * colors.length)];
}

let isTimeElapsed = true; // Estado inicial: muestra tiempo sufrido

// Actualizar el tiempo sufrido desde una fecha específica
function updateTimeElapsed() {
    const startDate = new Date("2024-09-20T01:00:00"); // Cambia a tu fecha inicial deseada
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
    isTimeElapsed = !isTimeElapsed; // Alterna el modo
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
