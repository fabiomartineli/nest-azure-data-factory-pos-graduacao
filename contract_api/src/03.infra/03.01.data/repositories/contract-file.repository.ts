import { Inject, Injectable, Scope } from '@nestjs/common';
import { EntityManager, MongoRepository } from 'typeorm';
import { ContractFileSchema } from '../config/mapping/contract-file.schema';
import { ContractFile } from 'src/01.domain/entities/contract-file.entity';
import { IContractFileRepository } from 'src/01.domain/interfaces/repositories/icontract-file.repository';

@Injectable({ scope: Scope.REQUEST })
export class ContractFileRepository implements IContractFileRepository {
    private readonly _repository: MongoRepository<ContractFile>;

    constructor(
        @Inject(EntityManager) manager: EntityManager,
    ) {
        this._repository = manager.getMongoRepository<ContractFile>(ContractFileSchema);
    }

    async addAsync(entity: ContractFile): Promise<void> {
        await this._repository.insert(entity);
    }

    async updateAsync(entity: ContractFile): Promise<void> {
        await this._repository.update({
            _id: entity._id,
        }, entity);
    }

    async findByIdAsync(id: string): Promise<ContractFile> {
        const result = await this._repository.findOne({
            where: {
                _id: { $eq: id },
            }
        });

        return ContractFile.createFrom(result);
    }

    async existsByIdAsync(id: string): Promise<boolean> {
        return !!await this._repository.findOne({
            where: {
                _id: { $eq: id },
            }
        });
    }

    async findAllAsync(): Promise<ContractFile[]> {
        return await this._repository.find();
    }
}