import { Logger, Module } from "@nestjs/common";
import { MessageBusClient } from "../client/message-bus-client";
import { MessageBusPublisher } from "../publisher/message-bus-publisher";
import { MessageBusConsumer } from "../consumer/message-bus-consumer";

@Module({
    exports: [
        MessageBusConsumer,
        MessageBusPublisher
    ],
    providers: [
        MessageBusClient,
        MessageBusConsumer,
        MessageBusPublisher,
        Logger
    ]
})
export class MessageBusModule {

}