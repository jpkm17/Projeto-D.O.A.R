import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Doacao } from '../doacao.entity';
import { hashSync } from 'bcrypt';
import { Instituicao } from '../instituicao.entity';

export enum UserRole {
  ADMIN = "admin",
  COMUM = "comum",
  AFILIADO = "afiliado"
}

@Entity('USUARIO') 
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 15, nullable: true })
  telefone2: string;

  @Column({ length: 60, })
  email: string;

  @Column({ length: 40, nullable: true })
  senha: string;

  @OneToMany(() => Doacao, (doacao) => doacao.usuario)
  doacao: Doacao[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.COMUM,
  })
  tipoConta: UserRole;

  @OneToMany(()=> Instituicao, (inst)=> inst.usuario)
  instituicao: Instituicao;

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10);
  }

}