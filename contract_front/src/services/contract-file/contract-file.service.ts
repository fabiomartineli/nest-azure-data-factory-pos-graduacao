import { ContractFileCreateRequest } from "@/models/contracts-file/contract-file-create.request";
import { ContractFileGetAllQueryResponse } from "@/models/contracts-file/contract-file-get-all.response";
import { BaseService } from "../base.service";

export interface IContractFileService {
    getAllAsync(): Promise<ContractFileGetAllQueryResponse[]>;
    createAsync(request: ContractFileCreateRequest): Promise<boolean>;
}

export class ContractFileService extends BaseService implements IContractFileService {
    private static readonly URL = `${process.env.NEXT_PUBLIC_URL_CONTRACT_API}/contract-file/`;

    async getAllAsync(): Promise<ContractFileGetAllQueryResponse[]> {
        return await super.sendRequestWithResponseAsync<ContractFileGetAllQueryResponse[]>(ContractFileService.URL, {
            method: "GET",
        }) ?? [];
    }

    async createAsync(request: ContractFileCreateRequest): Promise<boolean> {
        return await super.sendRequestWithoutResponseAsync(ContractFileService.URL, {
            method: "POST",
            body: JSON.stringify(request)
        });
    }
}