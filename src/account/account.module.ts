import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MenusModule } from 'src/menus/menus.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserPermissionsModule } from 'src/user-permissions/user-permissions.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { RatingFeedbackModule } from 'src/rating-feedback/rating-feedback.module';
import { SearchHistoryModule } from 'src/search-history/search-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    AuthModule,
    MenusModule,
    PermissionsModule,
    UserPermissionsModule,
    RatingFeedbackModule,
    SearchHistoryModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
