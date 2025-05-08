import { ContractFileService, IContractFileService } from "./contract-file.service";

export class ContractFileServiceFactory {
    private static _service: IContractFileService;

    public static Create(): IContractFileService {
        ContractFileServiceFactory._service ??= new ContractFileService();

        return ContractFileServiceFactory._service;
    }
}