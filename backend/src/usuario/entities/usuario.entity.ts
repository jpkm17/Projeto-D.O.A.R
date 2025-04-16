import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
// import { Instituicao } from "./Instituicao";
// import { Doacao } from "./Doacao";
// import { UsuarioInstituicao } from "./UsuarioInstituicao";

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  senha: string;

  @Column({ length: 14, unique: true })
  cpf: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ 
    type: "enum", 
    enum: ["doador", "receptor", "administrador"] 
  })
  tipo: string;

  @CreateDateColumn({ type: 'timestamp' }) //quando registrar no banco retorna a data do cadastro
  creationDate: Date; // Tornado opcional

  // @OneToMany(() => Instituicao, (instituicao) => instituicao.responsavel)
  // instituicoes: Instituicao[];

  // @OneToMany(() => Doacao, (doacao) => doacao.doador)
  // doacoes: Doacao[];

  // @OneToMany(() => UsuarioInstituicao, (vinculo) => vinculo.usuario)
  // vinculos: UsuarioInstituicao[];
}