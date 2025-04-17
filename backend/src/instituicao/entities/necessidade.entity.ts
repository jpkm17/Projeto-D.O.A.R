import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Instituicao } from "./instituicao.entity";
import { Item } from "../../doacao/entities/item.entity";

@Entity()
export class Necessidade {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  quantidade: number;
  
  @Column({ nullable: true })
  observacao: string;
  
  @Column({ default: true })
  ativa: boolean;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataCadastro: Date;
  
  @Column({ nullable: true })
  dataLimite: Date;
  
  @Column({ default: 0 })
  quantidadeRecebida: number;
  
  @ManyToOne(() => Instituicao, instituicao => instituicao.necessidades)
  instituicao: Instituicao;
  
  @ManyToOne(() => Item, item => item.necessidades)
  item: Item;
}