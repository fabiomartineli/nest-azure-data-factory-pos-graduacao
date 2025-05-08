import { Inject, Injectable, Scope } from "@nestjs/common";
import { IMessageBusClient } from "../client/imessage-bus-client";
import { MessageBusClient } from "../client/message-bus-client";
import { ServiceBusSender } from "@azure/service-bus";
import { MessageBusPublisherRequest } from "./message-bus-publisher.request";
import { IMessageBusPublisher } from "./imessage-bus-publisher";

@Injectable({ scope: Scope.DEFAULT })
export class MessageBusPublisher implements IMessageBusPublisher {
    private readonly _client: IMessageBusClient;
    private readonly _mapSender: Map<string, ServiceBusSender>;

    constructor(@Inject(MessageBusClient) client: IMessageBusClient) {
        this._client = client;
        this._mapSender = new Map<string, ServiceBusSender>();
    }

    async publishAsync<TContent>(request: MessageBusPublisherRequest<TContent>): Promise<void> {
        if (!this._mapSender.has(request.destination)) {
            this._mapSender.set(request.destination, this._client.Client.createSender(request.destination))
        }

        var sender = this._mapSender.get(request.destination);

        await sender.sendMessages({
            body: request.content,
            contentType: "application/json",
        });
    }
}