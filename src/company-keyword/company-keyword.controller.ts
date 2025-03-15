// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
// import { CompanyKeywordService } from './company-keyword.service';
// import { CreateCompanyKeywordDto } from './dto/create-company-keyword.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Account } from 'src/account/entities/account.entity';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

// @Controller('company-keyword')
// export class CompanyKeywordController {
//   constructor(private readonly companyKeywordService: CompanyKeywordService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   create(@Body() dto: CreateCompanyKeywordDto, @CurrentUser() user: Account) {
//     return this.companyKeywordService.create(dto,user.id);
//   }

//   @Get()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   findAll(@Query() dto: CommonPaginationDto, @CurrentUser() user: Account) {
//     return this.companyKeywordService.findAll(dto, user.id);
//   }

//   // @Get()
//   // findOne(@Query() dto: CommonPaginationDto) {
//   //   return this.companyKeywordService.findOne(dto);
//   // }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   remove(@Param('id') id: string, @CurrentUser() user: Account) {
//     return this.companyKeywordService.remove(id, user.id);
//   }
// }
