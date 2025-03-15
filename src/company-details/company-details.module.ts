import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyDetailsController } from './company-details.controller';
import { CompanyDetailsService } from './company-details.service';
import { CompanyDetail } from './entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyDetail,Account]),
    AuthModule,
    MulterModule.register({ dest: './uploads/companyDetail' }),
    // CompanySubCategoryModule,
    // CompanyCategoryModule,
  ],
  controllers: [CompanyDetailsController],
  providers: [CompanyDetailsService],
  exports: [CompanyDetailsService],
})
export class CompanyDetailsModule {}
