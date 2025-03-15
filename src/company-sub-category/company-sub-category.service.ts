// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CompanySubCategoryDto } from './dto/company-sub-category.dto';
// import { CompanySubCategory } from './entities/company-sub-category.entity';
// import { In } from 'typeorm';

// @Injectable()
// export class CompanySubCategoryService {
//   constructor(
//     @InjectRepository(CompanySubCategory)
//     private readonly repo: Repository<CompanySubCategory>,
//   ) {}

//   async create(dto: CompanySubCategoryDto) {
//     // const existingSubcategories = await this.repo.find({
//     //   where: { accountId: dto.accountId },
//     // });
//     // if (existingSubcategories.length > 0) {
//     //   await this.repo.remove(existingSubcategories);
//     // }
//     const subCategoryEntries = dto.subCategoryId.map((subCategoryId) => ({
//       accountId: dto.accountId,
//       subCategoryId: subCategoryId,
//     }));
//     return this.repo.save(subCategoryEntries);
//   }

//   async remove(id: string) {
//     const result = await this.repo.findOne({ where: { id } });
//     if (!result) {
//       throw new NotFoundException('Not found!');
//     }
//     return this.repo.remove(result);
//   }
// }
