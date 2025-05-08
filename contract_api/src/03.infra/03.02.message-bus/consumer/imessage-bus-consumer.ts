import { MessageBusConsumerRequest } from "./message-bus-consumer.request";

export interface IMessageBusConsumer {
    listenAsync<TContent>(request: MessageBusConsumerRequest<TContent>): Promise<void>;
}