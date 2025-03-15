import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Account } from 'src/account/entities/account.entity';
import { CompanyDetail } from 'src/company-details/entities/company-detail.entity';
import { LogType, LoginType, UserRole } from 'src/enum';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { Repository } from 'typeorm';
import { CreateDetailDto, StaffLoinDto } from './dto/login.dto';
import { companyScheduleData } from 'src/week-schedule';
//import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { AccountService } from './../account/account.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(LoginHistory)
    private readonly logRepo: Repository<LoginHistory>,
    @InjectRepository(UserPermission)
    private readonly upRepo: Repository<UserPermission>,
    @InjectRepository(CompanyDetail)
    private readonly companyDetailRepo: Repository<CompanyDetail>,
   // @InjectRepository(CompanySchedule)
    //private readonly companyScheduleRepo: Repository<CompanySchedule>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepo: Repository<UserDetail>,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

 


  async register(registerDto: RegisterDto): Promise<Account> {
    // ✅ Check if the user already exists
    const existingUser = await this.repo.findOne({ where: { email: registerDto.email } });
    if (existingUser) {
        throw new ConflictException('User with this email already exists');
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // ✅ Create new account with role from DTO or default 'User'
    const account = this.repo.create({
        email: registerDto.email,
        password: hashedPassword,
        roles: registerDto.roles || UserRole.CUSTOMER,  // 👈 If role is not provided, default to 'User'
    });

    return await this.repo.save(account);
}

  
  
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
  
    // ✅ Find user by email
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // ✅ Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // ✅ Generate JWT token
    const payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);
  
    return { accessToken };
  }


  
  async userLogin(loginId: string, roles: UserRole) {
    let user = await this.repo.findOne({
      where: { email: loginId, roles: roles },
    });
    
      return { loginId };
    }

  // async createOrUpdate(dto: CreateDetailDto) {
  //   const result = await this.userDetailRepo.findOne({
  //     where: { accountId: dto.accountId },
  //   });
  //   if (result) {
  //     const obj = Object.assign(result, dto);
  //     return this.userDetailRepo.save(obj);
  //   } else {
  //     const obj = Object.create(dto);
  //     return this.userDetailRepo.save(obj);
  //   }
  // }

  // async createOrUpdateVendor(dto: CreateDetailDto) {
  //   const result = await this.companyDetailRepo.findOne({
  //     where: { accountId: dto.accountId },
  //   });
  //   if (result) {
  //     const obj = Object.assign(result, dto);
  //     const companyDetail = await this.companyDetailRepo.save(obj);
  //     this.updateSchedule(companyDetail.id);
  //   } else {
  //     const obj = Object.create(dto);
  //     const companyDetail = await this.companyDetailRepo.save(obj);
  //     this.updateSchedule(companyDetail.id);
  //   }
  //}




  validate(id: string) {
    return this.getUserDetails(id);
  }

  findPermission(accountId: string) {
    return this.getPermissions(accountId);
  }

  private getPermissions = async (accountId: string): Promise<any> => {
    let result = await this.cacheManager.get('userPermission' + accountId);
    if (!result) {
      result = await this.upRepo.find({
        relations: ['permission', 'menu'],
        where: { accountId, status: true },
      });
      this.cacheManager.set(
        'userPermission' + accountId,
        result,
        7 * 24 * 60 * 60 * 1000,
      );
    }
    return result;
  };

  private getUserDetails = async (
    id: string,
    role?: UserRole,
  ): Promise<any> => {
    // let result = await this.cacheManager.get('userDetail' + id);
    // if (!result) {
    const query = this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'account.id',
        'account.email',
        'account.password',
        'account.roles',
        'account.status',
        'account.createdBy',
        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.status',
        'userDetail.id',
        'userDetail.name',
      ]);
    if (!role && role == UserRole.CUSTOMER) {
      query.where('account.roles = :roles', { roles: UserRole.CUSTOMER });
    }
    if (!role && role == UserRole.RESTAURANT) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.RESTAURANT, UserRole.STAFF],
      });
    }
    if (!role && role == UserRole.ADMIN) {
      query.where('account.roles IN (:...roles)', {
        roles: UserRole.ADMIN, 
      });
    }
    const result = await query
      .andWhere('account.id = :id OR account.email = :email', {
        id: id,
        email: id,
      })
      .getOne();
    // this.cacheManager.set('userDetail' + id, result, 7 * 24 * 60 * 60 * 1000);
    // }
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };
}