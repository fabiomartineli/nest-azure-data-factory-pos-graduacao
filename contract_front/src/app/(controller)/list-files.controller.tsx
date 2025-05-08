import { ContractStatusTypeDescription } from "@/models/common/contract-status.type";
import { IListFilesViewModel } from "../(viewmodel)/list-files.viewmodel";
import { ContractFileServiceFactory } from "@/services/contract-file/contract-file-service.factory";
import { IContractFileService } from "@/services/contract-file/contract-file.service";
import { useEffect, useState } from "react";
import { ISseService } from "@/services/sse/sse.service";
import { useSearchParams } from "next/navigation";

type Propos = {
    contractFileService: IContractFileService;
    sse: ISseService;
}

type State = Omit<IListFilesViewModel, "">;

export function useListFilesController(props: Propos): IListFilesViewModel {
    const params = useSearchParams();
    const [state, setState] = useState<State>({} as State);

    async function getAllAsync() {
        const files = await ContractFileServiceFactory.Create().getAllAsync();
        const items = files.map(file => ({
            fileName: file.fileName,
            status: file.status,
            statusDescription: ContractStatusTypeDescription.get(file.status) ?? "Não identificado",
            uploadAt: new Date(file.uploadAt).toLocaleString(),
            updateAt: new Date(file.updateAt).toLocaleString(),
        }));

        setState(current => ({ ...current, files: { items } }))
    }

    async function subscriberOnFileEventAsync() {
        await props.sse.subscriberAsync({
            userId: params.get("user-id")!,
            eventsName: ["contract-file-created"],
            handle: getAllAsync
        })
    }

    async function stopOnFileEventAsync() {
        await props.sse.stopAsync({
            userId: params.get("user-id")!,
            eventsName: ["contract-file-created", "contract-file-success", "contract-file-failed"],
            handle: getAllAsync
        })
    }

    useEffect(() => {
        subscriberOnFileEventAsync();   
        getAllAsync();

        return () => {
            stopOnFileEventAsync();
        }
    }, []);

    return {
        ...state,
    }
}