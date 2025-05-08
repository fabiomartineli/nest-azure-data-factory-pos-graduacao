import { Inject, Injectable, Logger } from "@nestjs/common";
import { MessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer";
import { IMessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/imessage-bus-consumer";
import { MessageBusConsumerRequest } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer.request";
import { ModuleRef } from "@nestjs/core";
import { ISubscriber } from "./base/isubscriber";
import { IContractCreationRequestedHandler } from "src/01.domain/interfaces/commands/events/icontract-creation-requested.handler";
import { ContractCreationRequestedHandler } from "src/02.application/commands/events/contract-creation-requested.handler";
import { ContractCreationRequestedEvent, ContractCreationRequestedDestination } from "src/01.domain/dtos/events/contract-creation-requested.event";

@Injectable()
export class ContractCreationRequestedSubscriber implements ISubscriber {

    private _handler: IContractCreationRequestedHandler;
    private readonly _consumer: IMessageBusConsumer;
    private readonly _logger: Logger;

    constructor(@Inject(MessageBusConsumer) consumer: IMessageBusConsumer,
        logger: Logger,
        module: ModuleRef) {
        this._consumer = consumer;
        this._logger = logger;
        module.resolve(ContractCreationRequestedHandler).then(value => this._handler = value);
    }

    async onApplicationBootstrap(): Promise<void> {
        this._logger.log("[Message bus subscriber] - starting ContractCreationRequestedSubscriber");

        await this._consumer.listenAsync({
            source: ContractCreationRequestedDestination,
            handleAsync: async (content) => {
                this._logger.log("[ContractCreationRequestedSubscriber] - receiving message");

                await this._handler.executeAsync(content);
                return true;
            }
        } as MessageBusConsumerRequest<ContractCreationRequestedEvent>)
    }
}