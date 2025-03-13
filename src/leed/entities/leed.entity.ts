// import { Account } from 'src/account/entities/account.entity';
// import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
// import { LeedStatus } from 'src/enum';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class Leed {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'uuid', nullable: true })
//   accountId: string;

//   @Column({ type: 'uuid', nullable: true })
//   companyDetailId: string;

//   @Column({ type: 'varchar', length: 60, nullable: true })
//   name: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   enquiryFor: string;

//   @Column({ type: 'varchar', length: 50, nullable: true })
//   contactNumber: string;

//   @Column({ type: 'varchar', length: 50, nullable: true })
//   wpNo: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   location: string;

//   @Column({ type: 'enum', enum: LeedStatus, default: LeedStatus.NEW })
//   status: LeedStatus;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @ManyToOne(() => Account, (account) => account.leed, {
//     cascade: true,
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   })
//   account: Account[];
  
//   @ManyToOne(() => CompanyDetail, (companyDetail) => companyDetail.leed, {
//     cascade: true,
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   })
//   companyDetail: CompanyDetail[];
// }
