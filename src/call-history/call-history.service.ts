// import { Injectable } from '@nestjs/common';
// import {
//   CallHistoryPaginationDto,
//   CreateCallHistoryDto,
// } from './dto/create-call-history.dto';
// import { UpdateCallHistoryDto } from './dto/update-call-history.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CallHistory } from './entities/call-history.entity';
// import { Repository } from 'typeorm';
// import { UserRole } from 'src/enum';

// @Injectable()
// export class CallHistoryService {
//   constructor(
//     @InjectRepository(CallHistory)
//     private readonly repo: Repository<CallHistory>,
//   ) {}

//   async findAll(dto: CallHistoryPaginationDto, companyDetailId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('callHistory')
//       .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
//       .leftJoinAndSelect('callHistory.account', 'account')
//       .leftJoinAndSelect('account.userDetail', 'userDetail')
//       .select([
//         'callHistory.id',
//         'callHistory.role',
//         'callHistory.createdAt',

//         'companyDetail.id',
//         'companyDetail.name',

//         'account.id',
//         'account.phoneNumber',

//         'userDetail.id',
//         'userDetail.name',
//       ])
//       .where(
//         'callHistory.companyDetailId = :companyDetailId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate',
//         {
//           companyDetailId: companyDetailId,
//           role: UserRole.VENDOR,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     const [result, count] = await query
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();

//     return { result, count };
//   }
  
//   async findByUser(dto: CallHistoryPaginationDto, accountId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('callHistory')
//       .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
//       .leftJoinAndSelect('callHistory.account', 'account')
//       .leftJoinAndSelect('account.userDetail', 'userDetail')
//       .select([
//         'callHistory.id',
//         'callHistory.role',
//         'callHistory.createdAt',

//         'companyDetail.id',
//         'companyDetail.name',
//         'companyDetail.callNumber',

//         'account.id',
//         'account.phoneNumber',

//         'userDetail.id',
//         'userDetail.name',
//       ])
//       .where(
//         'callHistory.accountId = :accountId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate',
//         {
//           accountId: accountId,
//           role: UserRole.USER,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     const [result, count] = await query
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();

//     return { result, count };
//   }
  
//   async findByAdmin(dto: CallHistoryPaginationDto, companyDetailId: string) {
//     const fromDate = new Date(dto.fromDate);
//     fromDate.setHours(0, 0, 0, 0);

//     const toDate = new Date(dto.toDate);
//     toDate.setHours(23, 59, 59, 59);

//     const query = await this.repo
//       .createQueryBuilder('callHistory')
//       .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
//       .leftJoinAndSelect('callHistory.account', 'account')
//       .leftJoinAndSelect('account.userDetail', 'userDetail')
//       .select([
//         'callHistory.id',
//         'callHistory.role',
//         'callHistory.createdAt',

//         'companyDetail.id',
//         'companyDetail.name',
//         'companyDetail.callNumber',

//         'account.id',
//         'account.phoneNumber',

//         'userDetail.id',
//         'userDetail.name',
//       ])
//       .where(
//         'callHistory.companyDetailId = :companyDetailId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate',
//         {
//           companyDetailId: companyDetailId,
//           role: UserRole.VENDOR,
//           fromDate: fromDate,
//           toDate: toDate,
//         },
//       );
//     const [result, count] = await query
//       .take(dto.limit)
//       .skip(dto.offset)
//       .getManyAndCount();

//     return { result, count };
//   }
// }
