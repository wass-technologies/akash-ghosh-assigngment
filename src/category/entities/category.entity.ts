import { BannerCategory } from 'src/banner-category/entities/banner-category.entity';
import { Banner } from 'src/banner/entities/banner.entity';
//import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { CategoryType, DefaultStatus } from 'src/enum';
//import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  imageName: string;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.PENDING })
  status: DefaultStatus;

  @Column({ type: 'enum', enum: CategoryType, default: CategoryType.NEW })
  type: CategoryType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // // @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  // // subCategory: SubCategory[];

  // @OneToMany(
  //   () => CompanyCategory,
  //   (companyCategory) => companyCategory.category,
  // )
  // companyCategory: CompanyCategory[];

  @OneToMany(() => BannerCategory, (bannerCategory) => bannerCategory.category)
  bannerCategory: BannerCategory[];
}
