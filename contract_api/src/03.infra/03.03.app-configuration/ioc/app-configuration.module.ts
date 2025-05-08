import { Global, Module } from "@nestjs/common";
import { AppConfigurationClient } from "../client/app-configuration-client";
import { AppConfigurationService } from "../service/app-configuration.service";

@Global()
@Module({
    exports: [
        AppConfigurationService,
        AppConfigurationClient
    ],
    providers: [
        AppConfigurationClient,
        AppConfigurationService,
    ]
})
export class AppConfigurationModule {

}