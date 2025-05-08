import { ISseService, SseService } from "./sse.service";

export class SseServiceFactory {
    private static _service: ISseService;

    public static Create(): ISseService {
        SseServiceFactory._service ??= new SseService();

        return SseServiceFactory._service;
    }
}