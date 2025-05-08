import { ContractFileChangeRequest } from "src/01.domain/dtos/commands/requests/contract-file-change.request";

export interface IContractFileCreateHandler {
    executeAsync(request: ContractFileChangeRequest): Promise<void>;
}