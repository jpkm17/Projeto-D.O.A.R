import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";


@Entity()
export class Instituicao {
    @PrimaryGeneratedColumn()
    id_instituicao: number;

    // @ManyToOne(() => Usuario, (usuario) => usuario.instituicoes)
    // @JoinColumn({ name: "id_usuario_responsavel" })
    // responsavel: Usuario;

    // @OneToOne(() => Endereco, { cascade: true })
    // @JoinColumn({ name: "id_endereco" })
    // endereco: Endereco;

    @Column({ length: 100 })
    nome_fantasia: string;

    @Column({ length: 100, nullable: true })
    razao_social: string;

    @Column({ length: 18, unique: true, nullable: true })
    cnpj: string;

    @Column({ type: "text", nullable: true })
    descricao: string;

    @Column({ length: 255, nullable: true })
    areas_atuacao: string;

    @Column({ length: 50, nullable: true })
    capacidade_recepcao: string;

    @Column({ length: 100, nullable: true })
    horario_funcionamento: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_cadastro: Date;

    @Column({ default: true })
    ativo: boolean;

    @Column({ type: "timestamp", nullable: true })
    data_aprovacao: Date;

    @Column({ default: false })
    aprovado: boolean;

    // @OneToMany(() => Doacao, (doacao) => doacao.instituicao)
    // doacoes: Doacao[];

    // @OneToMany(() => NecessidadeInstituicao, (necessidade) => necessidade.instituicao)
    // necessidades: NecessidadeInstituicao[];

    // @OneToMany(() => UsuarioInstituicao, (vinculo) => vinculo.instituicao)
    // vinculos: UsuarioInstituicao[];
}