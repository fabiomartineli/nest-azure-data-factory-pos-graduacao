export interface INewFileViewModel {
    uploadAsync(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;

    isUploadPending: boolean;
    uploadResult: boolean | null;
    fileName: string;
    uploadProgress: number;
}