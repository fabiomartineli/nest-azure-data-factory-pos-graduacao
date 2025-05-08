export const ContractFileSuccesDestination = "queue-contract-file-success";

export class ContractFileSuccessEvent {
    fileName: string;
    updateAt: Date;
    users: string[]; // JUST SIMULATE USERS NOTIFICATION
}