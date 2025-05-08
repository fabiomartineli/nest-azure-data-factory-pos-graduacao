export const ContractCreationRequestedDestination = "queue-contract-creation-requested";

export class ContractCreationRequestedEvent {
    contractFileId: string;
    customerDocument: string;
    updateAt: Date;

    // constructor(data: any) {
    //     this.contractFileId = data.contractFileId;
    //     this.customerDocument = data.customerDocument;
    //     this.updateAt = data.updateAt;
    // }
}