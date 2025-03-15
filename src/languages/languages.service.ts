// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
// import { DefaultStatus } from 'src/enum';
// import { Like, Repository } from 'typeorm';
// import { LanguageDto, PaginationDto, StatusDto } from './dto/language.dto';
// import { Language } from './entities/language.entity';

// @Injectable()
// export class LanguagesService {
//   constructor(
//     @InjectRepository(Language) private readonly repo: Repository<Language>,
//   ) {}

//   async create(dto: LanguageDto) {
//     const result = await this.repo.findOne({
//       where: { name: dto.name },
//     });
//     if (result) {
//       throw new ConflictException('Language already exists!');
//     }
//     const obj = Object.assign(dto);
//     return this.repo.save(obj);
//   }

//   async find(dto: PaginationDto) {
//     const keyword = dto.keyword || '';
//     const [result, total] = await this.repo.findAndCount({
//       where: {
//         name: Like('%' + keyword + '%'),
//         status: DefaultStatus.ACTIVE,
//       },
//       take: dto.limit,
//       skip: dto.offset,
//     });
//     return { result, total };
//   }

//   async findAll(dto: DefaultStatusPaginationDto) {
//     const keyword = dto.keyword || '';
//     const [result, total] = await this.repo.findAndCount({
//       where: {
//         name: Like('%' + keyword + '%'),
//         status: dto.status,
//       },
//       take: dto.limit,
//       skip: dto.offset,
//     });
//     return { result, total };
//   }

//   async update(id: string, dto: LanguageDto) {
//     const result = await this.repo.findOne({ where: { id } });
//     if (!result) {
//       throw new NotFoundException('Language not found!');
//     }
//     const obj = Object.assign(result, dto);
//     return this.repo.save(obj);
//   }

//   async status(id: string, dto: DefaultStatus) {
//     const result = await this.repo.findOne({ where: { id } });
//     if (!result) {
//       throw new NotFoundException('Language not found!');
//     }
//     const obj = Object.assign(result, dto);
//     return this.repo.save(obj);
//   }
// }
