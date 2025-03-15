// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCompanyKeywordDto } from './dto/create-company-keyword.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CompanyKeyword } from './entities/company-keyword.entity';
// import { Brackets, Repository } from 'typeorm';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

// @Injectable()
// export class CompanyKeywordService {
//   constructor(
//     @InjectRepository(CompanyKeyword)
//     private readonly repo: Repository<CompanyKeyword>,
//   ) {}

//   async create(dto: CreateCompanyKeywordDto, accountId: string) {
//     const keywords = dto.keyword.split(',');
//     const data = [];
//     keywords.forEach((element) => {
//       data.push({ keyword: element, accountId: accountId });
//     });
//     return this.repo.save(data);
//   }

//   async findAll(dto: CommonPaginationDto, accountId: string) {
//     let keyword = dto.keyword || '';
//     const query = this.repo
//       .createQueryBuilder('companyKeyword')
//       .select(['companyKeyword.id','companyKeyword.keyword'])
//       .where('companyKeyword.accountId = :accountId', { accountId: accountId })
//       .andWhere(
//         new Brackets((qb) => {
//           qb.where('companyKeyword.keyword LIKE :keyword', {
//             keyword: '%' + keyword + '%',
//           });
//         }),
//       );
//     const [result, count] = await query
//       .orderBy({ 'companyKeyword.keyword': 'ASC' })
//       .skip(dto.offset)
//       .take(dto.limit)
//       .getManyAndCount();
//     return { result, count };
//   }

//   async findOne(dto: CommonPaginationDto) {
//     let keyword = dto.keyword || '';
//     const query = this.repo
//       .createQueryBuilder('companyKeyword')
//       .select(['companyKeyword.keyword'])
//       .andWhere(
//         new Brackets((qb) => {
//           qb.where('companyKeyword.keyword LIKE :keyword', {
//             keyword: '%' + keyword + '%',
//           });
//         }),
//       );
//     const [result, count] = await query
//       .orderBy({ 'companyKeyword.keyword': 'ASC' })
//       .skip(dto.offset)
//       .take(dto.limit)
//       .getManyAndCount();
//     return { result, count };
//   }

//   async remove(id: string, accountId: string) {
//     const result = await this.repo.findOne({
//       where: { id: id, accountId: accountId },
//     });
//     if (!result) throw new NotFoundException('Keyword Not Found');
//     else return this.repo.remove(result);
//   }
// }
