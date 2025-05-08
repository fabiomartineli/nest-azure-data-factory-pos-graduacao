import { Inject, Injectable, Scope } from "@nestjs/common";
import { IContractFileCreateHandler } from "src/01.domain/interfaces/commands/requests/icontract-file-create.handler";
import { ContractFileChangeRequest } from "src/01.domain/dtos/commands/requests/contract-file-change.request";
import { ContractFile } from "src/01.domain/entities/contract-file.entity";
import { IContractFileRepository } from "src/01.domain/interfaces/repositories/icontract-file.repository";
import { ContractStatusType } from "src/01.domain/types/contract-status.type";
import { IUnitOfWork } from "src/03.infra/03.01.data/config/base/iunit-of-work";
import { UnitOfWork } from "src/03.infra/03.01.data/config/base/unit-of-work";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";
import { ContractFileDataRepository } from "src/03.infra/03.01.data/repositories/contract-file-data.repository";
import { IContractFileDataRepository } from "src/01.domain/interfaces/repositories/icontract-file-data.repository";
import { SseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/sse-events.service";
import { ISseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/iinternal-events.service";

@Injectable({ scope: Scope.REQUEST })
export class ContractFileCreateHandler implements IContractFileCreateHandler {
    private readonly _repository: IContractFileRepository;
    private readonly _contractFileDataRepository: IContractFileDataRepository;
    private readonly _unitOfWork: IUnitOfWork;
    private readonly _event: ISseEventService;

    constructor(@Inject(ContractFileRepository) repository: IContractFileRepository,
        @Inject(ContractFileDataRepository) contractFileDataRepository: IContractFileDataRepository,
        @Inject(UnitOfWork) unitOfWork: IUnitOfWork,
        @Inject(SseEventService) event: ISseEventService,) {
        this._repository = repository;
        this._contractFileDataRepository = contractFileDataRepository;
        this._unitOfWork = unitOfWork;
        this._event = event;
    }

    async executeAsync(request: ContractFileChangeRequest): Promise<void> {
        const contractFile = await this._repository.findByIdAsync(request.fileName);

        await this._unitOfWork.startTransactionAsync();

        if (contractFile) {

            contractFile.reset();
            await this._repository.updateAsync(contractFile);

        } else {

            await this._repository.addAsync({
                _id: request.fileName,
                status: ContractStatusType.inProgress,
                updateAt: new Date(),
                uploadAt: new Date(),
            } as ContractFile);

        }

        await this._contractFileDataRepository.deleteByFileAsync(request.fileName);
        await this._unitOfWork.commitTransactionAsync();

        await this._event.sendEventAsync("user-teste-1", { content: {}, name: "contract-file-created" });
        await this._event.sendEventAsync("user-teste-2", { content: {}, name: "contract-file-created" });
    }
}