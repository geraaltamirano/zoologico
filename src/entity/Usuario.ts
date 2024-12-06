import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidop: string;

    @Column()
    apellidom: string;

    @Column()
    clave: string;

    @Column()
    cargo: string;

    @Column({ unique: true })
    usuariof: string;

    @Column()
    rol: string;
}
