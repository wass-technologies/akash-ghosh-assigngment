import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Account } from 'src/account/entities/account.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enum';
import { PaginationSDto, UpdateUserDetailDto } from './dto/update-user-details';
import { UserDetailsService } from './user-details.service';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() dto: PaginationSDto) {
    return this.userDetailsService.findAll(dto);
  }

  // @Get('profile')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(...Object.values(UserRole))
  // profile(@CurrentUser() user: Account) {
  //   return this.userDetailsService.getProfile(user.id);
  // }

  // @Patch('user/register')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.CUSTOMER)
  // update(@Body() dto: UpdateUserDetailDto, @CurrentUser() user: Account) {
  //   dto.accountId = user.id;
  //   return this.userDetailsService.update(dto, user.id);
  // }

  

}
