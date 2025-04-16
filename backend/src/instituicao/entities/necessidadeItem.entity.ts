import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class NecessidadeInstituicao {
    @PrimaryGeneratedColumn()
    id_necessidade: number;

    // @ManyToOne(() => Instituicao, (instituicao) => instituicao.necessidades)
    // @JoinColumn({ name: "id_instituicao" })
    // instituicao: Instituicao;

    @Column({ length: 50 })
    tipo_alimento: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    quantidade_desejada: number;

    @Column({ length: 20, nullable: true })
    unidade_medida: string;

    @Column({ type: "enum", enum: ["baixa", "media", "alta"], nullable: true })
    prioridade: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_cadastro: Date;

    @Column({ default: true })
    ativa: boolean;
}