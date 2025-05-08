import { Contract } from "../../entities/contract.entity";

export interface IContractRepository {
    addAsync(entity: Contract): Promise<void>;
    updateAsync(entity: Contract): Promise<void>;
    findByIdAsync(id: string): Promise<Contract>;
    findByFileAndCustomerAsync(contractFileId: string, customerDocument: string): Promise<Contract>;
    findAllAsync(): Promise<Contract[]>;
}