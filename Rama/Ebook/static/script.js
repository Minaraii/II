// Idioma inicial
let currentLanguage = 'en'; 

// Función para manejar la pantalla de inicio
function handleSplashScreen() {
    // Muestra la pantalla de inicio durante 2 segundos
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');

        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 1000);
    }, 3000);
}

// Función para manejar el evento de carga de archivos
function handleFileUpload(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const fileInput = document.getElementById('fileInput');
    const uploadMessage = document.getElementById('uploadMessage');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfSection = document.getElementById('pdf_section');

    if (fileInput.files.length > 0) {
        uploadMessage.textContent = currentLanguage === 'en' 
            ? `Book uploaded successfully! File name: ${fileInput.files[0].name}` 
            : `¡Libro cargado con éxito! Nombre del archivo: ${fileInput.files[0].name}`;

        // Crea la URL del archivo subido
        const uploadedFileUrl = `/uploads/${fileInput.files[0].name}`;

        // Muestra el PDF en el iframe
        pdfViewer.src = uploadedFileUrl;
        pdfSection.style.display = 'block'; // Muestra la sección del PDF
    } else {
        uploadMessage.textContent = currentLanguage === 'en' 
            ? 'No file location found.' 
            : 'No se encuentra la ubicación de ningún archivo.';
    }
}

// Función para cambiar el idioma
function changeLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateContent();
}

// Función para actualizar el contenido de la página según el idioma
function updateContent() {
    const translations = {
        'en': {
            'title': 'Rama',
            'welcome': 'Welcome to Rama',
            'explore': 'Here you can explore and read books.',
            'upload_title': 'Upload a Book',
            'change_theme': 'Change Theme',
            'change_language': 'Change Language'
        },
        'es': {
            'title': 'Rama - Lector de Libros',
            'welcome': 'Bienvenido a Rama',
            'explore': 'Aquí puedes explorar y leer libros.',
            'upload_title': 'Cargar un Libro',
            'change_theme': 'Cambiar Tema',
            'change_language': 'Cambiar Idioma'
        }
    };

    // Actualiza el contenido según el idioma seleccionado
    document.title = translations[currentLanguage]['title'];
    document.querySelector('.titulo').textContent = translations[currentLanguage]['title'];
    document.querySelector('#contenido h3').textContent = translations[currentLanguage]['welcome'];
    document.querySelector('#contenido p').textContent = translations[currentLanguage]['explore'];
    document.querySelector('#upload_section h3').textContent = translations[currentLanguage]['upload_title'];
    document.querySelector('.switch-language').textContent = translations[currentLanguage]['change_language'];
    document.querySelector('.switch-theme').textContent = translations[currentLanguage]['change_theme'];
}

// Función para alternar el tema
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const button = document.querySelector('.switch-theme');
    button.textContent = body.classList.contains('dark-mode') ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
}

// Inicializar eventos al cargar la página
window.onload = function() {
    handleSplashScreen();

    // Event listeners
    document.getElementById('start-button').addEventListener('click', function() {
        alert('Bienvenido a la aplicación!'); // Mensaje de bienvenida
    });

    document.getElementById('uploadForm').addEventListener('submit', handleFileUpload);
    document.querySelector('.switch-language').addEventListener('click', changeLanguage);
    document.querySelector('.switch-theme').addEventListener('click', toggleTheme);
};
