import { Inject, Injectable, Scope } from "@nestjs/common";
import { ContractFileSuccessEvent } from "src/01.domain/dtos/events/contract-file-success.event";
import { IMessageBusPublisher } from "src/03.infra/03.02.message-bus/publisher/imessage-bus-publisher";
import { MessageBusPublisher } from "src/03.infra/03.02.message-bus/publisher/message-bus-publisher";
import { IContractFileSuccessHandler } from "src/01.domain/interfaces/commands/events/icontract-file-success.handler";
import { ContractFileRepository } from "src/03.infra/03.01.data/repositories/contract-file.repository";
import { IContractFileRepository } from "src/01.domain/interfaces/repositories/icontract-file.repository";
import { ContractStatusType } from "src/01.domain/types/contract-status.type";
import { UnitOfWork } from "src/03.infra/03.01.data/config/base/unit-of-work";
import { IUnitOfWork } from "src/03.infra/03.01.data/config/base/iunit-of-work";
import { ContractCreationRequestedDestination, ContractCreationRequestedEvent } from "src/01.domain/dtos/events/contract-creation-requested.event";
import { IContractFileDataRepository } from "src/01.domain/interfaces/repositories/icontract-file-data.repository";
import { ContractFileDataRepository } from "src/03.infra/03.01.data/repositories/contract-file-data.repository";
import { ISseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/iinternal-events.service";
import { SseEventService } from "src/03.infra/03.00.crosscuting/events/internal-events/sse-events.service";

@Injectable({ scope: Scope.REQUEST })
export class ContractFileSuccessHandler implements IContractFileSuccessHandler {
    private readonly _repository: IContractFileRepository;
    private readonly _contractFileDataRepository: IContractFileDataRepository;
    private readonly _unitOfWork: IUnitOfWork;
    private readonly _publisher: IMessageBusPublisher;
    private readonly _event: ISseEventService;

    constructor(@Inject(ContractFileRepository) repository: IContractFileRepository,
        @Inject(ContractFileDataRepository) contractFileDataRepository: IContractFileDataRepository,
        @Inject(UnitOfWork) unitOfWork: IUnitOfWork,
        @Inject(MessageBusPublisher) publisher: IMessageBusPublisher,
        @Inject(SseEventService) event: ISseEventService,
    ) {
        this._repository = repository;
        this._contractFileDataRepository = contractFileDataRepository;
        this._unitOfWork = unitOfWork;
        this._publisher = publisher;
        this._event = event;
    }

    async executeAsync(request: ContractFileSuccessEvent): Promise<void> {
        const contractFile = await this._repository.findByIdAsync(request.fileName);
        const contractsFileData = await this._contractFileDataRepository.findByFileAsync(request.fileName);
        var canCreateContract = false;

        if (contractFile.status === ContractStatusType.inProgress) {
            if (contractsFileData.find(x => !x.isValid())) {
                contractFile.setFail("Um ou mais dos registros informados estão com algum dados inválidos.");
            } else {
                canCreateContract = true;
                contractFile.setSuccess();
            }

            await this._unitOfWork.startTransactionAsync();
            await this._repository.updateAsync(contractFile);
            await this._unitOfWork.commitTransactionAsync();
        }

        if (canCreateContract) {

            const promises = contractsFileData.map(fileData => (
                this._publisher.publishAsync({
                    destination: ContractCreationRequestedDestination,
                    content: {
                        contractFileId: contractFile._id,
                        customerDocument: fileData.customer.document,
                        updateAt: request.updateAt
                    } as ContractCreationRequestedEvent
                })
            ));

            await Promise.all(promises);

            // JUST SIMULATE USERS NOTIFICATION
            request.users?.forEach(async user => {
                await this._event.sendEventAsync(user, { content: null, name: "contract-file-success" });
            });
        }
    }
}