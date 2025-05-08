import { ContractFileGetAllQueryResponse } from "../../dtos/queries/responses/contract-file-get-all.response";

export interface IContractFileGetAllHandler {
    executeAsync(): Promise<ContractFileGetAllQueryResponse[]>;
}