import { AzureAppConfiguration } from "@azure/app-configuration-provider";

export interface IAppConfigurationClient {
    get Client(): AzureAppConfiguration;
}