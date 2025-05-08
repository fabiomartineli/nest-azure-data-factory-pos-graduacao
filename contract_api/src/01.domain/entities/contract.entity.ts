import { v7 } from "uuid";
import { ContractRateType } from "../types/contract-rate.type";
import { CustomerVo } from "../valuesObjects/customer.vo";

export class Contract {
    _id: string;
    description: string;
    contractFileId: string;
    customer: CustomerVo;
    value: number;
    rate: ContractRateType;
    createdAt: Date;
    updateAt: Date;

    constructor(){
        this._id = v7();
        this.createdAt = new Date();
    }

    public setCustomer(customer: CustomerVo){
        this.customer = customer;
    }

    public setValue(value: number){
        this.value = value;

        if (value > 1000) {
            this.rate = ContractRateType.priority;
        } else {
            this.rate = ContractRateType.normal;
        }
    }

    public setDescription(value: string){
        this.description = value;
    }

    public setContractFileOrigin(value: string){
        this.updateAt = new Date();
        this.contractFileId = value;
    }

    public static createFrom(contract: Contract): Contract | null {
        if (!contract){
            return null;
        }

        const entity = new Contract();
        entity._id = contract._id;
        entity.description = contract.description;
        entity.contractFileId = contract.contractFileId;
        entity.customer = contract.customer;
        entity.value = contract.value;
        entity.rate = contract.rate;
        entity.createdAt = contract.createdAt;

        return entity;
    }

    
}