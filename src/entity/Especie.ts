import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Especie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    reino: string;

    @Column()
    filo: string;

    @Column()
    clase: string;

    @Column()
    orden: string;

    @Column()
    familia: string;

    @Column()
    genero: string;

    @Column()
    descripcion: string;

    @Column()
    ecosistema: string;
}
