// import {
//   Body,
//   Controller,
//   Delete,
//   Param,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiOperation } from '@nestjs/swagger';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';
// import { CompanySubCategoryService } from './company-sub-category.service';
// import { CompanySubCategoryDto } from './dto/company-sub-category.dto';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Account } from 'src/account/entities/account.entity';

// @Controller('company-sub-category')
// export class CompanySubCategoryController {
//   constructor(
//     private readonly companySubCategoryService: CompanySubCategoryService,
//   ) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   create(@CurrentUser() user: Account, @Body() dto: CompanySubCategoryDto) {
//     dto.accountId = user.id;
//     return this.companySubCategoryService.create(dto);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   remove(@Param('id') id: string) {
//     return this.companySubCategoryService.remove(id);
//   }
// }
