import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyStatus } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import {
  CompanyDetailDto,
  PaginationDto,
  PaginationSDto,
  StatusDto,
} from './dto/company-detail.dto';
import { CompanyDetail } from './entities/company-detail.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class CompanyDetailsService {
  constructor(
    @InjectRepository(CompanyDetail)
    private readonly repo: Repository<CompanyDetail>,
  ) {}

  async findList(dto: PaginationDto) {
    const category = JSON.parse(dto.category);
    const subcategory = JSON.parse(dto.subCategory);
    const keyword = dto.keyword || '';
    const query = this.repo
      .createQueryBuilder('companyDetail')
      .leftJoinAndSelect('companyDetail.state', 'state')
      .leftJoinAndSelect('companyDetail.city', 'city')
      .leftJoinAndSelect('companyDetail.companyCategory', 'companyCategory')
      .leftJoinAndSelect(
        'companyDetail.companySubCategory',
        'companySubCategory',
      )
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .select([
        'companyDetail.id',
        'companyDetail.businessName',
        'companyDetail.personName',
        'companyDetail.logo',

        'state.id',
        'state.name',

        'city.id',
        'city.name',

        'companyCategory.id',
        'category.id',
        'category.name',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.name',
      ])
      .where('companyDetail.status = :status', {
        status: CompanyStatus.APPROVED,
      });
    if (category.length > 0) {
      query.andWhere('category.id IN :categorys', { categorys: category });
    }
    if (subcategory.length > 0) {
      query.andWhere('subCategory.id IN :subCategorys', {
        subCategorys: subcategory,
      });
    }
    query.andWhere(
      new Brackets((qb) => {
        qb.where('companyDetail.businessName LIKE :businessName', {
          businessName: '%' + keyword + '%',
        });
      }),
    );
    const [result, total] = await query
      .skip(dto.offset)
      .take(dto.limit)
      .orderBy({ 'companyDetail.businessName': 'ASC' })
      .getManyAndCount();
    return { result, total };
  }

  async findCompany(id: string) {
    const result = await this.repo
      .createQueryBuilder('companyDetail')
      .where('companyDetail.accountId = :accountId', { accountId: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('Company not found!');
    }
    return result;
  }

  async update(id: string, dto: CompanyDetailDto) {
    const result = await this.repo.findOne({ where: { accountId: id } });
    if (!result) {
      throw new NotFoundException('Company not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async profileImage(image: string, result: CompanyDetail) {
    const obj = Object.assign(result, {
      profile: process.env.BL_CDN_LINK + image,
      profileName: image,
    });
    return this.repo.save(obj);
  }

  async status(id: string, dto: StatusDto) {
    const result = await this.repo.findOne({ where: { accountId: id } });
    if (!result) {
      throw new NotFoundException('Company detail not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }
}
