import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { Doacao } from "./doacao.entity";

@Entity()
export class ItemDoacao {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  quantidade: number;
  
  @Column("decimal", { precision: 10, scale: 2 })
  valorUnitario: number;
  
  @Column({ default: false })
  ehDoacaoMonetaria: boolean;
  
  @ManyToOne(() => Doacao, doacao => doacao.itensDoacao)
  doacao: Doacao;
  
  @ManyToOne(() => Item, item => item.itensDoacoes)
  item: Item;
}