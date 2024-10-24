from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os

app = Flask(__name__)

# Configuración para la carpeta de carga
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ruta para cargar libros
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'fileInput' not in request.files:
        return jsonify({'success': False, 'message': 'No file part'})

    file = request.files['fileInput']

    if file.filename == '':
        return jsonify({'success': False, 'message': 'No selected file'})

    # Guardar el archivo en la carpeta de uploads
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return jsonify({'success': True, 'filePath': f'/uploads/{file.filename}'})  # Devuelve la ruta del archivo
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error saving file: {str(e)}'})

# Ruta para mostrar el archivo subido 
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Idiomas disponibles
translations = {
    'en': {
        'title': 'Rama',
        'welcome': 'Welcome to Rama',
        'explore': 'Here you can explore and read books.',
        'upload_title': 'Upload a Book',
        'change_theme': 'Change Theme',
        'change_language': 'Change Language',
        'no_file_location': 'No file location found.',
    },
    'es': {
        'title': 'Rama - Lector de Libros',
        'welcome': 'Bienvenido a Rama',
        'explore': 'Aquí puedes explorar y leer libros.',
        'upload_title': 'Cargar un Libro',
        'change_theme': 'Cambiar Tema',
        'change_language': 'Cambiar Idioma',
        'no_file_location': 'No se encuentra la ubicación de ningún archivo.'
    }
}

@app.route('/')
def index():
    return render_template('index.html', translations=translations['en'])

if __name__ == '__main__':
    app.run(debug=True)
