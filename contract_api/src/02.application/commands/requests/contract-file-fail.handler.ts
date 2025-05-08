import { Inject, Injectable, Scope } from "@nestjs/common";
import { ContractFileSuccessEvent, ContractFileSuccesDestination } from "src/01.domain/dtos/events/contract-file-success.event";
import { IContractFileFailHandler } from "src/01.domain/interfaces/commands/requests/icontract-file-fail.handler";
import { ContractFileChangeRequest } from "src/01.domain/dtos/commands/requests/contract-file-change.request";
import { IMessageBusPublisher } from "src/03.infra/03.02.message-bus/publisher/imessage-bus-publisher";
import { MessageBusPublisher } from "src/03.infra/03.02.message-bus/publisher/message-bus-publisher";

@Injectable({ scope: Scope.REQUEST })
export class ContractFileFailHandler implements IContractFileFailHandler {
    private readonly _busPublisher: IMessageBusPublisher;

    constructor(@Inject(MessageBusPublisher) busPublisher: IMessageBusPublisher) {
        this._busPublisher = busPublisher;
    }

    async executeAsync(request: ContractFileChangeRequest): Promise<void> {
        const event: ContractFileSuccessEvent = {
            fileName: request.fileName,
            users: request.users,
            updateAt: new Date(),
        };

        await this._busPublisher.publishAsync({
            content: event,
            destination: ContractFileSuccesDestination
        });
    }
}