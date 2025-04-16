import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('endereco')
export class Endereco {
    @PrimaryGeneratedColumn()
    id_endereco: number;

    @Column({ length: 9 })
    cep: string;

    @Column({ length: 100 })
    logradouro: string;

    @Column({ length: 10, nullable: true })
    numero: string;

    @Column({ length: 50, nullable: true })
    complemento: string;

    @Column({ length: 50 })
    bairro: string;

    @Column({ length: 50 })
    cidade: string;

    @Column({ length: 2 })
    estado: string;
}