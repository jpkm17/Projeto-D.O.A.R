// Categoria.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ default: true })
  ativa: boolean;

  @OneToMany(() => Item, item => item.categoria)
  itens: Item[];
}