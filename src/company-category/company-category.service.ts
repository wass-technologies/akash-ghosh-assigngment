// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CompanyCategoryDto } from './dto/company-category.dto';
// import { CompanyCategory } from './entities/company-category.entity';
// import { YNStatus } from 'src/enum';

// @Injectable()
// export class CompanyCategoryService {
//   constructor(
//     @InjectRepository(CompanyCategory)
//     private readonly repo: Repository<CompanyCategory>,
//   ) {}

//   async create(dto: CompanyCategoryDto, accountId: string) {
//     const result = await this.repo.findOne({
//       where: {
//         accountId: accountId,
//         categoryId: dto.categoryId,
//       },
//     });
//     if (result) {
//       throw new ConflictException('Already exists!');
//     }
//     const obj = Object.create(dto);
//     return this.repo.save(obj);
//   }

//   async offer(id: string, offer: any) {
//     const result = await this.repo.findOne({ where: { id } });
//     if (!result) {
//       throw new NotFoundException('Not found!');
//     }
//     const numOffer = parseInt(offer.offer);
//     if (numOffer == 0) {
//       const obj = Object.assign(result, {
//         offer: 0,
//         isOffer: YNStatus.NO,
//       });
//       return this.repo.save(obj);
//     } else {
//       const obj = Object.assign(result, {
//         offer: numOffer,
//         isOffer: YNStatus.YES,
//       });
//       return this.repo.save(obj);
//     }
//   }

//   async remove(id: string) {
//     const result = await this.repo.findOne({ where: { id } });
//     if (!result) {
//       throw new NotFoundException('Not found!');
//     }
//     return this.repo.remove(result);
//   }
// }
