import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
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
import {} from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { UserRole } from 'src/enum';
import { PaginationSDto, StateDto } from './dto/state.dto';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: StateDto) {
    return this.stateService.create(dto);
  }

  @Get('list/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() query: PaginationSDto) {
    const keyword = query.keyword || '';
    return this.stateService.findAll(
      query.limit,
      query.offset,
      keyword,
      query.status,
    );
  }

  @Get('list')
  find(@Query() query: PaginationSDto) {
    const keyword = query.keyword || '';
    return this.stateService.find(query.limit, query.offset, keyword);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: StateDto) {
    return this.stateService.update(+id, dto);
  }

  @Put('status/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  status(@Param('id') id: string, @Body() dto: BoolStatusDto) {
    return this.stateService.status(+id, dto);
  }
}
