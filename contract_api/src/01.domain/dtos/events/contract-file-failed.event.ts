export const ContractFileFailedDestination = "queue-contract-file-failed";

export class ContractFileFailedEvent {
    fileName: string;
    updateAt: Date;
    users: string[]; // JUST SIMULATE USERS NOTIFICATION
}