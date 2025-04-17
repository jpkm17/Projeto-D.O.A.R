import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormaPagamento {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column({ nullable: true })
  descricao: string;
  
  @Column({ default: true })
  ativa: boolean;
  
  @Column({ nullable: true })
  chavePix: string;
  
  @Column({ nullable: true })
  contaBancaria: string;
  
  @Column({ nullable: true })
  instrucoes: string;
}