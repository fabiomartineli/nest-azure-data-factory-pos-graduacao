import { IAppConfigurationClient } from "../client/iapp-configuration-client";
import { AppConfigurationClient } from "../client/app-configuration-client";
import { IAppConfigurationService } from "./iapp-configuration.service";
import { Inject, Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.DEFAULT})
export class AppConfigurationService implements IAppConfigurationService {

    private readonly _client: IAppConfigurationClient;

    constructor(@Inject(AppConfigurationClient) client: IAppConfigurationClient) {
        this._client = client;
    }

    getValue<TContent>(key: string): TContent {
        const value = this._client.Client.get<TContent>(key);

        return value;
    }
}