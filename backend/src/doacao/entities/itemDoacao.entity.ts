import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class ItemDoacao {
    @PrimaryGeneratedColumn()
    id_item: number;

    // @ManyToOne(() => Doacao, (doacao) => doacao.itens, { onDelete: "CASCADE" })
    // @JoinColumn({ name: "id_doacao" })
    // doacao: Doacao;

    @Column({ length: 50 })
    tipo_alimento: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    quantidade: number;

    @Column({ length: 20 })
    unidade_medida: string;

    @Column({ type: "date", nullable: true })
    validade: Date;

    @Column({ default: true })
    perecivel: boolean;
}