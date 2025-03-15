import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area]), AuthModule],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
