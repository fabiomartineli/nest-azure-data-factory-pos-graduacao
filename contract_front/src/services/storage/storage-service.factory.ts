import { IStorageService, StorageService } from "./storage.service";

export class StorageServiceFactory {
    private static _service: IStorageService;
    
    public static Create(): IStorageService {
        StorageServiceFactory._service ??= new StorageService();

        return StorageServiceFactory._service;
    }
}