import { Module } from "@nestjs/common";
import { StorageModule as StorageModuleInfra } from "src/03.infra/03.04.storage/ioc/storage.module";
import { StorageController } from "src/04.api/controllers/storage.controller";

@Module({
    imports: [
        StorageModuleInfra
    ],
    controllers: [
        StorageController
    ]
})
export class StorageModule {

}