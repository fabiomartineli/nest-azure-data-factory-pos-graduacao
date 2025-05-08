import { Controller, Get, Inject, Req, MessageEvent, UseGuards, Res, Post } from "@nestjs/common";
import { Request, Response } from "express";
import { FrontendCorsGuard } from "../guards/frontend-cors.guard";
import { StorageService } from "src/03.infra/03.04.storage/service/storage.service";
import { IStorageService } from "src/03.infra/03.04.storage/service/istorage.service";

@Controller('storage')
export class StorageController {

    constructor(
        @Inject(StorageService) private readonly _service: IStorageService,
    ) { }

    @Post("sas-uri")
    @UseGuards(FrontendCorsGuard)
    async register(@Req() request: Request, @Res() response: Response) {
        const sasUri = await this._service.genereateWriteSasUrlAsync(request.body.containerName);
        if (sasUri) {
            response.status(200).json({ content: sasUri });
        }
        else {
            response.status(400).json({ content: "" });
        }

        return response;
    }
}