import { Inject, Injectable, Scope } from "@nestjs/common";
import { IContractFileGetAllHandler } from "src/01.domain/interfaces/queries/icontract-file-get-all.handler";
import { ContractFileGetAllQueryResponse } from "src/01.domain/dtos/queries/responses/contract-file-get-all.response";
import { IContractFileRepository } from "src/01.domain/interfaces/repositories/icontract-file.repository";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";

@Injectable({ scope: Scope.REQUEST })
export class ContractFileGetAllHandler implements IContractFileGetAllHandler {
    private readonly _repository: IContractFileRepository;

    constructor(@Inject(ContractFileRepository) repository: IContractFileRepository) {
        this._repository = repository;
    }

    async executeAsync(): Promise<ContractFileGetAllQueryResponse[]> {
        const contracts = await this._repository.findAllAsync();

        return contracts.map(x => ({
            fileName: x._id,
            message: x.message,
            status: x.status,
            statusDescription: x.status.toString(),
            updateAt: x.updateAt,
            uploadAt: x.uploadAt,
        }));
    }
}