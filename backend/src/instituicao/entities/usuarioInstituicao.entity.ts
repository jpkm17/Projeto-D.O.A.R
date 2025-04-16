import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class UsuarioInstituicao {
    @PrimaryGeneratedColumn()
    id_relacao: number;

    // @ManyToOne(() => Usuario, (usuario) => usuario.vinculos)
    // @JoinColumn({ name: "id_usuario" })
    // usuario: Usuario;

    // @ManyToOne(() => Instituicao, (instituicao) => instituicao.vinculos)
    // @JoinColumn({ name: "id_instituicao" })
    // instituicao: Instituicao;

    @Column({ type: "enum", enum: ["responsavel", "funcionario", "voluntario"] })
    tipo_vinculo: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_vinculo: Date;
}