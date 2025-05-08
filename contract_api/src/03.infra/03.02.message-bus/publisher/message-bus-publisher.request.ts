export type MessageBusPublisherRequest<TContent> = {
    content: TContent;
    destination: string;
}