import { Account } from 'src/account/entities/account.entity';
import { Faq } from 'src/faqs/entities/faq.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DefaultStatus } from '../../enum';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_domain: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  admin_domain: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  mobile_domain: string;

  @Column({type: 'text', nullable: true})
  logo: string;

  @Column({type: 'text', nullable: true})
  logoPath: string;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.PENDING })
  status: DefaultStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
