import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Brackets, Repository } from 'typeorm';
import {
  CategoryDto,
  CategoryPaginationSDto,
  StatusDto,
} from './dto/category.dto';
import { Category } from './entities/category.entity';
import { DefaultStatus } from 'src/enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async create(dto: CategoryDto) {
    const category = await this.repo.findOne({ where: { name: dto.name } });
    if (category) {
      throw new ConflictException('Category already exists!');
    }
    const obj = Object.assign(dto);
    return this.repo.save(obj);
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    status: DefaultStatus,
  ) {
    const [result, total] = await this.repo
      .createQueryBuilder('category')
      .where('category.status = :status', { status: status })
      .andWhere(
        new Brackets((qb) => {
          qb.where('category.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN category.name LIKE '${keyword}%' THEN 0 ELSE 1 END, category.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { result, total };
  }

  async find(limit: number, offset: number, keyword: string) {
    const [result, total] = await this.repo
      .createQueryBuilder('category')
      .select([
        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',
        'category.createdAt',
      ])
      .where('category.status = :status', { status: DefaultStatus.ACTIVE })
      .andWhere(
        new Brackets((qb) => {
          qb.where('category.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN category.name LIKE '${keyword}%' THEN 0 ELSE 1 END, category.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return { result, total };
  }

  async findByUser(dto: CategoryPaginationSDto) {
    const keyword = dto.keyword || '';
    const query = await this.repo
      .createQueryBuilder('category')
      .select([
        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',
        'category.createdAt',
      ])
      .where('category.status = :status', { status: DefaultStatus.ACTIVE });
    if (dto.type && dto.type.length > 0) {
      query.andWhere('category.type = :type', { type: dto.type });
    }
    const [result, total] = await query
      .andWhere(
        new Brackets((qb) => {
          qb.where('category.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();
    return { result, total };
  }

  async findOne(id: string) {
    const category = await this.repo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Category not found!');
    }
    return category;
  }

  async update(id: string, dto: CategoryDto) {
    try {
      const category = await this.repo.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException('Category not found!');
      }
      const obj = Object.assign(category, dto);
      return this.repo.save(obj);
    } catch (error) {
      throw new NotAcceptableException(
        'Either catgeory exists or invalid name!',
      );
    }
  }

  async image(image: string, result: Category) {
    const obj = Object.assign(result, {
      image: process.env.BL_CDN_LINK + image,
      imageName: image,
    });

    return this.repo.save(obj);
  }

  async status(id: string, dto: StatusDto) {
    const menu = await this.repo.findOne({ where: { id: id } });
    if (!menu) {
      throw new NotFoundException('Category not found!');
    }
    const obj = Object.assign(menu, dto);
    return this.repo.save(obj);
  }
}
