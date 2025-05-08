import { Inject, Injectable, Logger } from "@nestjs/common";
import { MessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer";
import { IMessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/imessage-bus-consumer";
import { MessageBusConsumerRequest } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer.request";
import { IContractFileFailedHandler } from "src/01.domain/interfaces/commands/events/icontract-file-failed.handler";
import { ContractFileFailedDestination, ContractFileFailedEvent } from "src/01.domain/dtos/events/contract-file-failed.event";
import { ModuleRef } from "@nestjs/core";
import { ContractFileFailedHandler } from "src/02.application/commands/events/contract-file-failed.handler";
import { ISubscriber } from "./base/isubscriber";

@Injectable()
export class ContractFileFailedSubscriber implements ISubscriber {

    private _handler: IContractFileFailedHandler;
    private readonly _consumer: IMessageBusConsumer;
    private readonly _logger: Logger;

    constructor(@Inject(MessageBusConsumer) consumer: IMessageBusConsumer,
        logger: Logger,
        module: ModuleRef) {
        this._consumer = consumer;
        this._logger = logger;
        module.resolve(ContractFileFailedHandler).then(value => this._handler = value);
    }

    async onApplicationBootstrap(): Promise<void> {
        this._logger.log("[Message bus subscriber] - starting ContractFileFailedSubscriber");

        await this._consumer.listenAsync({
            source: ContractFileFailedDestination,
            handleAsync: async (content) => {
                this._logger.log("[ContractFileFailedSubscriber] - receiving message");

                await this._handler.executeAsync(content);
                return true;
            }
        } as MessageBusConsumerRequest<ContractFileFailedEvent>)
    }
}