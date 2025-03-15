// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
//   Put,
//   Req,
//   Res,
// } from '@nestjs/common';
// import { LeedService } from './leed.service';
// import {
//   CreateLeedDto,
//   LeedPaginationDto,
//   PdfLeadPaginationDto,
// } from './dto/create-leed.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Account } from 'src/account/entities/account.entity';
// import { Response } from 'express';
// import { createTable } from 'src/utils/createTable.utils';

// @Controller('leed')
// export class LeedController {
//   constructor(private readonly leedService: LeedService) {}

//   @Post(':companyDetailId')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.USER)
//   create(
//     @Param('companyDetailId') companyDetailId: string,
//     @Body() dto: CreateLeedDto,
//     @CurrentUser() user: Account,
//   ) {
//     return this.leedService.create(dto, companyDetailId, user.id);
//   }

//   @Get()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   findAll(@Query() dto: LeedPaginationDto, @CurrentUser() user: Account) {
//     return this.leedService.findAll(dto, user.companyDetail[0].id);
//   }
  
//   @Get('user')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.USER)
//   findByUser(@Query() dto: LeedPaginationDto, @CurrentUser() user: Account) {
//     return this.leedService.findByUser(dto, user.id);
//   }

//   @Get('pdf')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   async pdf(
//     @Res() res: Response,
//     @Query() dto: PdfLeadPaginationDto,
//     @CurrentUser() user: Account,
//   ) {
//     const payload = await this.leedService.pdf(dto, user.companyDetail[0].id);        

//     const pdf = await createTable(payload);
//     const name = Date.now().toString() + '-lead.pdf';
//     res.setHeader('Content-Type', 'application/pdf');
//     res.set('Content-Disposition', `attachment; filename="${name}"`);
//     pdf.pipe(res);
//     pdf.end();
//   }

//   @Get('count')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   count(@CurrentUser() user: Account) {
//     return this.leedService.leedCount(user.companyDetail[0].id);
//   }

//   @Get('admin/:companyDetailId')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN)
//   findByAdmin(
//     @Param('companyDetailId') companyDetailId: string,
//     @Query() dto: LeedPaginationDto,
//   ) {
//     return this.leedService.findByAdmin(dto, companyDetailId);
//   }

//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   status(@Param('id') id: string, @CurrentUser() user: Account) {
//     return this.leedService.status(id, user.companyDetail[0].id);
//   }
// }
