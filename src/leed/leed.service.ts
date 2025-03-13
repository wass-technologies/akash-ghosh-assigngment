// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateLeedDto, LeedPaginationDto, PdfLeadPaginationDto } from './dto/create-leed.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Leed } from './entities/leed.entity';
// import { Repository } from 'typeorm';
// import { UserDetail } from 'src/user-details/entities/user-detail.entity';
// import { CallHistory } from 'src/call-history/entities/call-history.entity';
// import { LeedStatus, UserRole } from 'src/enum';

// @Injectable()
// export class LeedService {
//   constructor(
//     @InjectRepository(Leed) private readonly repo: Repository<Leed>,
//     @InjectRepository(UserDetail)
//     private readonly userDetailRepo: Repository<UserDetail>,
//     @InjectRepository(CallHistory)
//     private readonly callHistoryRepo: Repository<CallHistory>,
//   ) {}

//   async create(dto: CreateLeedDto, companyDetailId: string, accountId: string) {
//     const user = await this.userDetailRepo
//       .createQueryBuilder('userDetail')
//       .leftJoinAndSelect('userDetail.account', 'account')
//       .where('userDetail.accountId = :accountId', { accountId: accountId })
//       .getOne();
//     const obj = Object.assign({
//       name: user.name,
//       enquiryFor: dto.enquiryFor,
//       contactNumber: user.account['phoneNumber'],
//       wpNo: user.wpNo,
//       location: dto.location,
//       companyDetailId,
//       accountId,
//     });
//     const leed = await this.repo.save(obj);
//     const callObj = Object.assign({
//       accountId: accountId,
//       companyDetailId: companyDetailId,
//       role: UserRole.USER,
//     });
//     this.callHistoryRepo.save(callObj);
//     return leed;
//   }

//   async findAll(dto: LeedPaginationDto, companyDetailId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('leed')
//       .select([
//         'leed.id',
//         'leed.accountId',
//         'leed.companyDetailId',
//         'leed.name',
//         'leed.enquiryFor',
//         'leed.contactNumber',
//         'leed.wpNo',
//         'leed.location',
//         'leed.status',
//         'leed.createdAt',
//       ])
//       .where(
//         'leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate',
//         {
//           companyDetailId: companyDetailId,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     if (dto.status && dto.status.length > 0) {
//       query.andWhere('leed.status = :status', { status: dto.status });
//     }
//     const [result, count] = await query
//       .orderBy({ 'leed.createdAt': 'DESC' })
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();

//     return { result, count };
//   }
  
//   async findByUser(dto: LeedPaginationDto, accountId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('leed')
//       .leftJoinAndSelect('leed.companyDetail', 'companyDetail')
//       .select([
//         'leed.id',
//         'leed.accountId',
//         'leed.companyDetailId',
//         'leed.name',
//         'leed.enquiryFor',
//         'leed.contactNumber',
//         'leed.wpNo',
//         'leed.location',
//         'leed.status',
//         'leed.createdAt',

//         'companyDetail.id',
//         'companyDetail.name',
//         'companyDetail.businessName'
//       ])
//       .where(
//         'leed.accountId = :accountId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate',
//         {
//           accountId: accountId,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     // if (dto.status && dto.status.length > 0) {
//     //   query.andWhere('leed.status = :status', { status: dto.status });
//     // }
//     const [result, count] = await query
//       .orderBy({ 'leed.createdAt': 'DESC' })
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();

//     return { result, count };
//   }

//   async pdf(dto: PdfLeadPaginationDto, companyDetailId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const result = await this.repo
//       .createQueryBuilder('leed')
//       .select([
//         'leed.id',
//         'leed.accountId',
//         'leed.companyDetailId',
//         'leed.name',
//         'leed.enquiryFor',
//         'leed.contactNumber',
//         'leed.wpNo',
//         'leed.location',
//         'leed.status',
//         'leed.createdAt',
//       ])
//       .where(
//         'leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate',
//         {
//           companyDetailId: companyDetailId,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       )
//       .andWhere('leed.status = :status', { status: LeedStatus.NEW })
//       .orderBy({ 'leed.createdAt': 'DESC' })
//       .getMany();

//     return result;
//   }

//   async leedCount(companyDetailId: string) {
//     const totalLeeds = await this.repo
//       .createQueryBuilder('leed')
//       .select(['leed.id'])
//       .where('leed.companyDetailId = :companyDetailId', {
//         companyDetailId: companyDetailId,
//       })
//       .getCount();

//     const newLeeds = await this.repo
//       .createQueryBuilder('leed')
//       .select(['leed.id', 'leed.status'])
//       .where(
//         'leed.companyDetailId = :companyDetailId AND leed.status = :status',
//         { companyDetailId: companyDetailId, status: LeedStatus.NEW },
//       )
//       .getCount();

//     return { totalLeeds: totalLeeds, newLeeds: newLeeds };
//   }

//   async findByAdmin(dto: LeedPaginationDto, companyDetailId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('leed')
//       .where(
//         'leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate',
//         {
//           companyDetailId: companyDetailId,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     if (dto.status && dto.status.length > 0) {
//       query.andWhere('leed.status = :status', { status: dto.status });
//     }
//     const [result, count] = await query
//       .orderBy({ 'leed.createdAt': 'DESC' })
//       .getManyAndCount();

//     return { result, count };
//   }

//   async status(id: string, companyDetailId: string) {
//     const result = await this.repo.findOne({ where: { id, companyDetailId } });
//     if (!result) {
//       throw new NotFoundException('Leed Not Found!!');
//     }
//     const obj = Object.assign(result, { status: LeedStatus.CALLED });
//     const payload = await this.repo.save(obj);
//     const callObj = Object.assign({
//       accountId: result.accountId,
//       companyDetailId: companyDetailId,
//       role: UserRole.VENDOR,
//     });
//     this.callHistoryRepo.save(callObj);
//     return payload;
//   }
// }
