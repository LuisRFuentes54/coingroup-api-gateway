import { Module } from '@nestjs/common';
import { RemittanceModule } from './remittance/remittance.module';

@Module({
  imports: [RemittanceModule]
})
export class AppModule {}
