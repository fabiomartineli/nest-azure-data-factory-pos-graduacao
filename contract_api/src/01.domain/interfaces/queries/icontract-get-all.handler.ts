import { ContractGetAllQueryResponse } from "../../dtos/queries/responses/contract-get-all.response";

export interface IContractGetAllHandler {
    executeAsync(): Promise<ContractGetAllQueryResponse[]>;
}