import { Body, Controller, Get, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { ContractFileChangeRequest } from "src/01.domain/dtos/commands/requests/contract-file-change.request";
import { ContractFileCreateHandler } from "src/02.application/commands/requests/contract-file-create.handler";
import { IContractFileCreateHandler } from "src/01.domain/interfaces/commands/requests/icontract-file-create.handler";
import { ContractFileFinishHandler } from "src/02.application/commands/requests/contract-file-finish.handler";
import { IContractFileFinishHandler } from "src/01.domain/interfaces/commands/requests/icontract-file-finish.handler";
import { ContractFileFailHandler } from "src/02.application/commands/requests/contract-file-fail.handler";
import { IContractFileFailHandler } from "src/01.domain/interfaces/commands/requests/icontract-file-fail.handler";
import { FrontendCorsGuard } from "../guards/frontend-cors.guard";
import { DataFactoryCorsGuard } from "../guards/data-factory-cors.guard";
import { IContractFileGetAllHandler } from "src/01.domain/interfaces/queries/icontract-file-get-all.handler";
import { ContractFileGetAllHandler } from "src/02.application/queries/contract-file-get-all.handler";

@Controller()
export class ContractFileController {

    constructor(
        @Inject(ContractFileCreateHandler) private readonly _createHandler: IContractFileCreateHandler,
        @Inject(ContractFileFinishHandler) private readonly _finishHandler: IContractFileFinishHandler,
        @Inject(ContractFileFailHandler) private readonly _failHandler: IContractFileFailHandler,
        @Inject(ContractFileGetAllHandler) private readonly _getAllHandler: IContractFileGetAllHandler,
    ){}


    @Post('contract-file')
    @UseGuards(FrontendCorsGuard)
    async create(@Res() response: Response, @Body() request: ContractFileChangeRequest) {
        await this._createHandler.executeAsync(request);

        response.status(200).send();
        return response;
    }

    @Post('contract-file:set-proccess-failed')
    @UseGuards(DataFactoryCorsGuard)
    async setAsProccessFailed(@Res() response: Response, @Body() request: ContractFileChangeRequest) {
        await this._failHandler.executeAsync(request);

        response.status(200).send();
        return response;
    }

    @Post('contract-file:set-proccess-success')
    @UseGuards(DataFactoryCorsGuard)
    async setAsProccessSuccess(@Res() response: Response, @Body() request: ContractFileChangeRequest) {
        await this._finishHandler.executeAsync(request);

        response.status(200).send();
        return response;
    }

    @Get('contract-file')
    @UseGuards(FrontendCorsGuard)
    async getAll(@Res() response: Response) {
        const result = await this._getAllHandler.executeAsync();

        response.status(200).json({
            content: result
        });
        return response;
    }
}