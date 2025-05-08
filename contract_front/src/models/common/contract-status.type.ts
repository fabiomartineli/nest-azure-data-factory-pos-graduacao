export enum ContractStatusType {
    inProgress = 1,
    success,
    failed
}

export const ContractStatusTypeDescription: Map<ContractStatusType, string> = new Map<ContractStatusType, string>([
    [ContractStatusType.inProgress, "Em processamento"],
    [ContractStatusType.success, "Processado com sucesso"],
    [ContractStatusType.failed, "Falha no processamento"]
]);