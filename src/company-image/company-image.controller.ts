// import { Controller, Get, Post, Body, Patch, Param, Delete, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFiles, UseGuards, UseInterceptors, Put, UploadedFile } from '@nestjs/common';
// import { CompanyImageService } from './company-image.service';
// import { CreateCompanyImageDto } from './dto/create-company-image.dto';
// import { UpdateCompanyImageDto } from './dto/update-company-image.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Account } from 'src/account/entities/account.entity';

// @Controller('company-image')
// export class CompanyImageController {
//   constructor(private readonly companyImageService: CompanyImageService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   @UseInterceptors(
//     FilesInterceptor('files', 10, {
//       storage: diskStorage({
//         destination: './uploads/companydetail/images',
//         filename: (req, file, callback) => {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           return callback(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )
//   async uploadMultipleFiles(
//     @CurrentUser() user: Account,
//     @UploadedFiles(
//       new ParseFilePipe({
//         validators: [
//           new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
//           new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
//         ],
//       }),
//     )
//     files: Express.Multer.File[],
//   ) {    
//     const uploadPromises = files.map((file) =>
//       this.companyImageService.create(user.id, file.path)
//     );    
//     return Promise.all(uploadPromises);
//   }

//   @Put('updateMedia/:id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads/companydetail/images',
//         filename: (req, file, callback) => {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           return callback(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )
//   async updateImage(
//     @Param('id') id: string,
//     @UploadedFile(
//       new ParseFilePipe({
//         validators: [
//           new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
//           new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
//         ],
//       }),
//     )
//     file: Express.Multer.File,
//   ) {
//     const fileData = await this.companyImageService.findOne(id);
//     return this.companyImageService.updateImage(file.path, fileData);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   remove(@Param('id') id: string) {
//     return this.companyImageService.remove(id);
//   }
// }
