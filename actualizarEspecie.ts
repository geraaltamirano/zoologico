// Definimos una interfaz para los datos del usuario
interface Especie {
    nombre: string;
    reino: string;
    filo: string;

    clase: string;
    orden: string;
    familia: string;

    genero: string;
    descripcion: string;
    ecosistema: string;

    
}

// Función para manejar el envío del formulario
function manejarEnvioFormulario(event: Event): void {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    const idInput = document.getElementById('id') as HTMLInputElement;
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const reinoInput = document.getElementById('reino') as HTMLInputElement;
    const filoInput = document.getElementById('filo') as HTMLInputElement;

    const claseInput = document.getElementById('clase') as HTMLInputElement;
    const ordenInput = document.getElementById('orden') as HTMLInputElement;
    const familiaInput = document.getElementById('familia') as HTMLInputElement;

    const generoInput = document.getElementById('genero') as HTMLInputElement;
    const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
    const ecosistemaInput = document.getElementById('ecosistema') as HTMLInputElement;

    const id = idInput.value.trim();
    const nombre = nombreInput.value.trim();
    const reino = reinoInput.value.trim();
    const filo = filoInput.value.trim();

    const clase = claseInput.value.trim();
    const orden = ordenInput.value.trim();
    const familia = familiaInput.value.trim();

    const genero = generoInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const ecosistema = ecosistemaInput.value.trim();


    // Verificar que los campos no estén vacíos
    if (!nombre || !reino || !filo || !orden || !familia || !genero || !clase || !descripcion || !ecosistema  ) {
        mostrarMensaje('Por favor, complete todos los campos.', 'error');
        return;
    }

    // Crear el objeto de usuario con los datos del formulario
    const especie: Especie = {
        nombre : nombre,
        reino : reino,
        filo : filo,
        clase : clase,
        orden : orden,
        familia : familia,
        genero : genero,
        descripcion : descripcion,
        ecosistema : ecosistema
    };

        // Crear el objeto de usuario con los datos del formulario
        
    
        fetch('http://127.0.0.1:3000/especies/actualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', 
            body: JSON.stringify({ id,nombre, reino,filo, clase, orden, familia,genero,descripcion,ecosistema })
        })
        .then(response => response.json())
        .then(data => mostrarMensaje(`¡Registro exitoso! Especie ${nombre}`, 'exito')) // Mostrar los datos de especie en el mensaje
        .catch(error => mostrarMensaje(`¡Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte`, 'error'));
}

// Función para mostrar un mensaje al usuario
function mostrarMensaje(mensaje: string, tipo: 'exito' | 'error'): void {
    const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;
    
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
