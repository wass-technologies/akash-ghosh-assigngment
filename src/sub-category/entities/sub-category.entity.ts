// import { Account } from 'src/account/entities/account.entity';
// import { Category } from 'src/category/entities/category.entity';
// import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
// import { DefaultStatus } from 'src/enum';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class SubCategory {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   name: string;

//   @Column({ type: 'text', nullable: true })
//   image: string;

//   @Column({ type: 'text', nullable: true })
//   imageName: string;

//   @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.PENDING })
//   status: DefaultStatus;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @Column({ type: 'string', nullable: true })
//   categoryId: string;

//   @Column({ type: 'uuid', nullable: true })
//   accountId: string;

//   @Column({ type: 'uuid', nullable: true })
//   updatedId: string;

//   @ManyToOne(() => Account, (account) => account.subCategory, {
//     cascade: true,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   })
//   account: Account[];

//   @ManyToOne(() => Category, (category) => category.subCategory, {
//     cascade: true,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   })
//   category: Category[];

//   @OneToMany(
//     () => CompanySubCategory,
//     (companySubCategory) => companySubCategory.subCategory,
//   )
//   companySubCategory: CompanySubCategory[];
// }
