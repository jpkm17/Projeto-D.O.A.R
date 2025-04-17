import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne, CreateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Endereco } from "src/endereco/entities/endereco.entity";
import { Doacao } from "src/doacao/entities/doacao.entity";
import { Necessidade } from "./necessidade.entity";

@Entity('instituicao')
export class Instituicao {
    @PrimaryGeneratedColumn()
    id_instituicao: number;

    @Column({ length: 100 })
    nome_fantasia: string;

    @Column({ length: 100, nullable: true })
    razao_social: string;

    @Column({ length: 18, unique: true })
    cnpj: string;

    @Column({ type: "text", nullable: true })
    descricao: string;

    @Column({ length: 255, nullable: true })
    areas_atuacao: string;

    @Column({ length: 50, nullable: true })
    capacidade_recepcao: string;

    @Column({ length: 100, nullable: true })
    horario_funcionamento: string;

    @CreateDateColumn({ type: 'timestamp' }) //quando for registrar no banco,ele salva a data do cadastro
    creationDate: Date;

    @Column({ default: true })
    ativo: boolean;

    @ManyToOne(() => Usuario, usuario => usuario.instituicoesAdministradas)
    administrador: Usuario;

    @OneToOne(() => Endereco)
    @JoinColumn({name: 'endereco_id'})
    endereco: Endereco;

    @OneToMany(() => Necessidade, necessidade => necessidade.instituicao)
    necessidades: Necessidade[];

    @OneToMany(() => Doacao, doacao => doacao.instituicao)
    doacoesRecebidas: Doacao[];
}