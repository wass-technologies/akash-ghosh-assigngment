import { Account } from 'src/account/entities/account.entity';
//import { CallHistory } from 'src/call-history/entities/call-history.entity';
//import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
//import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
//import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
import { CompanyStatus } from 'src/enum';
//import { Leed } from 'src/leed/entities/leed.entity';
import { RatingFeedback } from 'src/rating-feedback/entities/rating-feedback.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CompanyDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  profileId: number;

  // @Column({ type: 'varchar', length: 100, nullable: true })
  // minPrice: string;

  // @Column({ type: 'varchar', length: 100, nullable: true })
  // maxPrice: string;

  @Column({ type: 'varchar', length: 55, nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;
  
  @Column({ type: 'varchar', length: 55, nullable: true })
  businessName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  area: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pincode: string;

  // @Column({ type: 'varchar', length: 500, nullable: true })
  // businessDesc: string;

  

  @Column({ type: 'varchar', length: 255, nullable: true })
  fbLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wpLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instaLink: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  callNumber: string;

  @Column({ type: 'enum', enum: CompanyStatus, default: CompanyStatus.PENDING })
  status: CompanyStatus;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Account, (account) => account.companyDetail, { onDelete: 'CASCADE' })
  account: Account;


  // @OneToMany(
  //   () => CompanySchedule,
  //   (companySchedule) => companySchedule.companyDetail,
  // )
  // companySchedule: CompanySchedule[];

  @OneToMany(
    () => RatingFeedback,
    (ratingFeedback) => ratingFeedback.companyDetail,
  )
  ratingFeedback: RatingFeedback[];

  // @OneToMany(() => Leed, (leed) => leed.companyDetail)
  // leed: Leed[];
  
  // @OneToMany(() => CallHistory, (callHistory) => callHistory.companyDetail)
  // callHistory: CallHistory[];
}
