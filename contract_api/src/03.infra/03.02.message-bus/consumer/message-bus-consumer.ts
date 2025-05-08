import { Inject, Injectable, Logger, Scope } from "@nestjs/common";
import { IMessageBusClient } from "../client/imessage-bus-client";
import { MessageBusClient } from "../client/message-bus-client";
import { MessageBusConsumerRequest } from "./message-bus-consumer.request";
import { IMessageBusConsumer } from "./imessage-bus-consumer";

@Injectable({ scope: Scope.DEFAULT })
export class MessageBusConsumer implements IMessageBusConsumer {
    private readonly _client: IMessageBusClient;
    private readonly _logger: Logger;

    constructor(@Inject(MessageBusClient) client: IMessageBusClient, logger: Logger) {
        this._client = client;
        this._logger = logger;
    }

    async listenAsync<TContent>(request: MessageBusConsumerRequest<TContent>): Promise<void> {
        const listener = this._client.Client.createReceiver(request.source, {
            receiveMode: "peekLock",
            skipParsingBodyAsJson: false,
        });
        
        listener.subscribe({
            processMessage: async (message) => {
                const result = await request.handleAsync(message.body as TContent);

                if (result){
                    await listener.completeMessage(message);
                } else {
                    await listener.abandonMessage(message);
                }
            },
            processError: async (error) => {
                this._logger.error(`[MESSAGE BUS] - Error while receiving message from ${request.source}: ${error.error.message} - ${error.error.stack} `)
            }
        });
    }
}