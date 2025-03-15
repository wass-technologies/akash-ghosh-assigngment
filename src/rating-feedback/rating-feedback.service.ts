import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Brackets, Repository } from 'typeorm';
import {
  FeedbackPaginationDto,
  RatingFeedbackDto,
} from './dto/rating-feedback.dto';
import { RatingFeedback } from './entities/rating-feedback.entity';

@Injectable()
export class RatingFeedbackService {
  constructor(
    @InjectRepository(RatingFeedback)
    private readonly repo: Repository<RatingFeedback>,
  ) {}

  async create(dto: RatingFeedbackDto) {
    const feedBackCnt = await this.repo.count({
      where: { accountId: dto.accountId },
    });
    if (feedBackCnt > 5) {
      throw new NotAcceptableException('Only 5 ratings allowed from a user!');
    }
    const obj = Object.create(dto);
    return this.repo.save(obj);
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    status: boolean,
  ) {
    const [result, total] = await this.repo
      .createQueryBuilder('ratingFeedback')
      .leftJoinAndSelect('ratingFeedback.companyDetail', 'companyDetail')
      .leftJoinAndSelect('ratingFeedback.account', 'account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'ratingFeedback.id',
        'ratingFeedback.desc',
        'ratingFeedback.rating',
        'ratingFeedback.status',

        'companyDetail.id',
        'companyDetail.businessName',

        'account.id',

        'userDetail.id',
        'userDetail.name',
      ])
      .where('ratingFeedback.status = :status', { status: status })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'ratingFeedback.desc LIKE :desc OR userDetail.name LIKE :name',
            {
              desc: `%${keyword}%`,
              name: `%${keyword}%`,
            },
          );
        }),
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { result, total };
  }

  async findByVendor(
    limit: number,
    offset: number,
    keyword: string,
    status: boolean,
    companyDetailId: string,
  ) {
    const [result, total] = await this.repo
      .createQueryBuilder('ratingFeedback')
      .leftJoinAndSelect('ratingFeedback.companyDetail', 'companyDetail')
      .leftJoinAndSelect('ratingFeedback.account', 'account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'ratingFeedback.id',
        'ratingFeedback.desc',
        'ratingFeedback.rating',
        'ratingFeedback.status',

        'companyDetail.id',
        'companyDetail.businessName',

        'account.id',

        'userDetail.id',
        'userDetail.name',
      ])
      .where(
        'companyDetail.id = :companyDetailId AND ratingFeedback.status = :status',
        { companyDetailId: companyDetailId, status: status },
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'ratingFeedback.desc LIKE :desc OR userDetail.name LIKE :name',
            {
              desc: `%${keyword}%`,
              name: `%${keyword}%`,
            },
          );
        }),
      )
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { result, total };
  }

  async find(accountId: string) {
    const [result, count] = await this.repo
      .createQueryBuilder('ratingFeedback')
      .leftJoinAndSelect('ratingFeedback.companyDetail', 'companyDetail')
      .leftJoinAndSelect('ratingFeedback.account', 'account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'ratingFeedback.id',
        'ratingFeedback.desc',
        'ratingFeedback.rating',

        'companyDetail.id',
        'companyDetail.businessName',

        'account.id',

        'userDetail.id',
        'userDetail.name',
      ])
      .where(
        'ratingFeedback.status = :status AND ratingFeedback.accountId = :accountId',
        {
          status: true,
          accountId: accountId,
        },
      )
      .take(10)
      .getManyAndCount();
    return { result, count };
  }

  async findByUser(dto: FeedbackPaginationDto) {
    const keyword = dto.keyword || '';
    const query = await this.repo
      .createQueryBuilder('ratingFeedback')
      .leftJoinAndSelect('ratingFeedback.companyDetail', 'companyDetail')
      .leftJoinAndSelect('ratingFeedback.account', 'account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'ratingFeedback.id',
        'ratingFeedback.desc',
        'ratingFeedback.rating',
        'ratingFeedback.companyDetailId',
        'ratingFeedback.createdAt',

        'companyDetail.id',
        'companyDetail.businessName',

        'account.id',

        'userDetail.id',
        'userDetail.name',
      ])
      .where('ratingFeedback.status = :status', { status: true });
    if (dto.companyDetailId && dto.companyDetailId.length > 0) {
      query.andWhere('ratingFeedback.companyDetailId = :companyDetailId', {
        companyDetailId: dto.companyDetailId,
      });
    }
    const [result, count] = await query
      .andWhere(
        new Brackets((qb) => {
          qb.andWhere(
            'ratingFeedback.desc LIKE :desc OR companyDetail.businessName LIKE :businessName',
            {
              desc: '%' + keyword + '%',
              businessName: '%' + keyword + '%',
            },
          );
        }),
      )
      .orderBy({ 'ratingFeedback.createdAt': 'DESC' })
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();
    return { result, count };
  }

  async averageRating(companyDetailId: string) {
    try {
      const result = await this.repo
        .createQueryBuilder('ratingFeedback')
        .select('AVG(ratingFeedback.rating)', 'average')
        .where('ratingFeedback.companyDetailId = :companyDetailId', {
          companyDetailId,
        })
        .getRawOne();

      return result.average || 0;
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return 0;
    }
  }

  async averageRatingWithCount(companyDetailId: string) {
    try {
      const result = await this.repo
        .createQueryBuilder('ratingFeedback')
        .select('AVG(ratingFeedback.rating)', 'average')
        .addSelect('COUNT(ratingFeedback.id)', 'count')
        .where('ratingFeedback.companyDetailId = :companyDetailId', {
          companyDetailId,
        })
        .getRawOne();

      return {
        average: result.average || 0,
        count: parseInt(result.count, 10) || 0,
      };
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return {
        average: 0,
        count: 0,
      };
    }
  }

  async ratingDistribution(companyDetailId: string) {
    try {
      const ratings = await this.repo
        .createQueryBuilder('ratingFeedback')
        .select('ratingFeedback.rating', 'rating')
        .addSelect('COUNT(ratingFeedback.rating)', 'count')
        .where('ratingFeedback.companyDetailId = :companyDetailId', {
          companyDetailId: companyDetailId,
        })
        .groupBy('ratingFeedback.rating')
        .getRawMany();

      let totalCount = 0;
      const distribution = {
        excellent: 0, // 5 stars
        good: 0, // 4 and 3 stars
        average: 0, // 2 stars
        poor: 0, // below 2 stars
      };

      for (const ratingData of ratings) {
        const rating = parseFloat(ratingData.rating);
        const count = parseInt(ratingData.count);
        totalCount += count;

        if (rating === 5) {
          distribution.excellent += count;
        } else if (rating === 4 || rating === 3) {
          distribution.good += count;
        } else if (rating === 2) {
          distribution.average += count;
        } else if (rating < 2) {
          distribution.poor += count;
        }
      }

      if (totalCount > 0) {
        distribution.excellent = (distribution.excellent / totalCount) * 100;
        distribution.good = (distribution.good / totalCount) * 100;
        distribution.average = (distribution.average / totalCount) * 100;
        distribution.poor = (distribution.poor / totalCount) * 100;
      }

      return distribution;
    } catch (error) {
      console.error('Error fetching ratings:', error);
      return {
        excellent: 0,
        good: 0,
        average: 0,
        poor: 0,
      };
    }
  }

  async status(id: string, dto: BoolStatusDto) {
    const feedBack = await this.repo.findOne({ where: { id } });
    if (!feedBack) {
      throw new NotAcceptableException('Feedback not found!');
    }
    const obj = Object.assign(feedBack, dto);
    return this.repo.save(obj);
  }

  async remove(id: string) {
    const feedBack = await this.repo.findOne({ where: { id } });
    if (!feedBack) {
      throw new NotAcceptableException('Feedback not found!');
    }
    return this.repo.remove(feedBack);
  }
}
