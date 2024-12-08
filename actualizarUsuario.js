// Función para manejar el envío del formulario
function manejarEnvioFormulario(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    var idInput = document.getElementById('id');
    var nombreInput = document.getElementById('nombre');
    var apellidopInput = document.getElementById('apellidop');
    var apellidomInput = document.getElementById('apellidom');
    var usuarioInput = document.getElementById('usuario');
    var claveInput = document.getElementById('clave');
    var cargoInput = document.getElementById('cargo');
    var rolInput = document.getElementById('rol');
    var id = idInput.value.trim();
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
        clave: clavedesc,
        cargo: cargo,
        usuario: usuariof,
        rol: rol
    };
    fetch('http://127.0.0.1:3000/usuarios/actualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ id: id, nombre: nombre, apellidop: apellidop, apellidom: apellidom, clavedesc: clavedesc, cargo: cargo, usuariof: usuariof, rol: rol })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) { return mostrarMensaje("Actualizaci\u00F3n exitosa! Usuario: ".concat(usuariof, " "), 'exito'); }) // Mostrar los datos del usuario en el mensaje
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
    var resultado = '';
    for (var i = 0; i < texto.length; i++) {
        var char = texto[i];
        var codigo = texto.charCodeAt(i);
        // Cifrado de letras mayúsculas
        if (codigo >= 65 && codigo <= 90) {
            char = String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
        }
        // Cifrado de letras minúsculas
        else if (codigo >= 97 && codigo <= 122) {
            char = String.fromCharCode(((codigo - 97 + desplazamiento) % 26) + 97);
        }
        resultado += char;
    }
    return resultado;
}
