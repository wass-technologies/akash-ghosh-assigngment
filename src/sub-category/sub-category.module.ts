// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
// import { SubCategory } from './entities/sub-category.entity';
// import { SubCategoryController } from './sub-category.controller';
// import { SubCategoryService } from './sub-category.service';
// import { MulterModule } from '@nestjs/platform-express';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([SubCategory]),
//     AuthModule,
//     MulterModule.register({ dest: './uploads/subCategory' }),
//   ],
//   controllers: [SubCategoryController],
//   providers: [SubCategoryService],
// })
// export class SubCategoryModule {}
