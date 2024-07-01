import { Module } from '@nestjs/common';
import { RemittanceModule } from './remittance/remittance.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      port: parseInt(process.env.PG_DB_PORT),
      username: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB_NAME,
      entities: [],
      synchronize: true,
    }),
    RemittanceModule
  ]
})
export class AppModule {}
