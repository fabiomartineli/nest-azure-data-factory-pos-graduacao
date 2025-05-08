import { Inject, Injectable, Scope } from "@nestjs/common";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";
import { IContractFileRepository } from "src/01.domain/interfaces/repositories/icontract-file.repository";
import { UnitOfWork } from "src/03.infra/03.01.data/config/base/unit-of-work";
import { IUnitOfWork } from "src/03.infra/03.01.data/config/base/iunit-of-work";
import { IContractCreationRequestedHandler } from "src/01.domain/interfaces/commands/events/icontract-creation-requested.handler";
import { IContractRepository } from "src/01.domain/interfaces/repositories/icontract.repository";
import { ContractRepository } from "src/03.infra/03.01.data/repositories/contract.repository";
import { ContractCreationRequestedEvent } from "src/01.domain/dtos/events/contract-creation-requested.event";
import { Contract } from "src/01.domain/entities/contract.entity";
import { IContractFileDataRepository } from "src/01.domain/interfaces/repositories/icontract-file-data.repository";
import { ContractFileDataRepository } from "src/03.infra/03.01.data/repositories/contract-file-data.repository";

@Injectable({ scope: Scope.REQUEST })
export class ContractCreationRequestedHandler implements IContractCreationRequestedHandler {
    private readonly _contractFileDataRepository: IContractFileDataRepository;
    private readonly _repository: IContractRepository;
    private readonly _unitOfWork: IUnitOfWork;

    constructor(@Inject(ContractFileDataRepository) contractFileDataRepository: IContractFileDataRepository,
        @Inject(ContractRepository) repository: IContractRepository,
        @Inject(UnitOfWork) unitOfWork: IUnitOfWork) {
        this._contractFileDataRepository = contractFileDataRepository;
        this._repository = repository;
        this._unitOfWork = unitOfWork;
    }

    async executeAsync(request: ContractCreationRequestedEvent): Promise<void> {
        const contractFileData = await this._contractFileDataRepository.findByFileAndCustomerAsync(request.contractFileId, request.customerDocument);
        var contract = await this._repository.findByFileAndCustomerAsync(request.contractFileId, request.customerDocument);
        var contractExists = !!contract;

        contract ??= new Contract();
        contract.setCustomer({
            document: contractFileData.customer.document,
            name: contractFileData.customer.name
        });

        contract.setValue(contractFileData.contract.value);
        contract.setDescription(contractFileData.description);
        contract.setContractFileOrigin(request.contractFileId);

        await this._unitOfWork.startTransactionAsync();

        if (contractExists) {
            await this._repository.updateAsync(contract);
        } else {
            await this._repository.addAsync(contract);
        }

        await this._unitOfWork.commitTransactionAsync();
    }
}