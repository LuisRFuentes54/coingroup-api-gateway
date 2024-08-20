import { Module } from '@nestjs/common';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';
import { RemittancePGRepository } from "./remittance.pg.repository";

@Module({
  controllers: [RemittanceController],
  providers: [RemittanceService, RemittancePGRepository]
})
export class RemittanceModule {}
