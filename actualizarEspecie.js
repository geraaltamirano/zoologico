// Función para manejar el envío del formulario
function manejarEnvioFormulario(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    var idInput = document.getElementById('id');
    var nombreInput = document.getElementById('nombre');
    var reinoInput = document.getElementById('reino');
    var filoInput = document.getElementById('filo');
    var claseInput = document.getElementById('clase');
    var ordenInput = document.getElementById('orden');
    var familiaInput = document.getElementById('familia');
    var generoInput = document.getElementById('genero');
    var descripcionInput = document.getElementById('descripcion');
    var ecosistemaInput = document.getElementById('ecosistema');
    var id = idInput.value.trim();
    var nombre = nombreInput.value.trim();
    var reino = reinoInput.value.trim();
    var filo = filoInput.value.trim();
    var clase = claseInput.value.trim();
    var orden = ordenInput.value.trim();
    var familia = familiaInput.value.trim();
    var genero = generoInput.value.trim();
    var descripcion = descripcionInput.value.trim();
    var ecosistema = ecosistemaInput.value.trim();
    // Verificar que los campos no estén vacíos
    if (!nombre || !reino || !filo || !orden || !familia || !genero || !clase || !descripcion || !ecosistema) {
        mostrarMensaje('Por favor, complete todos los campos.', 'error');
        return;
    }
    // Crear el objeto de usuario con los datos del formulario
    var especie = {
        nombre: nombre,
        reino: reino,
        filo: filo,
        clase: clase,
        orden: orden,
        familia: familia,
        genero: genero,
        descripcion: descripcion,
        ecosistema: ecosistema
    };
    // Crear el objeto de usuario con los datos del formulario
    fetch('http://127.0.0.1:3000/especies/actualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ id: id, nombre: nombre, reino: reino, filo: filo, clase: clase, orden: orden, familia: familia, genero: genero, descripcion: descripcion, ecosistema: ecosistema })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) { return mostrarMensaje("\u00A1Registro exitoso! Especie ".concat(nombre), 'exito'); }) // Mostrar los datos de especie en el mensaje
        .catch(function (error) { return mostrarMensaje("\u00A1Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte", 'error'); });
}
// Función para mostrar un mensaje al usuario
function mostrarMensaje(mensaje, tipo) {
    var mensajeDiv = document.getElementById('mensaje');
    // Establecer el estilo según el tipo de mensaje
    if (tipo === 'exito') {
        mensajeDiv.style.color = 'green';
    }
    else {
        mensajeDiv.style.color = 'red';
    }
}
// Asociar el evento del formulario con la función de manejo
var formulario = document.getElementById('registroForm');
formulario.addEventListener('submit', manejarEnvioFormulario);
