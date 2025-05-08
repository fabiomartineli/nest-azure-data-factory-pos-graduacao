export interface IStorageService {
    genereateWriteSasUrlAsync(containerName: string): Promise<string>;
}