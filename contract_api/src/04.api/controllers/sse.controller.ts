import { Controller, Inject, Req, MessageEvent, UseGuards, Sse } from "@nestjs/common";
import { Request } from "express";
import { FrontendCorsGuard } from "../guards/frontend-cors.guard";
import { SseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/sse-events.service";
import { ISseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/iinternal-events.service";
import { fromEvent, map } from "rxjs";
import { SseEventModel } from "src/03.infra/03.00.crosscuting/events/internal-events/sse-event.model";

@Controller('sse')
export class SseController {

    constructor(
        @Inject(SseEventService) private readonly _event: ISseEventService,
    ) { }

    @Sse()
    @UseGuards(FrontendCorsGuard)
    async register(@Req() request: Request) {
        // EM UM EXEMPLO REAL, ENTRARIA A NECESSIDADE DE VALIDAR SE O USUARIO INFORMADO ESTÁ VÁLIDO
        const userId = String(request.query["user-id"]);

        this._event.getEventEmmiter().removeAllListeners(userId);

        return fromEvent(this._event.getEventEmmiter(), userId).pipe(
            map((data: SseEventModel) => {
                console.log({ data: data.content, eventName: data.name });
                const eventData = { content: data.content, eventName: data.name };
                return { type: data.name, data: eventData };
            }),
        );
    }
}