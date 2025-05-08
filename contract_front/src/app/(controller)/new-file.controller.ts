'use client'
import { INewFileViewModel } from "@/app/(viewmodel)/new-file.viewmodel";
import { useState } from "react";
import { IStorageService } from "@/services/storage/storage.service";
import { IContractFileService } from "@/services/contract-file/contract-file.service";

type Propos = {
    storageService: IStorageService;
    contractFileService: IContractFileService;
}

type State = Omit<INewFileViewModel, "uploadAsync">;

export function useNewFileController(props: Propos): INewFileViewModel {
    const [state, setState] = useState<State>({} as State);

    async function uploadAsync(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            var success = false;
            
            setState((current) => ({
                ...current,
                isUploadPending: true,
                fileName: file.name,
            }));

            success = await props.contractFileService.createAsync({
                fileName: file.name
            });

            if (success) {
                success = await props.storageService.uploadAsync({
                    containerName: "contracts",
                    file: file,
                    callbackOnProgress: (progress) => {
                        setState((current) => ({
                            ...current,
                            uploadProgress: (progress / file.size) * 100,
                        }));
                    }
                });
            }

            setState((current) => ({
                ...current,
                isUploadPending: false,
                uploadProgress: 0,
                uploadResult: success
            }));

            event.target.value = "";
        }
    }

    return {
        uploadAsync,
        ...state,
    }
}