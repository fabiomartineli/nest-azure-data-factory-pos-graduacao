import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContractFileModule } from './03.infra/03.00.crosscuting/modules/contract-file.module';
import { ContractModule } from './03.infra/03.00.crosscuting/modules/contract.module';
import { AppConfigurationModule } from './03.infra/03.03.app-configuration/ioc/app-configuration.module';
import { SseEventModule } from './03.infra/03.00.crosscuting/modules/sse-event.module';
import { StorageModule } from './03.infra/03.00.crosscuting/modules/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true
    }),
    AppConfigurationModule,
    ContractFileModule,
    ContractModule,
    SseEventModule,
    StorageModule,
  ],
})
export class AppModule {}
