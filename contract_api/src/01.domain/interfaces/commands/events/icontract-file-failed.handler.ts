import { ContractFileFailedEvent } from "src/01.domain/dtos/events/contract-file-failed.event";

export interface IContractFileFailedHandler {
    executeAsync(request: ContractFileFailedEvent): Promise<void>;
}