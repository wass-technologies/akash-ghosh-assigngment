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
import { RegisterUserDto } from './dto/register.dto';

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

 


  async register(registerUserDto:RegisterUserDto) {
    // Ensure AccountService is injected in the constructor
    const existingUser = await this.repo.findOne({
      where: { email: registerUserDto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
  
    // Default to ADMIN if no role is provided
    const role = registerUserDto.role || UserRole.ADMIN;
  
    // If the role is ADMIN, check if an admin already exists
    if (role === UserRole.ADMIN) {
      const adminExists = await this.repo.count({ where: { roles: UserRole.ADMIN } });
  
      if (adminExists > 0) {
        throw new ConflictException('An admin already exists. Remove the existing admin before registering a new one.');
      }
    }
  
    
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
  
    
    const user = this.repo.create({
      ...registerUserDto,
      password: hashedPassword,
      roles: role, // Assign the determined role
    });
  
    return this.repo.save(user);
  }
  
    
  async signIn(loginId: string, password: string) {
    const admin = await this.getUserDetails(loginId, UserRole.ADMIN);
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await APIFeatures.assignJwtToken(admin.id, this.jwtService);
    return { token };
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
    if (!role && role == UserRole.RESATAURANT) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.RESATAURANT, UserRole.STAFF],
      });
    }
    if (!role && role == UserRole.ADMIN) {
      query.where('account.roles IN (:...roles)', {
        roles: UserRole.ADMIN, 
      });
    }
    const result = await query
      .andWhere('account.id = :id OR account.email = :emailr', {
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
