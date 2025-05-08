import { Logger, Module } from "@nestjs/common";
import { ContractFileFailedHandler } from "src/02.application/commands/events/contract-file-failed.handler";
import { ContractFileSuccessHandler } from "src/02.application/commands/events/contract-file-success.handler";
import { ContractFileCreateHandler } from "src/02.application/commands/requests/contract-file-create.handler";
import { ContractFileFailHandler } from "src/02.application/commands/requests/contract-file-fail.handler";
import { ContractFileFinishHandler } from "src/02.application/commands/requests/contract-file-finish.handler";
import { ContractFileGetAllHandler } from "src/02.application/queries/contract-file-get-all.handler";
import { InfraDataModule } from "src/03.infra/03.01.data/ioc/infra-data.module";
import { ContractFileDataRepository } from "src/03.infra/03.01.data/repositories/contract-file-data.repository";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";
import { MessageBusModule } from "src/03.infra/03.02.message-bus/ioc/message-bus.module";
import { ContractFileController } from "src/04.api/controllers/contract-file.controller";
import { ContractFileFailedSubscriber } from "src/04.api/message-bus-subscribers/contract-file-failed.subscriber";
import { ContractFileSuccessSubscriber } from "src/04.api/message-bus-subscribers/contract-file-success.subscriber";
import { SseEventModule } from "./sse-event.module";

@Module({
    imports: [InfraDataModule, MessageBusModule, SseEventModule],
    providers: [ContractFileFinishHandler,
        ContractFileFailHandler,
        ContractFileCreateHandler,
        ContractFileSuccessHandler,
        ContractFileFailedHandler,
        ContractFileGetAllHandler,
        ContractFileSuccessSubscriber,
        ContractFileFailedSubscriber,
        ContractFileRepository,
        ContractFileDataRepository,
        Logger
    ],
    exports: [ContractFileRepository, ContractFileDataRepository],
    controllers: [ContractFileController],
})
export class ContractFileModule {
}