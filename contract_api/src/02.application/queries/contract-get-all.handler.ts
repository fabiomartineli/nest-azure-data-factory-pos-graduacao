import { Inject, Injectable, Scope } from "@nestjs/common";
import { IContractRepository } from "src/01.domain/interfaces/repositories/icontract.repository";
import { ContractRepository } from "src/03.infra/03.01.data/repositories/contract.repository";
import { IContractGetAllHandler } from "src/01.domain/interfaces/queries/icontract-get-all.handler";
import { ContractGetAllQueryResponse } from "src/01.domain/dtos/queries/responses/contract-get-all.response";

@Injectable({ scope: Scope.REQUEST })
export class ContractGetAllHandler implements IContractGetAllHandler {
    private readonly _repository: IContractRepository;

    constructor(@Inject(ContractRepository) repository: IContractRepository) {
        this._repository = repository;
    }

    async executeAsync(): Promise<ContractGetAllQueryResponse[]> {
        const contracts = await this._repository.findAllAsync();

        return contracts.map(x => ({
            customer: x.customer,
            rate: x.rate,
            rateDescription: x.rate.toString(),
            value: x.value,
            createdAt: x.createdAt,
            updatedAt: x.updateAt,
            description: x.description
        }));
    }
}