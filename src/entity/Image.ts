import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  idEspecie: number;
}