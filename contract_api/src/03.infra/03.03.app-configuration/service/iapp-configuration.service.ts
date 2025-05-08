export interface IAppConfigurationService {
    getValue<TContent>(key: string): TContent;
}