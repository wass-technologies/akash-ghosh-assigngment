import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Brackets, Repository } from 'typeorm';
import { CityDto, UpdateCityDto } from './dto/city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly repo: Repository<City>,
  ) {}

  async create(dto: CityDto) {
    const category = await this.repo.findOne({
      where: { name: dto.name, stateId: dto.stateId },
    });
    if (category) {
      throw new ConflictException('City already exists!');
    }
    const obj = Object.assign(dto);
    return this.repo.save(obj);
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    status: boolean,
    stateId: number,
  ) {
    const [result, total] = await this.repo
      .createQueryBuilder('city')
      .where('city.status = :status AND city.stateId = :stateId', {
        status: status,
        stateId: stateId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('city.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN city.name LIKE '${keyword}%' THEN 0 ELSE 1 END, city.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { result, total };
  }

  async find(limit: number, offset: number, keyword: string, stateId: number) {
    const [result, total] = await this.repo
      .createQueryBuilder('city')
      .where('city.status = :status AND city.stateId = :stateId', {
        status: true,
        stateId: stateId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('city.name LIKE :pname', {
            pname: '%' + keyword + '%',
          });
        }),
      )
      .orderBy(
        `CASE WHEN city.name LIKE '${keyword}%' THEN 0 ELSE 1 END, city.name`,
        'ASC',
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return { result, total };
  }

  async findListAll() {
    const [result, total] = await this.repo
      .createQueryBuilder('city')
      .where('city.status = :status', {
        status: true,
      })
      .orderBy({'city.name': 'ASC'})
      .getManyAndCount();
    return { result, total };
  }

  async findOne(id: number) {
    const city = await this.repo.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('City not found!');
    }
    return city;
  }

  async update(id: number, dto: UpdateCityDto) {
    try {
      const city = await this.repo.findOne({ where: { id } });
      if (!city) {
        throw new NotFoundException('City not found!');
      }
      const obj = Object.assign(city, { name: dto.name });
      return this.repo.save(obj);
    } catch (error) {
      throw new NotAcceptableException(
        'Either catgeory exists or invalid name!',
      );
    }
  }

  async status(id: number, dto: BoolStatusDto) {
    const menu = await this.repo.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException('City not found!');
    }
    const obj = Object.assign(menu, dto);
    return this.repo.save(obj);
  }
}
