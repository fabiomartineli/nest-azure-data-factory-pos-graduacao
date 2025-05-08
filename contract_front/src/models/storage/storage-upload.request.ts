export type StorageUploadRequest = {
    file: File;
    containerName: string;
    callbackOnProgress?: (sentBytes: number) => void;
}