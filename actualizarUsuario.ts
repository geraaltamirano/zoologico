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
    const idInput = document.getElementById('id') as HTMLInputElement;
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidopInput = document.getElementById('apellidop') as HTMLInputElement;
    const apellidomInput = document.getElementById('apellidom') as HTMLInputElement;
    const usuarioInput = document.getElementById('usuario') as HTMLInputElement;
    const claveInput = document.getElementById('clave') as HTMLInputElement;
    const cargoInput = document.getElementById('cargo') as HTMLInputElement;
    const rolInput = document.getElementById('rol') as HTMLInputElement;

    const id = idInput.value.trim();
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
        clave: clavedesc,
        cargo: cargo,
        usuario: usuariof,
        rol:rol
    };

    fetch('http://127.0.0.1:3000/usuarios/actualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors', 
        body: JSON.stringify({ id,nombre, apellidop,apellidom, clavedesc, cargo, usuariof,rol })
    })
    .then(response => response.json())
    .then(data => mostrarMensaje(`Actualización exitosa! Usuario: ${usuariof} `, 'exito')) // Mostrar los datos del usuario en el mensaje
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
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let codigo = texto.charCodeAt(i);
        
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


