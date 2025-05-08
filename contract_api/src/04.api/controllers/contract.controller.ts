import { Controller, Get, Inject, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { FrontendCorsGuard } from "../guards/frontend-cors.guard";
import { IContractGetAllHandler } from "src/01.domain/interfaces/queries/icontract-get-all.handler";
import { ContractGetAllHandler } from "src/02.application/queries/contract-get-all.handler";

@Controller('contract')
export class ContractController {

    constructor(
        @Inject(ContractGetAllHandler) private readonly _getAllHandler: IContractGetAllHandler,
    ){}

    @Get()
    @UseGuards(FrontendCorsGuard)
    async getAll(@Res() response: Response) {
        const result = await this._getAllHandler.executeAsync();

        response.status(200).json({
            content: result
        });
        return response;
    }
}