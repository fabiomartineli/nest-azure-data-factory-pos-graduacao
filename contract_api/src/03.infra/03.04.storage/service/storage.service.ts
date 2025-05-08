import { Inject, Injectable, Scope } from "@nestjs/common";
import { IStorageClient } from "../client/istorage-client.ts";
import { StorageClient } from "../client/storage-client.js";
import { IStorageService } from "./istorage.service";
import { ContainerSASPermissions } from "@azure/storage-blob";

@Injectable({ scope: Scope.DEFAULT })
export class StorageService implements IStorageService {

    private readonly _client: IStorageClient;
    private static readonly MINUTES_TO_ACCESS = 5;

    constructor(@Inject(StorageClient) client: IStorageClient) {
        this._client = client;
    }

    async genereateWriteSasUrlAsync(containerName: string): Promise<string> {
        const startDate = new Date();
        const endDate = new Date();

        endDate.setUTCMinutes(endDate.getUTCMinutes() + StorageService.MINUTES_TO_ACCESS);

        const container = this._client.Client.getContainerClient(containerName);
        return await container.generateSasUrl({
            startsOn: startDate,
            expiresOn: endDate,
            permissions: ContainerSASPermissions.from({
                add: true,
                create: true,
                write: true,
            })
        });
    }
}