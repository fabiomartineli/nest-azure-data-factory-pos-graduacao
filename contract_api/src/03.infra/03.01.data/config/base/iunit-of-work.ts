import { ClientSession } from "typeorm";

export interface IUnitOfWork {
    startTransactionAsync(): Promise<void>;
    commitTransactionAsync(): Promise<void>;
    getSession(): ClientSession;
}