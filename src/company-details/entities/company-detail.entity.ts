import { Account } from 'src/account/entities/account.entity';
import { RatingFeedback } from 'src/rating-feedback/entities/rating-feedback.entity';
import { CompanyStatus } from 'src/enum';
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


  @Column({ type: 'varchar', length: 55, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
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


  // @Column({ type: 'text', nullable: true })
  // profile: string;

  // @Column({ type: 'text', nullable: true })
  // profileName: string;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // fbLink: string;

  // // @Column({ type: 'varchar', length: 255, nullable: true })
  // // wpLink: string;

  // // @Column({ type: 'varchar', length: 255, nullable: true })
  // // instaLink: string;

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

  @ManyToOne(() => Account, (account) => account.companyDetail, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  account: Account[];

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
