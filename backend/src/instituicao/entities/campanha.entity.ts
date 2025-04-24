// campanha.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Instituicao } from "./instituicao.entity";
import { NecessidadeCampanha } from "./necessidadeCampanha.entity";
import { Doacao } from "src/doacao/entities/doacao.entity";

@Entity()
export class Campanha {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  titulo: string;
  
  @Column({ type: "text" })
  descricao: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  dataCriacao: Date;
  
  @Column({ nullable: true })
  dataInicio: Date;
  
  @Column({ nullable: true })
  dataFim: Date;
  
  @Column({ default: true })
  ativa: boolean;
  
  @Column({ nullable: true })
  imagemUrl: string;
  
  @ManyToOne(() => Instituicao, instituicao => instituicao.campanhas)
  instituicao: Instituicao;
  
  @OneToMany(() => NecessidadeCampanha, necessidadeCampanha => necessidadeCampanha.campanha, { cascade: true })
  necessidadesCampanha: NecessidadeCampanha[];

  @OneToMany(() => Doacao, doacao => doacao.campanha)
  doacoes: Doacao[];
}