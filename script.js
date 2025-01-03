function showSection(event, section) {
    event.preventDefault();
    document.getElementById("initial-message").style.display = "none";
}

window.onload = function() {
    document.getElementById("initial-message").style.display = "flex";
};

function showSectionFromButton(section) {
    document.getElementById("initial-message").style.display = "none";
    showSection({ preventDefault: () => {} }, section);
}

let isTimeElapsed = true;

function updateTime() {
    const now = new Date();
    const startDate = new Date("2024-09-20T01:00:00");
    const next20th = new Date(now.getFullYear(), now.getMonth() + (now.getDate() > 20 ? 1 : 0), 20);
    const diffInMs = isTimeElapsed ? now - startDate : next20th - now;

    if (diffInMs < 0) {
        document.getElementById("time-counter").innerHTML = `<strong>tiempo sufrido:</strong> Aún no ha empezado el sufrimiento 🥲`;
        return;
    }

    if (!isTimeElapsed && diffInMs <= 0) {
        document.getElementById("time-counter").innerHTML = `<strong>felicitats mi amor ily❤️🎉<small>(no més no porfa🤞)</small></strong>`;
        return;
    }

    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    document.getElementById("time-counter").innerHTML = isTimeElapsed
        ? `<strong>tiempo sufrido:</strong> ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`
        : `<strong>falten:</strong> ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

function toggleTimeMode() {
    isTimeElapsed = !isTimeElapsed;
    updateTime();
}

document.getElementById("time-counter").addEventListener("click", toggleTimeMode);

setInterval(updateTime, 1000);

updateTime();
