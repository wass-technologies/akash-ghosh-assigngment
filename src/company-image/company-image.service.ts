import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyImage } from './entities/company-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyImageService {
  constructor(
    @InjectRepository(CompanyImage)
    private readonly repo: Repository<CompanyImage>,
  ) {}

  async create(accountId: string, image: string) {
    const obj = Object.create({
      file: process.env.BL_CDN_LINK + image,
      fileName: image,
      accountId: accountId,
    });
    return this.repo.save(obj);
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return result;
  }

  async updateImage(image: string, result: CompanyImage) {
    const obj = Object.assign(result, {
      file: process.env.BL_CDN_LINK + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }

  async remove(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return this.repo.remove(result);
  }
}
