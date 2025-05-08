import { ConfigService } from "@nestjs/config";
import { Injectable, Scope } from "@nestjs/common";
import { BlobServiceClient } from "@azure/storage-blob";
import { IStorageClient } from "./istorage-client.ts";

@Injectable({scope: Scope.DEFAULT})
export class StorageClient implements IStorageClient {
    private _client: BlobServiceClient;

    constructor(config: ConfigService){
        this._client = BlobServiceClient.fromConnectionString(config.get("STORAGE_CONNECTION_STRING"));
    }

    get Client(): BlobServiceClient {
        return this._client;
    }
}