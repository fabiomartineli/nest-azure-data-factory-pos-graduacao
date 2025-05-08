import { SseRegisterRequest } from "@/models/sse/register.request";
import EventEmitter from "events";

export interface ISseService {
    subscriberAsync(request: SseRegisterRequest): Promise<void>;
    stopAsync(request: SseRegisterRequest): Promise<void>;
}

const eventEmmiter = new EventEmitter();

export class SseService implements ISseService {
    private static readonly URL = `${process.env.NEXT_PUBLIC_URL_CONTRACT_API}/sse/`;
    private static _eventSource: EventSource | null = null;

    getEvent(userId: string): EventSource {
        const params = new URLSearchParams();
        params.append("user-id", userId);
        params.append("x-api-key", process.env.NEXT_PUBLIC_FRONTEND_API_KEY!);

        SseService._eventSource ??= new EventSource(`${SseService.URL}?${params.toString()}`);
        SseService._eventSource.onerror = () => console.error("Erro na conexão SSE");

        return SseService._eventSource;
    }

    async subscriberAsync(request: SseRegisterRequest): Promise<void> {
        request.eventsName.map(eventName => {
            this.getEvent(request.userId).addEventListener(eventName, (event) => {
                console.log("addEventListener");

                const data = JSON.parse(event.data);
                eventEmmiter.emit(request.userId, data);
            });
        });

        eventEmmiter.on(request.userId, async (event) => {
            console.log(event)
            await request.handle(event);
        });
    }

    async stopAsync(request: SseRegisterRequest): Promise<void> {
        this.getEvent(request.userId).removeEventListener(request.userId, async (event) => {
            request.handle(event);
        });

        request.eventsName.map(eventName => {
            this.getEvent(request.userId).removeEventListener(eventName, async (event) => {
                request.handle(event);
            });
        });
    }
}