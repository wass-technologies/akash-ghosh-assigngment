import { Blog } from 'src/blogs/entities/blog.entity';
//import { CallHistory } from 'src/call-history/entities/call-history.entity';
//import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
import { CompanyImage } from 'src/company-image/entities/company-image.entity';
import { CompanyKeyword } from 'src/company-keyword/entities/company-keyword.entity';
//import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
import { AIType, DefaultStatus, LoginType, UserRole } from 'src/enum';
import { Faq } from 'src/faqs/entities/faq.entity';
//import { Leed } from 'src/leed/entities/leed.entity';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { RatingFeedback } from 'src/rating-feedback/entities/rating-feedback.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  roles: UserRole;


  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.ACTIVE })
  status: DefaultStatus;

  
  @OneToMany(() => Notification, (notification) => notification.account)
  notification: Notification[];

  @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.account)
  loginHistory: LoginHistory[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.account)
  userPermission: UserPermission[];

  @OneToMany(() => UserDetail, (userDetail) => userDetail.account)
  userDetail: UserDetail[];

  @OneToMany(() => CompanyDetail, (companyDetail) => companyDetail.account)
  companyDetail: CompanyDetail[];

  @OneToMany(() => Faq, (faq) => faq.account)
  faq: Faq[];

  @OneToMany(() => Blog, (blog) => blog.account)
  blog: Blog[];



   @OneToMany(() => RatingFeedback, (ratingFeedback) => ratingFeedback.account)
   ratingFeedback: RatingFeedback[];
  
  // @OneToMany(() => CompanyImage, (companyImage) => companyImage.account)
  // companyImage: CompanyImage[];
  
  // @OneToMany(() => Leed, (leed) => leed.account)
  // leed: Leed[];
  
 
  @OneToMany(() => CompanyKeyword, (companyKeyword) => companyKeyword.account)
  companyKeyword: CompanyKeyword[];

  // @OneToMany(
  //   () => CompanyCategory,
  //   (companyCategory) => companyCategory.account,
  // )
  // companyCategory: CompanyCategory;

  // @OneToMany(
  //   () => CompanySubCategory,
  //   (companySubCategory) => companySubCategory.account,
  // )
  // companySubCategory: CompanySubCategory;
}
