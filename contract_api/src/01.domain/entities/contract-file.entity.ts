import { ContractStatusType } from "../types/contract-status.type";

export class ContractFile {
    _id: string;
    status: ContractStatusType;
    uploadAt: Date;
    updateAt: Date;
    message: string;

    public setSuccess(): void {
        this.updateAt = new Date();
        this.status = ContractStatusType.success;
    }

    public setFail(message: string): void {
        this.status = ContractStatusType.failed;
        this.updateAt = new Date();
        this.setMessage(message);
    }

    public reset(): void {
        this.uploadAt = new Date();
        this.updateAt = new Date();
        this.status = ContractStatusType.inProgress;
    }

    public setMessage(value: string): void  {
        this.message = value;
    }

    public static createFrom(contract: ContractFile): ContractFile | null {
        if (!contract){
            return null;
        }

        const entity = new ContractFile();
        entity._id = contract._id;
        entity.status = contract.status;
        entity.uploadAt = contract.uploadAt;
        entity.updateAt = contract.updateAt;
        entity.message = contract.message;

        return entity;
    }
}