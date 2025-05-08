import { ContractFile } from "../../entities/contract-file.entity";

export interface IContractFileRepository {
    addAsync(entity: ContractFile): Promise<void>;
    updateAsync(entity: ContractFile): Promise<void>;
    findByIdAsync(id: string): Promise<ContractFile>;
    existsByIdAsync(id: string): Promise<boolean>;
    findAllAsync(): Promise<ContractFile[]>;
}