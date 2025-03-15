import { Module } from '@nestjs/common';
import { BannerCategoryService } from './banner-category.service';
import { BannerCategoryController } from './banner-category.controller';
import { BannerCategory } from './entities/banner-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BannerCategory]), AuthModule],
  controllers: [BannerCategoryController],
  providers: [BannerCategoryService],
})
export class BannerCategoryModule {}
