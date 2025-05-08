import { ContractStatusType } from "../common/contract-status.type";

export type ContractFileGetAllQueryResponse = {
   fileName: string;
   updateAt: Date;
   uploadAt: Date;
   status: ContractStatusType;
   message: string;
}