import { Injectable, Scope } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ClientSession, MongoEntityManager } from "typeorm";

@Injectable({scope: Scope.REQUEST})
export class UnitOfWork {
    private _session: ClientSession;

    constructor( @InjectEntityManager()private readonly _entityManager: MongoEntityManager) 
    {}

    async startTransactionAsync(): Promise<void> {
        this._session = this._entityManager.mongoQueryRunner.databaseConnection.startSession();
        this._session.startTransaction();
    }

    async commitTransactionAsync(): Promise<void> {
        await this._session.commitTransaction();
    }

    getSession(): ClientSession {
        return this._session;
    }
}