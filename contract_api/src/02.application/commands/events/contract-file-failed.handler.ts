import { Inject, Injectable, Scope } from "@nestjs/common";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";
import { IContractFileRepository } from "src/01.domain/interfaces/repositories/icontract-file.repository";
import { ContractStatusType } from "src/01.domain/types/contract-status.type";
import { UnitOfWork } from "src/03.infra/03.01.data/config/base/unit-of-work";
import { IUnitOfWork } from "src/03.infra/03.01.data/config/base/iunit-of-work";
import { ContractFileFailedEvent } from "src/01.domain/dtos/events/contract-file-failed.event";
import { IContractFileFailedHandler } from "src/01.domain/interfaces/commands/events/icontract-file-failed.handler";
import { ISseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/iinternal-events.service";
import { SseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/sse-events.service";

@Injectable({ scope: Scope.REQUEST })
export class ContractFileFailedHandler implements IContractFileFailedHandler {
    private readonly _repository: IContractFileRepository;
    private readonly _unitOfWork: IUnitOfWork;
    private readonly _event: ISseEventService;

    constructor(@Inject(ContractFileRepository) repository: IContractFileRepository,
        @Inject(UnitOfWork) unitOfWork: IUnitOfWork,
        @Inject(SseEventService) event: ISseEventService,
    ) {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
        this._event = event;
    }


    async executeAsync(request: ContractFileFailedEvent): Promise<void> {
        const contractFile = await this._repository.findByIdAsync(request.fileName);

        if (contractFile.status === ContractStatusType.inProgress) {
            contractFile.setFail("Não foi possível processar os dados da planilha.");

            await this._unitOfWork.startTransactionAsync();
            await this._repository.updateAsync(contractFile);
            await this._unitOfWork.commitTransactionAsync();
            
            // JUST SIMULATE USERS NOTIFICATION
            request.users?.forEach(async user => {
                await this._event.sendEventAsync(user, { content: null, name: "contract-file-success" });
            });
        }
    }
}