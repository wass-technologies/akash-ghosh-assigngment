// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Put,
// } from '@nestjs/common';
// import { CompanyScheduleService } from './company-schedule.service';
// import { CreateCompanyScheduleDto } from './dto/create-company-schedule.dto';
// import { UpdateCompanyScheduleDto } from './dto/update-company-schedule.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { UserRole } from 'src/enum';
// import { BoolStatusDto } from 'src/common/dto/bool-status.dto';

// @Controller('company-schedule')
// export class CompanyScheduleController {
//   constructor(
//     private readonly companyScheduleService: CompanyScheduleService,
//   ) {}

//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'))
//   @Roles(UserRole.VENDOR)
//   update(@Param('id') id: string, @Body() dto: UpdateCompanyScheduleDto) {
//     return this.companyScheduleService.update(id, dto);
//   }
  
//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'))
//   @Roles(UserRole.VENDOR)
//   status(@Param('id') id: string, @Body() dto: BoolStatusDto) {
//     return this.companyScheduleService.status(id, dto);
//   }
// }
