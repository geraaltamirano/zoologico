var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Función para manejar el envío del formulario
function manejarEnvioFormulario(event) {
    return __awaiter(this, void 0, void 0, function () {
        var nombreInput, reinoInput, filoInput, claseInput, ordenInput, familiaInput, generoInput, descripcionInput, ecosistemaInput, nombre, reino, filo, clase, orden, familia, genero, descripcion, ecosistema, especie, response, data, json, subirImagen, idEspecie, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault(); // Prevenir el envío por defecto del formulario
                    nombreInput = document.getElementById('nombre');
                    reinoInput = document.getElementById('reino');
                    filoInput = document.getElementById('filo');
                    claseInput = document.getElementById('clase');
                    ordenInput = document.getElementById('orden');
                    familiaInput = document.getElementById('familia');
                    generoInput = document.getElementById('genero');
                    descripcionInput = document.getElementById('descripcion');
                    ecosistemaInput = document.getElementById('ecosistema');
                    nombre = nombreInput.value.trim();
                    reino = reinoInput.value.trim();
                    filo = filoInput.value.trim();
                    clase = claseInput.value.trim();
                    orden = ordenInput.value.trim();
                    familia = familiaInput.value.trim();
                    genero = generoInput.value.trim();
                    descripcion = descripcionInput.value.trim();
                    ecosistema = ecosistemaInput.value.trim();
                    // Verificar que los campos no estén vacíos
                    if (!nombre || !reino || !filo || !orden || !familia || !genero || !clase || !descripcion || !ecosistema) {
                        mostrarMensaje('Por favor, complete todos los campos.', 'error');
                        return [2 /*return*/];
                    }
                    especie = {
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://127.0.0.1:3000/guardar-especie', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            mode: 'cors',
                            body: JSON.stringify({ nombre: nombre, reino: reino, filo: filo, clase: clase, orden: orden, familia: familia, genero: genero, descripcion: descripcion, ecosistema: ecosistema })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        mostrarMensaje("\u00A1Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte", 'error');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    json = JSON.parse(JSON.stringify(data, null, 2));
                    subirImagen = document.getElementById('subirImagen');
                    subirImagen.style.display = 'block';
                    idEspecie = document.getElementById('idEspecie');
                    idEspecie.value = json['id'];
                    mostrarMensaje("\u00A1Registro exitoso! Nombre: ".concat(nombre, "  ").concat(reino, "  ").concat(filo, "  ").concat(orden), 'exito');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    mostrarMensaje("\u00A1Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte", 'error');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Función para mostrar un mensaje al usuario--no se ocupa
function guardarImagen(event) {
    event.preventDefault();
    var fileInput = document.getElementById('imagen');
    ;
    if (fileInput.files && fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var formData = new FormData();
        var idInput = document.getElementById('idEspecie');
        var id = idInput.value.trim();
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
            .then(function (response) { return response.json(); })
            .catch(function (error) { return mostrarMensaje("\u00A1Error, hubo un problema al registrar la especie, por favor contacte al equipo de soporte", 'error'); });
    }
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
