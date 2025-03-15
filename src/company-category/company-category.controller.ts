// import {
//   Body,
//   Controller,
//   Delete,
//   Param,
//   Post,
//   Put,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiOperation } from '@nestjs/swagger';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';
// import { CompanyCategoryService } from './company-category.service';
// import { CompanyCategoryDto } from './dto/company-category.dto';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Account } from 'src/account/entities/account.entity';

// @Controller('company-category')
// export class CompanyCategoryController {
//   constructor(
//     private readonly companyCategoryService: CompanyCategoryService,
//   ) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   create(@Body() dto: CompanyCategoryDto, @CurrentUser() user: Account) {
//     dto.accountId = user.id;
//     return this.companyCategoryService.create(dto, user.id);
//   }

//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   offer(@Param('id') id: string, @Body() offer: any){
//     return this.companyCategoryService.offer(id, offer);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   remove(@Param('id') id: string) {
//     return this.companyCategoryService.remove(id);
//   }
// }
