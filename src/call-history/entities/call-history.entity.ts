// import { Account } from 'src/account/entities/account.entity';
// import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
// import { UserRole } from 'src/enum';
// import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// @Entity()
// export class CallHistory {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'uuid', nullable: true })
//   accountId: string;

//   @Column({ type: 'uuid', nullable: true })
//   companyDetailId: string;

//   @Column({ type: 'enum', enum: UserRole, nullable: true })
//   role: UserRole;

//   // @ManyToOne(() => Account, (account) => account.callHistory, {
//   //   cascade: true,
//   //   onUpdate: 'CASCADE',
//   //   onDelete: 'CASCADE',
//   // })
//   // account: Account[];

//   // @ManyToOne(
//   //   () => CompanyDetail,
//   //   (companyDetail) => companyDetail.callHistory,
//   //   {
//   //     cascade: true,
//   //     onUpdate: 'CASCADE',
//   //     onDelete: 'CASCADE',
//   //   },
//   // )
//   // companyDetail: CompanyDetail[];

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
