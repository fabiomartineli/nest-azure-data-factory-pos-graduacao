import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitOfWork } from '../config/base/unit-of-work';
import { ConfigService } from '@nestjs/config';
import { ContractFileSchema } from '../config/mapping/contract-file.schema';
import { ContractSchema } from '../config/mapping/contract.schema';
import { ContractFileDataSchema } from '../config/mapping/contract-file.schema-data';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (_: ConfigService) => ({
        type: 'mongodb',
        url: process.env.MONGODB_CONNECTION_STRING,
        autoLoadEntities: false,
        poolSize: 10,
        entities: [ContractFileSchema, ContractSchema, ContractFileDataSchema],
        synchronize: false,
      })
    }),
  ],
  providers: [UnitOfWork],
  exports: [UnitOfWork],
})
export class InfraDataModule {
}