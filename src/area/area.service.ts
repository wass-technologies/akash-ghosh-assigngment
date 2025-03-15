import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Brackets, Repository } from 'typeorm';
import { AreaDto, UpdateAreaDto } from './dto/area.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly repo: Repository<Area>,
  ) {}

  async create(dto: AreaDto) {
    const category = await this.repo.findOne({
      where: { name: dto.name, cityId: dto.cityId },
    });
    if (category) {
      throw new ConflictException('Area already exists!');
    }
    const obj = Object.assign(dto);
    return this.repo.save(obj);
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    status: boolean,
    cityId: number,
  ) {
    const [result, total] = await this.repo
      .createQueryBuilder('area')
      .where('area.status = :status AND area.cityId = :cityId', {
        status: status,
        cityId: cityId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('area.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN area.name LIKE '${keyword}%' THEN 0 ELSE 1 END, area.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { result, total };
  }

  async find(limit: number, offset: number, keyword: string, cityId: number) {
    const [result, total] = await this.repo
      .createQueryBuilder('area')
      .where('area.status = :status AND area.cityId = :cityId', {
        status: true,
        cityId: cityId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('area.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN area.name LIKE '${keyword}%' THEN 0 ELSE 1 END, area.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return { result, total };
  }

  async findOne(id: number) {
    const area = await this.repo.findOne({ where: { id } });
    if (!area) {
      throw new NotFoundException('Area not found!');
    }
    return area;
  }

  async update(id: number, dto: UpdateAreaDto) {
    try {
      const area = await this.repo.findOne({ where: { id } });
      if (!area) {
        throw new NotFoundException('Area not found!');
      }
      const obj = Object.assign(area, { name: dto.name });
      return this.repo.save(obj);
    } catch (error) {
      throw new NotAcceptableException('Either area exists or invalid name!');
    }
  }

  async status(id: number, dto: BoolStatusDto) {
    const menu = await this.repo.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException('Area not found!');
    }
    const obj = Object.assign(menu, dto);
    return this.repo.save(obj);
  }
}
