import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BannerDto,
  BannerPaginationDto,
  CreateBannerDto,
} from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { domainToASCII } from 'url';
import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { DefaultStatus } from 'src/enum';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly repo: Repository<Banner>,
  ) {}

  async create(image: string) {
    const obj = Object.assign({
      image: process.env.BL_CDN_LINK + image,
      imagePath: image,
    });
    return this.repo.save(obj);
  }

  async findAll(dto: BannerPaginationDto) {
    const query = await this.repo
      .createQueryBuilder('banner')
      .where('banner.status = :status', {
        status: dto.status,
      });
    const [result, count] = await query
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();

    return { result, count };
  }

  async findByUser(dto: BannerPaginationDto) {
    const query = await this.repo
      .createQueryBuilder('banner')
      .where('banner.status = :status', {
        status: DefaultStatus.ACTIVE,
      });
    const [result, count] = await query
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();
    return { result, count };
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Banner Not Found..');
    }
    return result;
  }

  async image(image: string, result: Banner) {
    const obj = Object.assign(result, {
      image: process.env.BL_CDN_LINK + image,
      imagePath: image,
    });
    return this.repo.save(obj);
  }

  async status(id: string, dto: BannerDto) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Banner Not Found..');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }
}
