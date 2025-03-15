// import { Account } from 'src/account/entities/account.entity';
// import { Category } from 'src/category/entities/category.entity';
// import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
// import { YNStatus } from 'src/enum';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class CompanyCategory {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'uuid', nullable: true })
//   accountId: string;

//   @Column({ type: 'uuid', nullable: true })
//   categoryId: string;

//   @Column({ type: 'int', default: 0 })
//   offer: number;

//   @Column({ type: 'enum', enum: YNStatus, default: YNStatus.NO })
//   isOffer: YNStatus;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   // @ManyToOne(() => Account, (account) => account.companyCategory, {
//   //   cascade: true,
//   //   onDelete: 'CASCADE',
//   //   onUpdate: 'CASCADE',
//   // })
//   // account: Account[];

//   // @ManyToOne(() => Category, (category) => category.companyCategory, {
//   //   cascade: true,
//   //   onDelete: 'CASCADE',
//   //   onUpdate: 'CASCADE',
//   // })
//   // category: Category[];
// }
