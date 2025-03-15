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
import { AreaService } from './area.service';
import { AreaDto, PaginationSDto, UpdateAreaDto } from './dto/area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: AreaDto) {
    return this.areaService.create(dto);
  }

  @Get('list/all/:cityId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() query: PaginationSDto, @Param('cityId') cityId: string) {
    const keyword = query.keyword || '';
    return this.areaService.findAll(
      query.limit,
      query.offset,
      keyword,
      query.status,
      +cityId,
    );
  }

  @Get('list/:cityId')
  find(@Query() query: PaginationSDto, @Param('cityId') cityId: string) {
    const keyword = query.keyword || '';
    return this.areaService.find(query.limit, query.offset, keyword, +cityId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateAreaDto) {
    return this.areaService.update(+id, dto);
  }

  @Put('status/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  status(@Param('id') id: string, @Body() dto: BoolStatusDto) {
    return this.areaService.status(+id, dto);
  }
}
