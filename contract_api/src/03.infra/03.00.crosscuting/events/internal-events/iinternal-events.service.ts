import { EventEmitter2 } from "@nestjs/event-emitter";
import { SseEventModel } from "./sse-event.model";

export interface ISseEventService {
    sendEventAsync(name: string, content: SseEventModel): Promise<void>;
    getEventEmmiter(): EventEmitter2;
}