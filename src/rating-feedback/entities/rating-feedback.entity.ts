import { Account } from 'src/account/entities/account.entity';
import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RatingFeedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'int', default: 0 })
  rating: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @Column({ type: 'uuid', nullable: true })
  companyDetailId: string;

  @ManyToOne(() => Account, (account) => account.ratingFeedback, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: Account[];
 
  @ManyToOne(() => CompanyDetail, (companyDetail) => companyDetail.ratingFeedback, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  companyDetail: CompanyDetail[];
}
