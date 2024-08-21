import { Module } from '@nestjs/common';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';
import { RemittancePGRepository } from "./remittance.pg.repository";
import { MulterModule } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Directorio donde se guardarán los archivos
    }),
  ],
  controllers: [RemittanceController],
  providers: [RemittanceService, RemittancePGRepository]
})
export class RemittanceModule {}
