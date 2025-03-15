// import { Account } from 'src/account/entities/account.entity';
// import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
// import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class CompanySubCategory {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'uuid', nullable: true })
//   accountId: string;

//   @Column({ type: 'uuid', nullable: true })
//   subCategoryId: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @ManyToOne(
//     () => Account,
//     (account) => account.companySubCategory,
//     {
//       cascade: true,
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//   )
//   account: Account[];

//   @ManyToOne(
//     () => SubCategory,
//     (subCategory) => subCategory.companySubCategory,
//     {
//       cascade: true,
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//     },
//   )
//   subCategory: SubCategory[];
// }
