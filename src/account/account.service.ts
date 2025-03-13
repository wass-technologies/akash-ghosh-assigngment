import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyStatus } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import { BusinessPaginationDto, PaginationDto } from './dto/account.dto';
import { Account } from './entities/account.entity';
import { RatingFeedbackService } from 'src/rating-feedback/rating-feedback.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    private readonly ratingFeedbackService: RatingFeedbackService,
  ) {}

  async profile(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('companyDetail.companySchedule', 'companySchedule')
      .leftJoinAndSelect('account.companyCategory', 'companyCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .leftJoinAndSelect('account.companySubCategory', 'companySubCategory')
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('account.companyImage', 'companyImage')
      .leftJoinAndSelect('account.companyKeyword', 'companyKeyword')
      .select([
        'account.id',
        'account.phoneNumber',
        'account.roles',
        'account.status',
        'account.createdAt',

        'companyDetail.id',
        'companyDetail.minPrice',
        'companyDetail.maxPrice',
        'companyDetail.name',
        'companyDetail.email',
        'companyDetail.businessName',
        'companyDetail.address1',
        'companyDetail.address2',
        'companyDetail.state',
        'companyDetail.city',
        'companyDetail.area',
        'companyDetail.pincode',
        'companyDetail.businessDesc',
        'companyDetail.profile',
        'companyDetail.fbLink',
        'companyDetail.wpLink',
        'companyDetail.instaLink',
        'companyDetail.callNumber',
        'companyDetail.profileId',
        'companyDetail.status',
        'companyDetail.createdAt',

        'companySchedule.id',
        'companySchedule.name',
        'companySchedule.time_start',
        'companySchedule.time_end',
        'companySchedule.status',

        'companyCategory.id',
        'companyCategory.offer',
        'companyCategory.isOffer',
        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.categoryId',
        'subCategory.name',
        'subCategory.image',
        'subCategory.status',

        'companyImage.id',
        'companyImage.file',
        'companyImage.createdAt',

        'companyKeyword.id',
        'companyKeyword.keyword',
      ])
      .where('account.id = :id AND companyDetail.status = :status', {
        id: id,
        status: CompanyStatus.APPROVED,
      })
      .getOne();
    if (!result) {
      throw new NotFoundException('Profile Not Found!');
    }
    const averageRating =
      await this.ratingFeedbackService.averageRatingWithCount(
        result.companyDetail[0].id,
      );
    const ratingGraph = await this.ratingFeedbackService.ratingDistribution(
      result.companyDetail[0].id,
    );
    return {
      result,
      averageRating: parseFloat(averageRating.average),
      reviewCount: averageRating.count,
      ratingGraph,
    };
  }

  async detail(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('account.companyCategory', 'companyCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .leftJoinAndSelect('account.companySubCategory', 'companySubCategory')
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('account.companyImage', 'companyImage')
      .leftJoinAndSelect('account.companyKeyword', 'companyKeyword')
      .leftJoinAndSelect(
        'companyDetail.companySchedule',
        'companySchedule',
        'companySchedule.status = :scheduleStatus',
        { scheduleStatus: true },
      )
      .select([
        'account.id',
        'account.phoneNumber',
        'account.roles',
        'account.status',
        'account.createdAt',

        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.email',
        'companyDetail.businessName',
        'companyDetail.address1',
        'companyDetail.address2',
        'companyDetail.state',
        'companyDetail.city',
        'companyDetail.area',
        'companyDetail.pincode',
        'companyDetail.businessDesc',
        'companyDetail.minPrice',
        'companyDetail.maxPrice',
        'companyDetail.profile',
        'companyDetail.fbLink',
        'companyDetail.wpLink',
        'companyDetail.instaLink',
        'companyDetail.callNumber',
        'companyDetail.profileId',
        'companyDetail.status',
        'companyDetail.createdAt',

        'companySchedule.id',
        'companySchedule.name',
        'companySchedule.time_start',
        'companySchedule.time_end',
        'companySchedule.status',

        'companyCategory.id',
        'companyCategory.offer',
        'companyCategory.isOffer',
        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.categoryId',
        'subCategory.name',
        'subCategory.image',
        'subCategory.status',

        'companyImage.id',
        'companyImage.file',
        'companyImage.createdAt',

        'companyKeyword.id',
        'companyKeyword.keyword',
      ])
      .where('account.id = :id', {
        id: id,
      })
      .getOne();
    if (!result) {
      throw new NotFoundException('Profile Not Found!');
    }
    const averageRating =
      await this.ratingFeedbackService.averageRatingWithCount(
        result.companyDetail[0].id,
      );
    const ratingGraph = await this.ratingFeedbackService.ratingDistribution(
      result.companyDetail[0].id,
    );
    return {
      result,
      averageRating: parseFloat(averageRating.average),
      reviewCount: averageRating.count,
      ratingGraph,
    };
  }

  async detailByUser(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('account.companyCategory', 'companyCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .leftJoinAndSelect('account.companySubCategory', 'companySubCategory')
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('account.companyImage', 'companyImage')
      .leftJoinAndSelect(
        'companyDetail.companySchedule',
        'companySchedule',
        'companySchedule.status = :scheduleStatus',
        { scheduleStatus: true },
      )
      .select([
        'account.id',
        'account.phoneNumber',
        'account.roles',
        'account.status',
        'account.createdAt',

        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.email',
        'companyDetail.businessName',
        'companyDetail.address1',
        'companyDetail.address2',
        'companyDetail.state',
        'companyDetail.city',
        'companyDetail.area',
        'companyDetail.pincode',
        'companyDetail.businessDesc',
        'companyDetail.minPrice',
        'companyDetail.maxPrice',
        'companyDetail.profile',
        'companyDetail.fbLink',
        'companyDetail.wpLink',
        'companyDetail.instaLink',
        'companyDetail.callNumber',
        'companyDetail.profileId',
        'companyDetail.status',
        'companyDetail.createdAt',

        'companySchedule.id',
        'companySchedule.name',
        'companySchedule.time_start',
        'companySchedule.time_end',
        'companySchedule.status',

        'companyCategory.id',
        'companyCategory.offer',
        'companyCategory.isOffer',
        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.categoryId',
        'subCategory.name',
        'subCategory.image',
        'subCategory.status',

        'companyImage.id',
        'companyImage.file',
        'companyImage.createdAt',
      ])
      .where('account.id = :id AND companyDetail.status = :status', {
        id: id,
        status: CompanyStatus.APPROVED,
      })
      .getOne();
    if (!result) {
      throw new NotFoundException('Profile Not Found!');
    }
    const averageRating =
      await this.ratingFeedbackService.averageRatingWithCount(
        result.companyDetail[0].id,
      );
    const ratingGraph = await this.ratingFeedbackService.ratingDistribution(
      result.companyDetail[0].id,
    );
    return {
      result,
      averageRating: parseFloat(averageRating.average),
      reviewCount: averageRating.count,
      ratingGraph,
    };
  }

  async findAll(dto: PaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('account.companyCategory', 'companyCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .leftJoinAndSelect('account.companySubCategory', 'companySubCategory')
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('account.companyImage', 'companyImage')
      .leftJoinAndSelect('account.companyKeyword', 'companyKeyword')
      .leftJoinAndSelect(
        'companyDetail.companySchedule',
        'companySchedule',
        'companySchedule.status = :scheduleStatus',
        { scheduleStatus: true },
      )
      .select([
        'account.id',
        'account.phoneNumber',
        'account.roles',
        'account.status',
        'account.createdAt',

        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.email',
        'companyDetail.businessName',
        'companyDetail.address1',
        'companyDetail.address2',
        'companyDetail.state',
        'companyDetail.city',
        'companyDetail.area',
        'companyDetail.pincode',
        'companyDetail.profile',
        'companyDetail.callNumber',
        'companyDetail.profileId',
        'companyDetail.minPrice',
        'companyDetail.maxPrice',
        'companyDetail.status',
        'companyDetail.createdAt',

        'companySchedule.id',
        'companySchedule.name',
        'companySchedule.time_start',
        'companySchedule.time_end',
        'companySchedule.status',

        'companyCategory.id',
        'companyCategory.offer',
        'companyCategory.isOffer',

        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.categoryId',
        'subCategory.name',
        'subCategory.image',
        'subCategory.status',

        'companyImage.id',
        'companyImage.file',
        'companyImage.createdAt',

        'companyKeyword.id',
        'companyKeyword.keyword',
      ])
      .where('companyDetail.status = :status', {
        status: dto.status,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'account.phoneNumber LIKE :phoneNumber OR companyDetail.name LIKE :dname',
            {
              phoneNumber: '%' + keyword + '%',
              dname: '%' + keyword + '%',
            },
          );
        }),
      )
      .orderBy({ 'companyDetail.name': 'ASC' })
      .skip(dto.offset)
      .take(dto.limit)
      .getManyAndCount();

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const details = Array.isArray(element.companyDetail)
        ? element.companyDetail
        : [element.companyDetail];

      let totalRating = 0;
      let detailCount = 0;

      for (const detail of details) {
        if (detail) {
          const averageRating = await this.ratingFeedbackService.averageRating(
            detail.id,
          );
          totalRating += averageRating;
          detailCount++;
        }
      }
      element['averageRating'] =
        detailCount > 0 ? totalRating / detailCount : 0;
    }

    return { result, total };
  }

  async findAllByUser(dto: BusinessPaginationDto) {
    const minPrice = dto.minPrice === 0 ? 0 : dto.minPrice;
    const maxPrice = dto.maxPrice === 0 ? 10000000000000 : dto.maxPrice;
    const timeStart = dto.timeStart || '00:00:00';
    const timeEnd = dto.timeEnd || '23:59:59';
    const keyword = dto.keyword || '';
    const query = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect(
        'account.companyDetail',
        'companyDetail',
        'companyDetail.status = :status',
        { status: CompanyStatus.APPROVED },
      )
      .leftJoinAndSelect('account.companyCategory', 'companyCategory')
      .leftJoinAndSelect('companyCategory.category', 'category')
      .leftJoinAndSelect('account.companySubCategory', 'companySubCategory')
      .leftJoinAndSelect('companySubCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('account.companyImage', 'companyImage')
      .leftJoinAndSelect('account.companyKeyword', 'companyKeyword')
      .leftJoinAndSelect(
        'companyDetail.companySchedule',
        'companySchedule',
        'companySchedule.status = :scheduleStatus',
        { scheduleStatus: true },
      )
      .select([
        'account.id',

        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.businessName',
        'companyDetail.address1',
        'companyDetail.address2',
        'companyDetail.state',
        'companyDetail.city',
        'companyDetail.area',
        'companyDetail.pincode',
        'companyDetail.profile',
        'companyDetail.callNumber',
        'companyDetail.minPrice',
        'companyDetail.maxPrice',
        'companyDetail.status',
        'companyDetail.createdAt',

        'companyCategory.id',
        'companyCategory.categoryId',
        'companyCategory.offer',
        'companyCategory.isOffer',

        'category.id',
        'category.name',
        'category.image',
        'category.status',
        'category.type',

        'companySubCategory.id',
        'subCategory.id',
        'subCategory.categoryId',
        'subCategory.name',
        'subCategory.image',
        'subCategory.status',

        'companySchedule.id',
        'companySchedule.name',
        'companySchedule.time_start',
        'companySchedule.time_end',
        'companySchedule.status',

        'companyImage.id',
        'companyImage.file',
        'companyImage.createdAt',

        'companyKeyword.id',
        'companyKeyword.keyword',
      ])
      .where(
        'companyDetail.minPrice >= :minPrice AND companyDetail.maxPrice <= :maxPrice',
        {
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      );
    if (dto.categoryId && dto.categoryId.length > 0) {
      query.andWhere('companyCategory.categoryId = :categoryId', {
        categoryId: dto.categoryId,
      });
    }
    if (dto.timeStart && dto.timeEnd) {
      query.andWhere(
        'companySchedule.time_start >= :timeStart AND companySchedule.time_end <= :timeEnd',
        {
          timeStart: timeStart,
          timeEnd: timeEnd,
        },
      );
    }
    if (dto.offer && dto.offer.length > 0) {
      query.andWhere('companyCategory.isOffer = :offer', {
        offer: dto.offer,
      });
    }
    query.andWhere(
      new Brackets((qb) => {
        qb.where('companyKeyword.keyword LIKE :keyword', {
          keyword: '%' + keyword + '%',
        });
      }),
    );
    const [result, total] = await query
      .orderBy({ 'companyDetail.name': 'ASC' })
      .skip(dto.offset)
      .take(dto.limit)
      .getManyAndCount();

    // for (let index = 0; index < result.length; index++) {
    //   const element = result[index];
    //   const detail = element.companyDetail?.[index];
    //   console.log(detail, "==>detail");

    //   // const averageRating = await this.ratingFeedbackService.averageRating(
    //   //   detail.id,
    //   // );
    //   // element['averageRating'] = averageRating;
    //   if (!detail) {
    //     element['averageRating'] = 0;
    //     console.log(element.companyDetail,element['averageRating'], "==> 2nd");
    //   } else {
    //     const averageRating = await this.ratingFeedbackService.averageRating(detail.id);
    //     element['averageRating'] = averageRating;
    //     console.log( element.companyDetail,element['averageRating'], "===> 1st");
    //   }
    // }
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const details = Array.isArray(element.companyDetail)
        ? element.companyDetail
        : [element.companyDetail];

      let totalRating = 0;
      let detailCount = 0;

      for (const detail of details) {
        if (detail) {
          const averageRating = await this.ratingFeedbackService.averageRating(
            detail.id,
          );
          totalRating += averageRating;
          detailCount++;
        }
      }
      element['averageRating'] =
        detailCount > 0 ? totalRating / detailCount : 0;
    }

    const filteredResults =
      dto.minRating || dto.maxRating
        ? result.filter((elm) => {
            const averageRating = elm['averageRating'];
            return (
              (!dto.minRating || averageRating > dto.minRating) &&
              (!dto.maxRating || averageRating <= dto.maxRating)
            );
          })
        : result;

    return { result: filteredResults, total: filteredResults.length };
  }

  async userProfile(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'account.id',
        'account.phoneNumber',
        'account.roles',
        'account.status',
        'account.createdAt',

        'userDetail.id',
        'userDetail.name',
        'userDetail.email',
        'userDetail.city',
        'userDetail.interest',
        'userDetail.wpNo',
        'userDetail.profile',
      ])
      .where('account.id = :id', { id: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('Profile Not Found!');
    }
    return result;
  }
}
