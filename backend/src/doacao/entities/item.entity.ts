// item.entity.ts (modificado)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Categoria } from "./categoria.entity";
import { ItemDoacao } from "./itemDoacao.entity";
import { NecessidadeCampanha } from "../../instituicao/entities/necessidadeCampanha.entity";

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
  
  @Column({ nullable: true })
  imagemUrl: string;
  
  @ManyToOne(() => Categoria, categoria => categoria.itens)
  categoria: Categoria;

  @OneToMany(() => ItemDoacao, itemDoacao => itemDoacao.item)
  itensDoacoes: ItemDoacao[];
  
  @OneToMany(() => NecessidadeCampanha, necessidadeCampanha => necessidadeCampanha.item)
  necessidadesCampanhas: NecessidadeCampanha[];
}