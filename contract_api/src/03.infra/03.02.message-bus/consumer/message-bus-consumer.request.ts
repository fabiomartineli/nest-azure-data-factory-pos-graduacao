export type MessageBusConsumerRequest<TContent> = {
    handleAsync: (content: TContent) => Promise<boolean>;
    source: string;
}