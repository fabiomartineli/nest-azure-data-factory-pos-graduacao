export class ContractFileData {
    _id: string;
    fileName: string;
    description: string;
    customer: {
        name: string;
        document: string;
    };
    contract: {
        value: number;
    };

    public isValid(): boolean {
        return this.checkContractValues()
            && this.checkCustomerValues();
    }

    public static createFrom(contract: ContractFileData): ContractFileData | null {
        if (!contract){
            return null;
        }

        const entity = new ContractFileData();
        entity._id = contract._id;
        entity.fileName = contract.fileName;
        entity.description = contract.description;
        entity.customer = contract.customer;
        entity.contract = contract.contract;

        return entity;
    }

    private checkContractValues(): boolean {
        const valueIsValid = this.contract.value > 0;

        return valueIsValid;
    }

    private checkCustomerValues(): boolean {
        const customerIsValid = !!this.customer?.name && !!this.customer?.document;

        return customerIsValid;
    }
}