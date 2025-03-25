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
    const startDate = new Date("2024-09-20T00:00:00");

    let next20th;
    if (now.getDate() > 20) {
        next20th = new Date(now.getFullYear(), now.getMonth() + 1, 20);
    } else {
        next20th = new Date(now.getFullYear(), now.getMonth(), 20);
    }

    const diffInMs = isTimeElapsed ? now - startDate : next20th - now;

    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    document.getElementById("time-counter").innerHTML = isTimeElapsed
        ? `<strong>tiempo sufirdo: </strong> ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`
        : (now.getDate() === 20
            ? `<strong>felicitats mi amor ily❤️🎉<small>(no més no porfa🤞)</small></strong>`
            : `<strong>faltan: </strong> ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
}

function toggleTimeMode() {
    const now = new Date();
    if (!isTimeElapsed && now.getDate() === 20) {
        document.getElementById("time-counter").innerHTML = `<strong>¡Felicidades, mi amor! 🎉❤️</strong>`;
        return;
    }
    isTimeElapsed = !isTimeElapsed;
    updateTime();
}

document.getElementById("time-counter").addEventListener("click", toggleTimeMode);

setInterval(updateTime, 1000);

updateTime();


const searchToggle = document.getElementById("search-toggle");
const searchModal = document.getElementById("search-modal");
const searchInput = document.getElementById("search-input");

searchToggle.addEventListener("click", () => {
  searchModal.style.display = "flex";
  searchInput.focus();
});

searchModal.addEventListener("click", (e) => {
  if (e.target === searchModal) {
    searchModal.style.display = "none";
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `https://user15151515.github.io/${encodeURIComponent(query)}/`;
    }
  } else if (e.key === "Escape") {
    searchModal.style.display = "none";
  }
});
