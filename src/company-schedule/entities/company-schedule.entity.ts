import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
import { DayList } from 'src/enum';
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
export class CompanySchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DayList, default: DayList.MONDAY })
  name: DayList;

  @Column({ type: 'time', nullable: true })
  time_start: Date;

  @Column({ type: 'time', nullable: true })
  time_end: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'uuid', nullable: true })
  companyDetailId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(
  //   () => CompanyDetail,
  //   (companyDetail) => companyDetail.companySchedule,
  //   {
  //     cascade: true,
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //   },
  // )
  // companyDetail: CompanyDetail[];

  // @OneToMany(() => Period, (period) => period.companySchedule)
  // period: Period[];
}
