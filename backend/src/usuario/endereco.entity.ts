import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ENDERECO')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  rua: string;
  
  @Column({ length: 50 })
  bairro: string;

  @Column({type: 'int' })
  numero: number;

  @Column({ length: 50,  })
  cidade: string;

  @Column({ length: 30,  })
  uf: string;

  @Column({ length: 8, nullable: true })
  cep: string;
}