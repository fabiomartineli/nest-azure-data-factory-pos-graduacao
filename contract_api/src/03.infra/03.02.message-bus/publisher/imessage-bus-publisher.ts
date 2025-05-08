import { MessageBusPublisherRequest } from "./message-bus-publisher.request";

export interface IMessageBusPublisher {
    publishAsync<TContent>(request: MessageBusPublisherRequest<TContent>): Promise<void>;
}