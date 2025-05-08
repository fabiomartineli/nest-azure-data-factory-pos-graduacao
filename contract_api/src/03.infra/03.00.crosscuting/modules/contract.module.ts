import { Logger, Module } from "@nestjs/common";
import { ContractCreationRequestedHandler } from "src/02.application/commands/events/contract-creation-requested.handler";
import { InfraDataModule } from "src/03.infra/03.01.data/ioc/infra-data.module";
import { ContractRepository } from "src/03.infra/03.01.data/repositories/contract.repository";
import { ContractCreationRequestedSubscriber } from "src/04.api/message-bus-subscribers/contract-creation-requested.subscriber";
import { ContractFileModule } from "./contract-file.module";
import { MessageBusModule } from "src/03.infra/03.02.message-bus/ioc/message-bus.module";
import { ContractGetAllHandler } from "src/02.application/queries/contract-get-all.handler";
import { ContractController } from "src/04.api/controllers/contract.controller";
import { SseEventModule } from "./sse-event.module";

@Module({
    imports: [InfraDataModule, ContractFileModule, MessageBusModule, SseEventModule],
    providers: [ContractCreationRequestedHandler,
        ContractGetAllHandler,
        ContractCreationRequestedSubscriber,
        ContractRepository,
        Logger
    ],
    controllers: [
        ContractController
    ],
})
export class ContractModule {
}