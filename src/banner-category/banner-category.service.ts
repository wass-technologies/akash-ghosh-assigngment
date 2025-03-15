import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BannerCategoryPaginationDto,
  CreateBannerCategoryDto,
} from './dto/create-banner-category.dto';
import { UpdateBannerCategoryDto } from './dto/update-banner-category.dto';
import { BannerCategory } from './entities/banner-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultStatus } from 'src/enum';

@Injectable()
export class BannerCategoryService {
  constructor(
    @InjectRepository(BannerCategory)
    private readonly repo: Repository<BannerCategory>,
  ) {}

  async create(dto: CreateBannerCategoryDto) {
    for (const categoryId of dto.categoryId) {
      const existingRecord = await this.repo.findOne({
        where: {
          bannerId: dto.bannerId,
          categoryId: categoryId,
        },
      });

      if (existingRecord) {
        await this.repo.remove(existingRecord);
      }

      const newRecord = this.repo.create({
        bannerId: dto.bannerId,
        categoryId: categoryId,
      });

      await this.repo.save(newRecord);
    }
    return { message: 'Banner with categories updated successfully' };
  }

  async findAll(dto: BannerCategoryPaginationDto) {
    const query = await this.repo
      .createQueryBuilder('bannerCategory')
      .leftJoinAndSelect('bannerCategory.banner', 'banner')
      .leftJoinAndSelect('bannerCategory.category', 'category')
      .select([
        'bannerCategory.id',
        'banner.id',
        'banner.image',
        'banner.status',

        'category.id',
        'category.name',
        'category.image',
        'category.status',
      ]);
    if (dto.bannerId && dto.bannerId.length > 0) {
      query.where('bannerCategory.bannerId = :bannerId', {
        bannerId: dto.bannerId,
      });
    }
    const [result, count] = await query
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();
    return { result, count };
  }

  async findByUser(dto: BannerCategoryPaginationDto) {
    const query = await this.repo
      .createQueryBuilder('bannerCategory')
      .leftJoinAndSelect(
        'bannerCategory.banner',
        'banner',
        'banner.status = :status',
        { status: DefaultStatus.ACTIVE },
      )
      .leftJoinAndSelect(
        'bannerCategory.category',
        'category',
        'category.status = :status',
        { status: DefaultStatus.ACTIVE },
      )
      .select([
        'bannerCategory.id',
        'banner.id',
        'banner.image',
        'banner.status',

        'category.id',
        'category.name',
        'category.image',
        'category.type',
        'category.status',
      ]);
    if (dto.bannerId && dto.bannerId.length > 0) {
      query.where('bannerCategory.bannerId = :bannerId', {
        bannerId: dto.bannerId,
      });
    }
    const [result, count] = await query
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();
    return { result, count };
  }

  async remove(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Banner-Category Not Found with this ID');
    }
    return this.repo.remove(result);
  }
}
