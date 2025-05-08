import { ContractRateType } from "src/01.domain/types/contract-rate.type";
import { CustomerVo } from "src/01.domain/valuesObjects/customer.vo"

export type ContractGetAllQueryResponse = {
    customer: CustomerVo;
    value: number;
    rate: ContractRateType;
    rateDescription: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}