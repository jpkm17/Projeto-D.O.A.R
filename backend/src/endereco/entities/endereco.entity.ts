import { Instituicao } from "src/instituicao/entities/instituicao.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity('endereco')
export class Endereco {
    @PrimaryGeneratedColumn()
    id_endereco: number;

    @Column({ length: 9 })
    cep: string;

    @Column({ length: 100 })
    logradouro: string;

    @Column({ length: 10})
    numero: string;

    @Column({ length: 50})
    complemento: string;

    @Column({ length: 50 })
    bairro: string;

    @Column({ length: 50 })
    cidade: string;

    @Column({ length: 2 })
    estado: string;
}