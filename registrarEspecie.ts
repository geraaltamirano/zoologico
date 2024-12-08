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
async function manejarEnvioFormulario(event: Event): Promise<void> {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

   


    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const reinoInput = document.getElementById('reino') as HTMLInputElement;
    const filoInput = document.getElementById('filo') as HTMLInputElement;

    const claseInput = document.getElementById('clase') as HTMLInputElement;
    const ordenInput = document.getElementById('orden') as HTMLInputElement;
    const familiaInput = document.getElementById('familia') as HTMLInputElement;

    const generoInput = document.getElementById('genero') as HTMLInputElement;
    const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
    const ecosistemaInput = document.getElementById('ecosistema') as HTMLInputElement;


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
        
    try{
        const response = await  fetch('http://127.0.0.1:3000/guardar-especie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', 
            body: JSON.stringify({ nombre, reino,filo, clase, orden, familia,genero,descripcion,ecosistema })
        });
        if (!response.ok) {
            mostrarMensaje(`¡Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte`, 'error');
        }
        const data = await response.json();
          var json = JSON.parse(JSON.stringify(data, null, 2));

        const subirImagen = document.getElementById('subirImagen') as HTMLDivElement;
        subirImagen.style.display = 'block';
        const idEspecie = document.getElementById('idEspecie') as HTMLInputElement;
        idEspecie.value=json['id'];
        mostrarMensaje(`¡Registro exitoso! Nombre: ${nombre}  ${reino}  ${filo}  ${orden}`, 'exito') ;

       
    }catch(error){ 
        mostrarMensaje(`¡Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte`, 'error');
    }



}
// Función para mostrar un mensaje al usuario--no se ocupa
function guardarImagen(event: Event): void  {
    event.preventDefault();
    const fileInput = document.getElementById('imagen') as HTMLInputElement;;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        const idInput = document.getElementById('idEspecie') as HTMLInputElement;
        const id = idInput.value.trim();
        formData.append('image', file);
        formData.append('idEspecie', id);
        fetch('http://3.133.141.100:3000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            mode: 'cors', 
            body: formData
        })
        .then(response => response.json())
        .catch(error => mostrarMensaje(`¡Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte`, 'error'));
    }
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
