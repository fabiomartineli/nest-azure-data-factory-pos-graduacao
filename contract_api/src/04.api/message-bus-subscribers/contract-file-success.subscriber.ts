import { Inject, Injectable, Logger } from "@nestjs/common";
import { MessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer";
import { IMessageBusConsumer } from "src/03.infra/03.02.message-bus/consumer/imessage-bus-consumer";
import { ContractFileSuccesDestination, ContractFileSuccessEvent } from "src/01.domain/dtos/events/contract-file-success.event";
import { MessageBusConsumerRequest } from "src/03.infra/03.02.message-bus/consumer/message-bus-consumer.request";
import { ContractFileSuccessHandler } from "src/02.application/commands/events/contract-file-success.handler";
import { IContractFileSuccessHandler } from "src/01.domain/interfaces/commands/events/icontract-file-success.handler";
import { ModuleRef } from "@nestjs/core";
import { ISubscriber } from "./base/isubscriber";

@Injectable()
export class ContractFileSuccessSubscriber implements ISubscriber {
    private _handler: IContractFileSuccessHandler;
    private readonly _consumer: IMessageBusConsumer;
    private readonly _logger: Logger;

    constructor(@Inject(MessageBusConsumer) consumer: IMessageBusConsumer,
        logger: Logger,
        module: ModuleRef) {
        this._consumer = consumer;
        this._logger = logger;
        module.resolve(ContractFileSuccessHandler).then(value => this._handler = value);
    }

    async onApplicationBootstrap() {
        this._logger.log("[Message bus subscriber] - starting ContractFileSuccessSubscriber");

        await this._consumer.listenAsync({
            source: ContractFileSuccesDestination,
            handleAsync: async (content) => {
                this._logger.log("[ContractFileSuccessSubscriber] - receiving message");

                await this._handler.executeAsync(content);
                return true;
            }
        } as MessageBusConsumerRequest<ContractFileSuccessEvent>)
    }
}