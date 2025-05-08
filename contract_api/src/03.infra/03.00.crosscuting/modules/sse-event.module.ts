import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { SseEventService } from "../events/internal-events/sse-events.service";
import { SseController } from "src/04.api/controllers/sse.controller";

@Module({
    imports: [EventEmitterModule.forRoot({
        delimiter: '.',
        maxListeners: 10,
        ignoreErrors: false,
    })],
    providers: [
        SseEventService
    ],
    exports: [
        SseEventService
    ],
    controllers: [
        SseController
    ],
})
export class SseEventModule {
}