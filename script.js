/***************************************************
 * script.js
 * Lógica completa para:
 * 1. Subir imágenes a Firebase Storage
 * 2. Guardar y mostrar URLs en Firestore
 * 3. Guardar y mostrar comentarios en Firestore
 * 4. Manejar interactividad en cada ciudad
 ***************************************************/

/**********************
 * 1. Inicializar Firebase
 **********************/

// IMPORTANTE: Reemplaza estos datos con la configuración
// de tu proyecto en Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyA_Qa3AH8ZQB5cMxqhtmBOwr26uwh09c6E",
  authDomain: "interra-5ad36.firebaseapp.com",
  databaseURL: "https://interra-5ad36-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "interra-5ad36",
  storageBucket: "interra-5ad36.firebasestorage.app",
  messagingSenderId: "757837969336",
  appId: "1:757837969336:web:ef4f8b27c40fb25102c14d",
};
// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a los servicios que usaremos
const storage = firebase.storage();
const db = firebase.firestore();

/**********************
 * 2. Funciones auxiliares
 **********************/

/**
 * Sube una imagen a Firebase Storage, retorna la URL pública.
 * @param {File} file - El archivo de imagen.
 * @param {String} city - El nombre de la ciudad (para organizar el storage).
 * @returns {Promise<String>} - La URL pública de la imagen.
 */
function uploadImage(file, city) {
  return new Promise((resolve, reject) => {
    // Referencia a la carpeta en Storage (e.g. "images/amsterdam/...")
    const storageRef = storage.ref(`images/${city}/${Date.now()}-${file.name}`);
    // Sube el archivo
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      // Opcional: progreso de la subida
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subiendo imagen de ${city}: ${progress}% completado.`);
      },
      // Manejo de errores
      error => {
        console.error("Error al subir la imagen:", error);
        reject(error);
      },
      // Compleción exitosa
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve(downloadURL);
        });
      }
    );
  });
}

/**
 * Guarda la URL de la imagen en Firestore, en la colección de la ciudad.
 * @param {String} city - Nombre de la ciudad (amsterdam, praga, etc.)
 * @param {String} imageUrl - La URL pública de la imagen.
 * @returns {Promise<void>}
 */
function saveImageData(city, imageUrl) {
  return db.collection(`photos-${city}`).add({
    url: imageUrl,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/**
 * Obtiene la lista de imágenes (URLs) de Firestore para la ciudad
 * y actualiza el contenedor en la página.
 * @param {String} city - Nombre de la ciudad.
 */
function loadImages(city) {
  // Contenedor donde se mostrarán las fotos
  const photosContainer = document.getElementById(`${city}-photos`);
  
  db.collection(`photos-${city}`)
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      // Limpiar el contenedor antes de mostrar
      photosContainer.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const url = data.url;

        // Crear un elemento <div> para la imagen
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image-wrapper");

        // Crear un elemento <img> para la foto
        const img = document.createElement("img");
        img.src = url;
        img.alt = city;
        imageDiv.appendChild(img);

        // Agregar el <div> al contenedor
        photosContainer.appendChild(imageDiv);
      });
    });
}

/**
 * Guarda un comentario en Firestore, en la colección de la ciudad.
 * @param {String} city - Nombre de la ciudad.
 * @param {String} commentText - Texto del comentario.
 * @returns {Promise<void>}
 */
function saveComment(city, commentText) {
  return db.collection(`comments-${city}`).add({
    text: commentText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/**
 * Carga y muestra los comentarios de Firestore en tiempo real.
 * @param {String} city - Nombre de la ciudad.
 */
function loadComments(city) {
  const commentsContainer = document.getElementById(`${city}-comments`);

  db.collection(`comments-${city}`)
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      // Limpiamos el contenedor
      commentsContainer.innerHTML = "<h3>Comentarios</h3>";
      // Agregar cada comentario
      snapshot.forEach(doc => {
        const data = doc.data();
        const commentText = data.text;

        const commentDiv = document.createElement("div");
        commentDiv.classList.add("single-comment");
        commentDiv.innerText = commentText;

        commentsContainer.appendChild(commentDiv);
      });
    });
}

/**********************
 * 3. Funciones principales para manejar la subida de imágenes y comentarios
 **********************/

/**
 * Maneja el evento de subida de imagen para una ciudad específica.
 * @param {String} city - Ej: "amsterdam", "praga", ...
 */
function handleImageUpload(city) {
  // Formulario e input-file
  const form = document.getElementById(`${city}-upload-form`);
  const fileInput = document.getElementById(`${city}-image-file`);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    try {
      // 1. Subir la imagen a Storage y obtener URL
      const imageUrl = await uploadImage(file, city);
      // 2. Guardar la URL en Firestore
      await saveImageData(city, imageUrl);
      // 3. Limpiar el input
      fileInput.value = "";
      alert("¡Imagen subida con éxito!");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
    }
  });
}

/**
 * Maneja el envío de comentarios para una ciudad.
 * @param {String} city
 */
function handleCommentSubmission(city) {
  const form = document.getElementById(`${city}-comment-form`);
  const input = document.getElementById(`${city}-comment-input`);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const commentText = input.value.trim();
    if (!commentText) return;

    try {
      await saveComment(city, commentText);
      input.value = "";
    } catch (error) {
      console.error("Error al guardar comentario:", error);
      alert("Hubo un error al enviar tu comentario.");
    }
  });
}

/**********************
 * 4. Iniciar toda la lógica al cargar la página
 **********************/
window.addEventListener("load", () => {
  // Lista de las ciudades definidas
  const cities = ["amsterdam", "praga", "viena", "budapest", "split", "hvar"];

  // Para cada ciudad:
  cities.forEach(city => {
    // Cargar imágenes en tiempo real
    loadImages(city);
    // Manejar envío de imágenes
    handleImageUpload(city);
    // Cargar comentarios en tiempo real
    loadComments(city);
    // Manejar envío de comentarios
    handleCommentSubmission(city);
  });
});
