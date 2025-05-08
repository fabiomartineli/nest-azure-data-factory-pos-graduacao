import { CustomerVo } from "../common/customer.vo";
import { ContractRateType } from "./contract-rate.type";

export type ContractGetAllResponse = {
    customer: CustomerVo;
    value: number;
    rate: ContractRateType;
    rateDescription: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}