import { BlobServiceClient } from "@azure/storage-blob";

export interface IStorageClient {
    get Client(): BlobServiceClient;
}