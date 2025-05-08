import { ContractStatusType } from "@/models/common/contract-status.type";

export type ContractFilesViewModel = {
    items: {
        fileName: string;
        status: ContractStatusType;
        statusDescription: string;
        uploadAt: string;
        updateAt: string;
    }[];
}

export interface IListFilesViewModel {
    files: ContractFilesViewModel;
}