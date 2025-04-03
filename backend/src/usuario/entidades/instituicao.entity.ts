import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('INSTITUICAO') // Especifica o nome da tabela no banco
export class Instituicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'date', nullable: true })
  dataFundacao: Date;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 50 })
  email: string;

  @Column({type: 'text'})
  descricao: string;

  @ManyToOne(() => Usuario, (user) => user.instituicao)
  usuario: Usuario;
}