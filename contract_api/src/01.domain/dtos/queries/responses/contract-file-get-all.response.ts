import { ContractStatusType } from "src/01.domain/types/contract-status.type";

export type ContractFileGetAllQueryResponse = {
   fileName: string;
   updateAt: Date;
   uploadAt: Date;
   status: ContractStatusType;
   statusDescription: string;
   message: string;
}