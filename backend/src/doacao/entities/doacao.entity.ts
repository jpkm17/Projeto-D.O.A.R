// doacao.entity.ts (modificado)
import { Instituicao } from "src/instituicao/entities/instituicao.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemDoacao } from "./itemDoacao.entity";
import { Campanha } from "src/instituicao/entities/campanha.entity";
import { FormaPagamento } from "./formaPagamento.entity";

@Entity()
export class Doacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data: Date;

  @Column({ nullable: true })
  observacao: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  valorTotal: number;

  @Column({ default: "pendente", nullable: true })
  status: string; // pendente, confirmada, entregue, cancelada

  @Column({ nullable: true })
  comprovantePagamento: string;

  @Column({ nullable: true })
  comprovanteDoacaoUrl: string;

  @ManyToOne(() => Usuario, usuario => usuario.doacoes)
  doador: Usuario;

  @ManyToOne(() => Instituicao, instituicao => instituicao.doacoesRecebidas)
  instituicao: Instituicao;

  @ManyToOne(() => Campanha, campanha => campanha.doacoes)
  campanha: Campanha;

  // @ManyToOne(() => FormaPagamento)
  // formaPagamento: FormaPagamento;

  @Column({ length: 20 })
  formaPagamento: string;

  @OneToMany(() => ItemDoacao, itemDoacao => itemDoacao.doacao, { cascade: true })
  itensDoacao: ItemDoacao[];
}