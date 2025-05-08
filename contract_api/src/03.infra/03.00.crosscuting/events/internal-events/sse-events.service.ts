import { Inject, Injectable, Scope } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ISseEventService } from "./iinternal-events.service";
import { SseEventModel } from "./sse-event.model";

@Injectable({ scope: Scope.DEFAULT })
export class SseEventService implements ISseEventService {
    private readonly _eventEmitter: EventEmitter2;

    constructor(@Inject(EventEmitter2) emitter) {
        this._eventEmitter = emitter;
    }

    async sendEventAsync(name: string, content: SseEventModel): Promise<void> {
        await this._eventEmitter.emitAsync(name, content);
    }

    getEventEmmiter(): EventEmitter2 {
        return this._eventEmitter;
    }
}