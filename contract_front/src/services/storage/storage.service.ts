import { StorageUploadRequest } from "@/models/storage/storage-upload.request";
import { ContainerClient } from "@azure/storage-blob";
import { BaseService } from "../base.service";

export interface IStorageService {
    uploadAsync(request: StorageUploadRequest): Promise<boolean>;
}

export class StorageService extends BaseService implements IStorageService {
    private static readonly URL = `${process.env.NEXT_PUBLIC_URL_CONTRACT_API}/storage/`;

    async uploadAsync(request: StorageUploadRequest): Promise<boolean> {
        const sasUri = await this.generateSasUriAsync(request);
        if (sasUri) {
            const client =  new ContainerClient(sasUri);
            const blob = client.getBlockBlobClient(request.file.name);
            const buffer = Buffer.from(await request.file.arrayBuffer());

            const result = await blob.upload(buffer, buffer.length, {
                onProgress: (progress) => {
                    if (request.callbackOnProgress) {
                        request.callbackOnProgress(progress.loadedBytes);
                    }
                }
            });

            return !result.errorCode;
        }

        return false;
    }
    
    private async generateSasUriAsync(request: StorageUploadRequest): Promise<string | null> {
        const body = {
            containerName: request.containerName,
        };

        return await super.sendRequestWithResponseAsync<string>(`${StorageService.URL}sas-uri`, {
            method: "POST",
            body: JSON.stringify(body),
        })
    }
}