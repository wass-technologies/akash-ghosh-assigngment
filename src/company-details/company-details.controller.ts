import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes, ValidationPipe, BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Account } from 'src/account/entities/account.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, UserRole } from 'src/enum';
import { CompanyDetailsService } from './company-details.service';
import {
  CompanyDetailDto,
  StatusDto,
} from './dto/company-detail.dto';
import { CompanyStatus } from 'src/enum';


@Controller('resataurant-details')
export class CompanyDetailsController {
  constructor(private readonly companyDetailsService: CompanyDetailsService) {}

  @Patch('update')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.RESTAURANT)
  async updateCompanyDetails(
    @CurrentUser() user: Account,
    @Body() dto: CompanyDetailDto
  ) {
    return this.companyDetailsService.updateCompanyDetails(user.id, dto);
  }
  

  // @Patch(':id/status')
  // @UseGuards(RolesGuard)
  // @Roles('admin')  // ✅ Only Admin can update company status
  // async updateStatus(
  //   @Param('id') companyId: string,
  //   @Body() { status }: { status: CompanyStatus }
  // ) {
  //   return this.companyDetailsService.updateStatus(companyId, status);
  // }
  
  


  // @Put('profile')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.VENDOR)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads/companyDetail/profile',
  //       filename: (req, file, callback) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         return callback(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async profileImage(
  //   @CurrentUser() user: Account,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   const fileData = await this.companyDetailsService.findCompany(user.id);
  //   return this.companyDetailsService.profileImage(file.path, fileData);
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'For Admin' })
  // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  // @Roles(UserRole.ADMIN)
  // @CheckPermissions([PermissionAction.UPDATE, 'company_detail'])
  // status(@Param('id') id: string, @Body() dto: StatusDto) {
  //   return this.companyDetailsService.status(id, dto);
  // }
}