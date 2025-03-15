import { Module } from '@nestjs/common';
import { EmailSubscribersService } from './email-subscribers.service';
import { EmailSubscribersController } from './email-subscribers.controller';
import { EmailSubscriber } from './entities/email-subscriber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSubscriber]), AuthModule],
  controllers: [EmailSubscribersController],
  providers: [EmailSubscribersService],
})
export class EmailSubscribersModule {}
