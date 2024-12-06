// Definimos una interfaz para los datos del usuario
interface Usuario {
    nombre: string;
    apellidop: string;
    apellidom: string;
    usuario: string;
    clave: string;
    cargo: string;
    rol: string;
}

// Función para manejar el envío del formulario
function manejarEnvioFormulario(event: Event): void {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidopInput = document.getElementById('apellidop') as HTMLInputElement;
    const apellidomInput = document.getElementById('apellidom') as HTMLInputElement;
    const usuarioInput = document.getElementById('usuario') as HTMLInputElement;
    const claveInput = document.getElementById('clave') as HTMLInputElement;
    const cargoInput = document.getElementById('cargo') as HTMLInputElement;
    const rolInput = document.getElementById('rol') as HTMLInputElement;

    const nombre = nombreInput.value.trim();
    const apellidop = apellidopInput.value.trim();
    const apellidom = apellidomInput.value.trim();
    const clavedesc = claveInput.value.trim();
    const cargo = cargoInput.value.trim();
    const usuariof = usuarioInput.value.trim();
    const rol = rolInput.value.trim();

    // Verificar que los campos no estén vacíos
    if (!nombre || !apellidop || !apellidom || !usuariof || !clavedesc || !cargo || !rol ) {
        mostrarMensaje('Por favor, complete todos los campos.', 'error');
        return;
    }
    //Cifrar password
    const desplazamiento = 5;
    const clave = cifrarTextoCesar(clavedesc, desplazamiento);

    // Crear el objeto de usuario con los datos del formulario
    const usuario: Usuario = {
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        clave: clave,
        cargo: cargo,
        usuario: usuariof,
        rol:rol
    };

    fetch('http://127.0.0.1:3000/guardar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors', 
        body: JSON.stringify({ nombre, apellidop,apellidom, clave, cargo, usuariof,rol })
    })
    .then(response => response.json())
    .then(data => mostrarMensaje(`¡Registro exitoso! Nombre: ${nombre}  ${apellidop}  ${apellidom} con la clave:  ${clave}`, 'exito')) // Mostrar los datos del usuario en el mensaje
    .catch(error => mostrarMensaje(`¡Error, hubo un problema al registrar el usuario, por favor contacte al equipo de soporte`, 'error'));

   
    
}

// Función para mostrar un mensaje al usuario
function mostrarMensaje(mensaje: string, tipo: 'exito' | 'error'): void {
    const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;
    mensajeDiv.textContent = mensaje;

    // Establecer el estilo según el tipo de mensaje
    if (tipo === 'exito') {
        mensajeDiv.style.color = 'green';
    } else {
        mensajeDiv.style.color = 'red';
    }
}

// Asociar el evento del formulario con la función de manejo
const formulario = document.getElementById('registroForm') as HTMLFormElement;
formulario.addEventListener('submit', manejarEnvioFormulario);

function cifrarTextoCesar(texto: string, desplazamiento: number): string {
    let textoCifrado = '';
    
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        
        // Si es una letra mayúscula
        if (char >= 'A' && char <= 'Z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de A-Z
            textoCifrado += String.fromCharCode(((char.charCodeAt(0) - 65 + desplazamiento) % 26) + 65);
        }
        // Si es una letra minúscula
        else if (char >= 'a' && char <= 'z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de a-z
            textoCifrado += String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26) + 97);
        } else {
            // Si no es una letra, lo dejamos tal cual está
            textoCifrado += char;
        }
    }

    return textoCifrado;
}
