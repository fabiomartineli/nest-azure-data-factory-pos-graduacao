import { ContractFileSuccessEvent } from "src/01.domain/dtos/events/contract-file-success.event";

export interface IContractFileSuccessHandler {
    executeAsync(request: ContractFileSuccessEvent): Promise<void>;
}