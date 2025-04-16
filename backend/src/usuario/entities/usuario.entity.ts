import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt';

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


  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.COMUM,
  })
  tipoConta: UserRole;
  

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10);
  }

}