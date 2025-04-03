import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('ALIMENTOS')
export class Alimento {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({length: 30, nullable: false })
  nome: string;

  @Column({type: 'text', nullable: true })
  descricao: string;

  // @OneToMany(() => ItemSacola, item => item.alimento)
  // itensSacola: ItemSacola[];
}