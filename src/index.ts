import express, { Request, Response } from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Usuario } from './entity/Usuario';
import { Especie } from './entity/Especie';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from 'multer';
import { Image } from './entity/Image';



const app = express();
const port = 3000;

// Configurar almacenamiento de Multer (para subir imágenes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directorio donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    },
  });
  const upload = multer({ storage: storage });

// Enable CORS first
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500','null'],
  }));

  
// Middleware
app.use(express.json());

// Conexión a la base de datos
createConnection().then( connection => {

    // Ruta para guardar usuario
    app.post('/guardar-usuario', async (req: Request, res: Response) => {
        const { id,nombre, apellidop,apellidom, clavedesc,cargo, usuariof, rol } = req.body;

        const usuario = new Usuario();
        usuario.nombre = nombre;
        usuario.apellidop = apellidop;
        usuario.apellidom = apellidom;
        usuario.clave = clavedesc;
        usuario.cargo = cargo;
        usuario.usuariof = usuariof;
        usuario.rol = rol;

        try {
            await connection.manager.save(usuario);
            res.status(200).json({ message: 'Usuario guardado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar el usuario', error });
        }
    });

    // Endpoint para actualizar un usuario
    app.post("/usuarios/actualizar", async (req: Request, res: Response) => {
        const { id,nombre, apellidop,apellidom, clavedesc,cargo, usuariof, rol } = req.body;

        const usuario = new Usuario();
        
        const usuarioRepository = connection.getRepository(Usuario);
        try {
        const usuario = await usuarioRepository.findOneBy({ usuariof });
        if (usuario) {
            usuario.nombre = nombre;
            usuario.apellidop = apellidop;
            usuario.apellidom = apellidom;
            usuario.clave = clavedesc;
            usuario.cargo = cargo;
            usuario.usuariof = usuariof;
            usuario.rol = rol;
            await usuarioRepository.save(usuario);
            res.status(200).json({ message: 'Usuario guardada correctamente' });

        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        } catch (error) {
        res.status(500).json({ message: "Error al consultar usuario",  error });
        }
    });

    // Ruta para guardar usuario
    app.post('/guardar-especie', async (req: Request, res: Response) => {
        const { nombre, reino,filo, clase,orden,familia, genero, descripcion,ecosistema } = req.body;

        const especie = new Especie();
        especie.nombre = nombre;
        especie.reino = reino;
        especie.filo = filo;
        especie.clase = clase;
        especie.orden = orden;
        especie.familia = familia;
        especie.genero = genero;
        especie.descripcion = descripcion;
        especie.ecosistema = ecosistema;

        try {
            await connection.manager.save(especie);
            res.status(200).json({ id: especie.id });
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar el especie', error });
        }
    });

     // Endpoint para actualizar especie
     app.post("/especies/actualizar", async (req: Request, res: Response) => {

        const { id,nombre, reino,filo, clase,orden,familia, genero, descripcion,ecosistema } = req.body;

        const especie = new Especie();
        const especieRepository = connection.getRepository(Especie);
        try {
        const especie = await especieRepository.findOneBy({ id });
        if (especie) {
            especie.nombre = nombre;
            especie.reino = reino;
            especie.filo = filo;
            especie.clase = clase;
            especie.orden = orden;
            especie.familia = familia;
            especie.genero = genero;
            especie.descripcion = descripcion;
            especie.ecosistema = ecosistema;
            await especieRepository.save(especie);
            res.status(200).json({ message: 'Especie guardada correctamente' });

        } else {
            res.status(404).json({ message: "Especie no encontrada" });
        }
        } catch (error) {
            res.status(500).json({ message: "Error al consultar especie",  error });
        }
    });

    // Endpoint para consultar un usuario
    app.get("/usuarios/:usuariof", async (req: Request, res: Response) => {
        const usuariof = req.params.usuariof;

        const usuarioRepository = connection.getRepository(Usuario);
        try {
        const usuario = await usuarioRepository.findOneBy({ usuariof });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        } catch (error) {
        res.status(500).json({ message: "Error al consultar usuario",  error });
        }
    });

    // Ruta de autenticación
    app.get("/auth/login/:usuariof/:clave", async (req: Request, res: Response) => {
        const usuariof = req.params.usuariof;
        const clave = req.params.clave;

        const usuarioRepository = connection.getRepository(Usuario);
        try {
             const usuario = await usuarioRepository.findOneBy({ usuariof,clave });
        if (usuario) {
            const newusuario = new Usuario();
            newusuario.rol = usuario.rol;
            
            res.json(newusuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        } catch (error) {
            res.status(500).json({ message: "Error al consultar usuario",  error });
        }
    });
    // Endpoint para consultar especie
    app.get("/especies/:nombre", async (req: Request, res: Response) => {
        const nombre = req.params.nombre;

        const especieRepository = connection.getRepository(Especie);
        try {
        const especie = await especieRepository.findOneBy({ nombre });
        if (especie) {
            res.json(especie);
        } else {
            res.status(404).json({ message: "Especie no encontrada" });
        }
        } catch (error) {
        res.status(500).json({ message: "Error al consultar especie",  error });
        }
    });

    app.get('/especies', async (req, res) => {
        const especies = await connection.getRepository(Especie).find();
        res.json(especies);
      });

      // Ruta para cargar una imagen
    app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
        try {
        const idEspecie = req.body.idEspecie;
        const image = new Image();
        image.filename = req.file?.filename ?? '';
        image.path = req.file?.path ?? '';
        image.idEspecie=Number(idEspecie);
        // Guardar en la base de datos
        const imageRepository = connection.getRepository(Image);
        await imageRepository.save(image);
    
        res.status(200).json({ message: 'Imagen subida correctamente', image });
        } catch (error) {
        res.status(500).json({ message: 'Error al subir la imagen', error });
        }
    });
  
  // Servir archivos estáticos
  app.use('/uploads', express.static('uploads'));

     // Endpoint para consultar un usuario
     app.get("/imagen/:idEspecie", async (req: Request, res: Response) => {
        const idEspecieS = req.params.idEspecie;
        const idEspecie = Number(idEspecieS);
        const imageRepository = connection.getRepository(Image);
        try {
        const image = await imageRepository.findOneBy({ idEspecie });
        if (image) {
            res.json(image);
        } else {
            res.status(404).json({ message: "Imagen no encontrado" });
        }
        } catch (error) {
        res.status(500).json({ message: "Error al consultar imagen",  error });
        }
    });


    // Iniciar servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });


}).catch(error => console.log(error));
