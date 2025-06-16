// necessidadeCampanha.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Campanha } from "./campanha.entity";
import { Item } from "../../doacao/entities/item.entity";

@Entity()
export class NecessidadeCampanha {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  quantidadeNecessaria: number;
  
  @Column({ default: 0 })
  quantidadeRecebida: number;
  
  @Column({ nullable: true })
  observacao: string;
  
  @ManyToOne(() => Campanha, campanha => campanha.necessidadesCampanha)
  @JoinColumn()
  campanha: Campanha;
  
  @ManyToOne(() => Item, item => item.necessidadesCampanhas)
  item: Item;
}