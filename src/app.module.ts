import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
//import { BannerModule } from './banner/banner.module';
import { BlogsModule } from './blogs/blogs.module';
//import { CategoryModule } from './category/category.module';
import { CompanyDetailsModule } from './company-details/company-details.module';
//import { ContactUsModule } from './contact-us/contact-us.module';
//import { DashboardModule } from './dashboard/dashboard.module';
//import { EmailSubscribersModule } from './email-subscribers/email-subscribers.module';
import { FaqsModule } from './faqs/faqs.module';
//import { LanguagesModule } from './languages/languages.module';
//import { LoginHistoryModule } from './login-history/login-history.module';
import { MenusModule } from './menus/menus.module';
//import { NotificationsModule } from './notifications/notifications.module';
import { PagesModule } from './pages/pages.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SearchHistoryModule } from './search-history/search-history.module';


import { UserDetailsModule } from './user-details/user-details.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
//import { AreaModule } from './area/area.module';
//import { CompanyCategoryModule } from './company-category/company-category.module';
//import { CompanySubCategoryModule } from './company-sub-category/company-sub-category.module';
//import { CompanyKeywordModule } from './company-keyword/company-keyword.module';
//import { CompanyImageModule } from './company-image/company-image.module';
// import { LeedModule } from './leed/leed.module';
// import { RatingFeedbackModule } from './rating-feedback/rating-feedback.module';
// import { CompanyScheduleModule } from './company-schedule/company-schedule.module';
// //import { CallHistoryModule } from './call-history/call-history.module';
// import { BannerCategoryModule } from './banner-category/banner-category.module';
// import { MenuModule } from './menu/menu.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads directory
      serveRoot: '/uploads', // The URL path to access the files
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BL_DB_HOST,
      port: Number(process.env.BL_DB_PORT),
      username: process.env.BL_USER_NAME,
      password: process.env.BL_DB_PASS,
      database: process.env.BL_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:false,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    AccountModule,
    //DashboardModule,
    FaqsModule,
    //SettingsModule,
    //BannerModule,
    //LoginHistoryModule,
    MenusModule,
    //NotificationsModule,
    PermissionsModule,
    UserPermissionsModule,
    UserDetailsModule,
    //CategoryModule,
    CompanyDetailsModule,
    //PagesModule,
    SearchHistoryModule,
    //LanguagesModule,
    //EmailSubscribersModule,
    //BlogsModule,
    //ContactUsModule,
    //SubCategoryModule,
    ////StateModule,
    //CityModule,
    //AreaModule,
    //CompanyCategoryModule,
    //CompanySubCategoryModule,
    //CompanyKeywordModule,
   // CompanyImageModule,
    //LeedModule,
    //RatingFeedbackModule,
    //CompanyScheduleModule,
   //CallHistoryModule,
    //BannerCategoryModule,
    //MenuModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
