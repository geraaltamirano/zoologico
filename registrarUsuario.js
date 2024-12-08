// Función para manejar el envío del formulario
function manejarEnvioFormulario(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    var nombreInput = document.getElementById('nombre');
    var apellidopInput = document.getElementById('apellidop');
    var apellidomInput = document.getElementById('apellidom');
    var usuarioInput = document.getElementById('usuario');
    var claveInput = document.getElementById('clave');
    var cargoInput = document.getElementById('cargo');
    var rolInput = document.getElementById('rol');
    var nombre = nombreInput.value.trim();
    var apellidop = apellidopInput.value.trim();
    var apellidom = apellidomInput.value.trim();
    var clavedesc = claveInput.value.trim();
    var cargo = cargoInput.value.trim();
    var usuariof = usuarioInput.value.trim();
    var rol = rolInput.value.trim();
    // Verificar que los campos no estén vacíos
    if (!nombre || !apellidop || !apellidom || !usuariof || !clavedesc || !cargo || !rol) {
        mostrarMensaje('Por favor, complete todos los campos.', 'error');
        return;
    }
    //Cifrar password
    var desplazamiento = 5;
    var clave = cifrarTextoCesar(clavedesc, desplazamiento);
    // Crear el objeto de usuario con los datos del formulario
    var usuario = {
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        clave: clave,
        cargo: cargo,
        usuario: usuariof,
        rol: rol
    };
    fetch('http://127.0.0.1:3000/guardar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ nombre: nombre, apellidop: apellidop, apellidom: apellidom, clavedesc: clavedesc, cargo: cargo, usuariof: usuariof, rol: rol })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) { return mostrarMensaje("\u00A1Registro exitoso!", 'exito'); }) // Mostrar los datos del usuario en el mensaje
        .catch(function (error) { return mostrarMensaje("\u00A1Error, hubo un problema al registrar el usuario, por favor contacte al equipo de soporte", 'error'); });
}
// Función para mostrar un mensaje al usuario
function mostrarMensaje(mensaje, tipo) {
    var mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
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
function cifrarTextoCesar(texto, desplazamiento) {
    var textoCifrado = '';
    for (var i = 0; i < texto.length; i++) {
        var char = texto[i];
        // Si es una letra mayúscula
        if (char >= 'A' && char <= 'Z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de A-Z
            textoCifrado += String.fromCharCode(((char.charCodeAt(0) - 65 + desplazamiento) % 26) + 65);
        }
        // Si es una letra minúscula
        else if (char >= 'a' && char <= 'z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de a-z
            textoCifrado += String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26) + 97);
        }
        else {
            // Si no es una letra, lo dejamos tal cual está
            textoCifrado += char;
        }
    }
    return textoCifrado;
}
