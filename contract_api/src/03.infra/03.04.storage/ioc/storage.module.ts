import { Module } from "@nestjs/common";
import { StorageClient } from "../client/storage-client";
import { StorageService } from "../service/storage.service";

@Module({
    exports: [
        StorageClient,
        StorageService,
    ],
    providers: [
        StorageClient,
        StorageService,
    ],
})
export class StorageModule {

}