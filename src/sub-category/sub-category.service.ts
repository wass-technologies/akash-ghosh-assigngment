// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
// import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
// import { DefaultStatus } from 'src/enum';
// import { Brackets, Repository } from 'typeorm';
// import { SubcatPagination } from './dto/sub-category-pagination';
// import { SubCategoryDto, UpdateSubCategoryDto } from './dto/sub-category.dto';
// import { SubCategory } from './entities/sub-category.entity';

// @Injectable()
// export class SubCategoryService {
//   constructor(
//     @InjectRepository(SubCategory)
//     private readonly repo: Repository<SubCategory>,
//   ) {}

//   async create(dto: SubCategoryDto) {
//     const category = await this.repo.findOne({
//       where: { name: dto.name, categoryId: dto.categoryId },
//     });
//     if (category) {
//       throw new ConflictException('Category already exists!');
//     }
//     const obj = Object.create(dto);
//     return this.repo.save(obj);
//   }

//   async findAll(dto: SubcatPagination) {
//     const limit = dto.limit;
//     const offset = dto.offset;
//     const keyword = dto.keyword || '';
//     const status = dto.status;
//     const categoryId = dto.categoryId;
//     let query = await this.repo.createQueryBuilder('subCategory');

//     if (categoryId) {
//       let [result, count] = await query
//         .where(
//           'subCategory.categoryId = :cid AND subCategory.status = :status',
//           {
//             cid: categoryId,
//             status: status,
//           },
//         )
//         .andWhere(
//           new Brackets((qb) => {
//             qb.where('subCategory.name LIKE :name', {
//               name: '%' + keyword + '%',
//             });
//           }),
//         )
//         .take(limit)
//         .skip(offset)
//         .getManyAndCount();

//       return { result, count };
//     } else {
//       let [result, count] = await query
//         .where('subCategory.status = :status', { status: status })
//         .andWhere(
//           new Brackets((qb) => {
//             qb.where('subCategory.name LIKE :name', {
//               name: '%' + keyword + '%',
//             });
//           }),
//         )
//         .take(limit)
//         .skip(offset)
//         .getManyAndCount();

//       return { result, count };
//     }
//   }

//   async findByVendor(dto: SubcatPagination) {
//     const [result, total] = await this.repo
//       .createQueryBuilder('subCategory')
//       .where(
//         'subCategory.status = :status AND subCategory.categoryId = :categoryId',
//         { status: DefaultStatus.ACTIVE, categoryId: dto.categoryId },
//       )
//       .orderBy({'subCategory.name': 'DESC'})
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();
//     return { result, total };
//   }

//   async findByMultiCat(
//     limit: number,
//     offset: number,
//     keyword: string,
//     categories: any,
//   ) {
//     const [result, total] = await this.repo
//       .createQueryBuilder('subCategory')
//       .where(
//         'subCategory.status = :status AND subCategory.categoryId IN :categoryId',
//         { status: true, categoryId: categories },
//       )
//       .andWhere(
//         new Brackets((qb) => {
//           qb.where('subCategory.name LIKE :pname', {
//             pname: '%' + keyword + '%',
//           });
//         }),
//       )
//       .orderBy(
//         `CASE WHEN subCategory.name LIKE '${keyword}%' THEN 0 ELSE 1 END, subCategory.name`,
//         'ASC',
//       )
//       .take(limit)
//       .skip(offset)
//       .getManyAndCount();
//     return { result, total };
//   }

//   async findAllSubCat(dto: SubcatPagination) {
//     const limit = dto.limit;
//     const offset = dto.offset;
//     const keyword = dto.keyword || '';
//     const categoryId = dto.categoryId;
//     let query = await this.repo.createQueryBuilder('subCategory');

//     if (categoryId) {
//       let [result, count] = await query
//         .where(
//           'subCategory.categoryId = :cid AND subCategory.status = :status',
//           {
//             cid: categoryId,
//             status: DefaultStatus.ACTIVE,
//           },
//         )
//         .andWhere(
//           new Brackets((qb) => {
//             qb.where('subCategory.name LIKE :name', {
//               name: '%' + keyword + '%',
//             });
//           }),
//         )
//         .take(limit)
//         .skip(offset)
//         .getManyAndCount();

//       return { result, count };
//     } else {
//       let [result, count] = await query
//         .where('subCategory.status = :status', { status: DefaultStatus.ACTIVE })
//         .andWhere(
//           new Brackets((qb) => {
//             qb.where('subCategory.name LIKE :name', {
//               name: '%' + keyword + '%',
//             });
//           }),
//         )
//         .take(limit)
//         .skip(offset)
//         .getManyAndCount();

//       return { result, count };
//     }
//   }

//   async findOne(id: string) {
//     const category = await this.repo.findOne({ where: { id } });
//     if (!category) {
//       throw new NotFoundException('Sub-Category not found!');
//     }
//     return category;
//   }

//   async update(id: string, dto: UpdateSubCategoryDto) {
//     const category = await this.repo.findOne({ where: { id } });
//     if (!category) {
//       throw new NotFoundException('Sub-Category not found!');
//     }
//     const obj = Object.assign(category, { name: dto.name });
//     return this.repo.save(obj);
//   }

//   async image(image: string, result: SubCategory) {
//     const obj = Object.assign(result, {
//       image: process.env.BL_CDN_LINK + image,
//       imageName: image,
//     });

//     return this.repo.save(obj);
//   }

//   async status(id: string, dto: DefaultStatusDto) {
//     const menu = await this.repo.findOne({ where: { id } });
//     if (!menu) {
//       throw new NotFoundException('Sub-Category not found!');
//     }
//     const obj = Object.assign(menu, dto);
//     return this.repo.save(obj);
//   }
// }
