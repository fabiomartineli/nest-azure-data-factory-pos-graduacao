import { ServiceBusClient } from "@azure/service-bus";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IMessageBusClient } from "./imessage-bus-client";

@Injectable({ scope: Scope.DEFAULT })
export class MessageBusClient implements IMessageBusClient {
    private readonly _client: ServiceBusClient;

    constructor(@Inject(ConfigService) config: ConfigService) {
        this._client = new ServiceBusClient(config.get("SERVICE_BUS_CONNECTION_STRING"));
    }

    get Client(): ServiceBusClient {
        return this._client;
    }
}