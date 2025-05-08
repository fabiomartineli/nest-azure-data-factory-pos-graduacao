import { ServiceBusClient } from "@azure/service-bus";

export interface IMessageBusClient {
    get Client(): ServiceBusClient;
}