import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Endereco } from './endereco.entity';

@Entity('DOACAO')
export class Doacao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('json')
  itens: string;

  @Column('float', { default: 0 })
  valor: number;

  @ManyToOne(() => Usuario, (user) => user.doacao)
  usuario: Usuario;

  // @ManyToOne(() => Endereco, (endereco)=> endereco.doacao)
  // enderecoEntrega: Endereco;
}