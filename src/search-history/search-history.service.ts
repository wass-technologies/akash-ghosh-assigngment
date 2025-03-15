import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { Like, Repository } from 'typeorm';
import { SearchHistoryDto } from './dto/search-history.dto';
import { SearchHistory } from './entities/search-history.entity';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private readonly repo: Repository<SearchHistory>,
  ) {}

  create(createSearchHistoryDto: SearchHistoryDto) {
    const obj = Object.create(createSearchHistoryDto);
    return this.repo.save(obj);
  }

  async findAllByUser(dto: CommonPaginationDto, accountId: string) {
    const [result, total] = await this.repo.findAndCount({
      where: { accountId },
      order: { createdAt: 'DESC' },
      skip: dto.offset,
      take: dto.limit,
    });
    return { result, total };
  }
}
