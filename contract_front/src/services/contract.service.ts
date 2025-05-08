import { ContractGetAllResponse } from "@/models/contracts/contract-get-all.response";

export interface IContractService {
    getAllAsync(): Promise<ContractGetAllResponse[]>;
}

export class ContractService implements IContractService {
    private static readonly URL = `${process.env.NEXT_PUBLIC_URL_CONTRACT_API}/contract/`;

    async getAllAsync(): Promise<ContractGetAllResponse[]> {
        const response = await fetch(ContractService.URL, {
            method: "GET",
        });

        if (response.ok){
            const data = await response.json();
            return data.content as ContractGetAllResponse[];
        }

        return [];
    }

}