import express, { Request, Response } from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Usuario } from './entity/Usuario';
import { Especie } from './entity/Especie';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const app = express();
const port = 3000;

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
        const { nombre, apellidop,apellidom, clave,cargo, usuariof, rol } = req.body;

        const usuario = new Usuario();
        usuario.nombre = nombre;
        usuario.apellidop = apellidop;
        usuario.apellidom = apellidom;
        usuario.clave = clave;
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
            res.status(200).json({ message: 'Especie guardada correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar el especie', error });
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

    


    // Iniciar servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });


}).catch(error => console.log(error));
