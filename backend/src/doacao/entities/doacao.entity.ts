import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Doacao {
    @PrimaryGeneratedColumn()
    id_doacao: number;

    // @ManyToOne(() => Usuario, (usuario) => usuario.doacoes)
    // @JoinColumn({ name: "id_doador" })
    // doador: Usuario;

    // @ManyToOne(() => Instituicao, (instituicao) => instituicao.doacoes)
    // @JoinColumn({ name: "id_instituicao" })
    // instituicao: Instituicao;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_doacao: Date;

    @Column({ type: "timestamp", nullable: true })
    data_agendamento: Date;

    @Column({ type: "enum", enum: ["pendente", "agendada", "realizada", "cancelada"], default: "pendente" })
    status: string;

    @Column({ type: "text", nullable: true })
    observacoes: string;

    // @OneToMany(() => ItemDoacao, (item) => item.doacao, { cascade: true })
    // itens: ItemDoacao[];
}