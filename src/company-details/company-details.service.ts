import { Injectable, NotFoundException,UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyStatus } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import {
  CompanyDetailDto,
  PaginationDto,
  PaginationSDto,
  StatusDto,
} from './dto/company-detail.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/enum';
import { CompanyDetail } from './entities/company-detail.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { Account } from 'src/account/entities/account.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Injectable()
export class CompanyDetailsService {
  constructor(
    @InjectRepository(CompanyDetail)
    private readonly repo: Repository<CompanyDetail>,
    @InjectRepository(Account)
    private readonly accountrepo: Repository<Account>,
  ) {}




  
  async updateCompanyDetails(userId: string, dto: CompanyDetailDto) {
    // ✅ Step 1: Restaurant ka existing account fetch karo
    const account = await this.accountrepo.findOne({ where: { id: userId } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // ✅ Step 2: Check if restaurant details exist, update them; otherwise, create new entry
    let companyDetails = await this.repo.findOne({ where: { account: account } });

    if (!companyDetails) {
      companyDetails = this.repo.create({ account, ...dto });
    } else {
      Object.assign(companyDetails, dto); // Update existing details
    }

    // ✅ Step 3: Save updated details in database
    return await this.repo.save(companyDetails);
  }
  
  


// async updateStatus(companyId: string, status: CompanyStatus) {
//   const company = await this.repo.findOne({ where: { id: companyId } });

//   if (!company) {
//     throw new NotFoundException('Company not found');
//   }

//   company.status = status;
//   return this.repo.save(company);
// }
//   async findList(dto: PaginationDto) {
//     const category = JSON.parse(dto.category);
//     const subcategory = JSON.parse(dto.subCategory);
//     const keyword = dto.keyword || '';
//     const query = this.repo
//       .createQueryBuilder('companyDetail')
//       .leftJoinAndSelect('companyDetail.state', 'state')
//       .leftJoinAndSelect('companyDetail.city', 'city')
//       .leftJoinAndSelect('companyDetail.companyCategory', 'companyCategory')
//       .leftJoinAndSelect(
//         'companyDetail.companySubCategory',
//         'companySubCategory',
//       )
//       .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
//       .leftJoinAndSelect('companyCategory.category', 'category')
//       .select([
//         'companyDetail.id',
//         'companyDetail.businessName',
//         'companyDetail.personName',
//         'companyDetail.logo',

//         'state.id',
//         'state.name',

//         'city.id',
//         'city.name',

//         'companyCategory.id',
//         'category.id',
//         'category.name',

//         'companySubCategory.id',
//         'subCategory.id',
//         'subCategory.name',
//       ])
//       .where('companyDetail.status = :status', {
//         status: CompanyStatus.APPROVED,
//       });
//     if (category.length > 0) {
//       query.andWhere('category.id IN :categorys', { categorys: category });
//     }
//     if (subcategory.length > 0) {
//       query.andWhere('subCategory.id IN :subCategorys', {
//         subCategorys: subcategory,
//       });
//     }
//     query.andWhere(
//       new Brackets((qb) => {
//         qb.where('companyDetail.businessName LIKE :businessName', {
//           businessName: '%' + keyword + '%',
//         });
//       }),
//     );
//     const [result, total] = await query
//       .skip(dto.offset)
//       .take(dto.limit)
//       .orderBy({ 'companyDetail.businessName': 'ASC' })
//       .getManyAndCount();
//     return { result, total };
//   }

//   async findCompany(id: string) {
//     const result = await this.repo
//       .createQueryBuilder('companyDetail')
//       .where('companyDetail.accountId = :accountId', { accountId: id })
//       .getOne();
//     if (!result) {
//       throw new NotFoundException('Company not found!');
//     }
//     return result;
//   }

//   async update(id: string, dto: CompanyDetailDto) {
//     const result = await this.repo.findOne({ where: { accountId: id } });
//     if (!result) {
//       throw new NotFoundException('Company not found!');
//     }
//     const obj = Object.assign(result, dto);
//     return this.repo.save(obj);
//   }

//   async profileImage(image: string, result: CompanyDetail) {
//     const obj = Object.assign(result, {
//       profile: process.env.BL_CDN_LINK + image,
//       profileName: image,
//     });
//     return this.repo.save(obj);
//   }

//   async status(id: string, dto: StatusDto) {
//     const result = await this.repo.findOne({ where: { accountId: id } });
//     if (!result) {
//       throw new NotFoundException('Company detail not found!');
//     }
//     const obj = Object.assign(result, dto);
//     return this.repo.save(obj);
//   }
}