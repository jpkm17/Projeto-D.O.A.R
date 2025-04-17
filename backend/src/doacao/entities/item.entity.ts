import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Categoria } from "./categoria.entity";
import { Necessidade } from "src/instituicao/entities/necessidade.entity";
import { ItemDoacao } from "./itemDoacao.entity";


@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nome: string;
  
  @Column({ nullable: true })
  descricao: string;
  
  @Column("decimal", { precision: 10, scale: 2 })
  valorReferencia: number;
  
  @Column({ nullable: true })
  unidadeMedida: string;
  
  @Column({ default: true })
  ativo: boolean;
  
  @ManyToOne(() => Categoria, categoria => categoria.itens)
  categoria: Categoria;
  
  @OneToMany(() => Necessidade, necessidade => necessidade.item)
  necessidades: Necessidade[];
  
  @OneToMany(() => ItemDoacao, itemDoacao => itemDoacao.item)
  itensDoacoes: ItemDoacao[];
}