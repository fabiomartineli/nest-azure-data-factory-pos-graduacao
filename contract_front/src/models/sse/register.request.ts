export type SseRegisterRequest = {
    userId: string;
    eventsName: string[];
    handle(message: MessageEvent): Promise<void>;
}