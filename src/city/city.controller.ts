import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { UserRole } from 'src/enum';
import { CityService } from './city.service';
import { CityDto, PaginationSDto, UpdateCityDto } from './dto/city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CityDto) {
    return this.cityService.create(dto);
  }

  @Get('all')
  findList() {
    return this.cityService.findListAll();
  }

  @Get('list/all/:stateId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() query: PaginationSDto, @Param('stateId') stateId: string) {
    const keyword = query.keyword || '';
    return this.cityService.findAll(
      query.limit,
      query.offset,
      keyword,
      query.status,
      +stateId,
    );
  }

  @Get('list/:stateId')
  find(@Query() query: PaginationSDto, @Param('stateId') stateId: string) {
    const keyword = query.keyword || '';
    return this.cityService.find(query.limit, query.offset, keyword, +stateId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.cityService.update(+id, dto);
  }

  @Put('status/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  status(@Param('id') id: string, @Body() dto: BoolStatusDto) {
    return this.cityService.status(+id, dto);
  }
}
