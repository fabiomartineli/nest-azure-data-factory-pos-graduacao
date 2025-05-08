import { ConfigService } from "@nestjs/config";
import { AzureAppConfiguration, load } from "@azure/app-configuration-provider";
import { IAppConfigurationClient } from "./iapp-configuration-client";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.DEFAULT})
export class AppConfigurationClient implements IAppConfigurationClient {
    private _client: AzureAppConfiguration;

    constructor(config: ConfigService){
        load(config.get("APPCONFIGURATION_CONNECTION_STRING"), {
            refreshOptions: {
                enabled: true,
                refreshIntervalInMs: 1000 * 60 * 5
            }
        }).then(value => {
            this._client = value;
        });
    }

    get Client(): AzureAppConfiguration {
        return this._client;
    }
}