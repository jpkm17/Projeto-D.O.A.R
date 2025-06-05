import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne, CreateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Endereco } from "src/endereco/entities/endereco.entity";
import { Doacao } from "src/doacao/entities/doacao.entity";
import { Campanha } from "./campanha.entity";

@Entity('instituicao')
export class Instituicao {
    @PrimaryGeneratedColumn()
    id_instituicao: number;

    @Column({ length: 100, nullable: true })
    nome: string;

    @Column({ length: 100, nullable: true })
    nome_fantasia: string;

    @Column({ length: 100, nullable: true })
    razao_social: string;

    @Column({ length: 18, unique: true })
    cnpj: string;

    @Column({ type: "text"})
    descricao: string;

    @CreateDateColumn({ type: 'timestamp' }) //quando for registrar no banco,ele salva a data do cadastro
    creationDate: Date;

    @ManyToOne(() => Usuario, usuario => usuario.instituicoesAdministradas)
    @JoinColumn()
    administrador: Usuario;
    
    @OneToOne(() => Endereco)
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco;
    
    @OneToMany(() => Doacao, doacao => doacao.instituicao)
    doacoesRecebidas: Doacao[];
    
    @OneToMany(() => Campanha, campanha => campanha.instituicao)
    campanhas: Campanha[];
}