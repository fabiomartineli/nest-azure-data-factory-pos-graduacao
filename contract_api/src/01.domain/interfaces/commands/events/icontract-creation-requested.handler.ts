import { ContractCreationRequestedEvent } from "src/01.domain/dtos/events/contract-creation-requested.event";

export interface IContractCreationRequestedHandler {
    executeAsync(request: ContractCreationRequestedEvent): Promise<void>;
}