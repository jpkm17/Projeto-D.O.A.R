import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, BeforeInsert, JoinColumn, OneToOne } from "typeorm";
import { Instituicao } from "../../instituicao/entities/instituicao.entity";
import { Doacao } from "../../doacao/entities/doacao.entity";
import { hashSync } from 'bcrypt';
import { Endereco } from "src/endereco/entities/endereco.entity";

// Corrigido: Adicionado export
export enum UserRole {
  ADMIN_SISTEMA = "admin_sistema",
  ADMIN_INST = "admin_instituicao",
  DOADOR = "doador", //usuario comum
  RECEPTOR = "receptor" //Membro instituicao
}

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
    enum: UserRole,
    default: UserRole.DOADOR, // por padrão esse usuario é doador
  })
  tipo: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;

  @OneToMany(() => Instituicao, instituicao => instituicao.administrador)
  instituicoesAdministradas: Instituicao[];

  @OneToMany(() => Doacao, doacao => doacao.doador)
  doacoes: Doacao[];

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10);
  }
}