import { ContractFileData } from "src/01.domain/entities/contract-file-data.entity";

export interface IContractFileDataRepository {
    findByFileAndCustomerAsync(fileName: string, customerDocument: string): Promise<ContractFileData>;
    findByFileAsync(fileName: string): Promise<ContractFileData[]>;
    deleteByFileAsync(fileName: string): Promise<void>;
}