import { Inject, Injectable, Scope } from '@nestjs/common';
import { EntityManager, MongoRepository } from 'typeorm';
import { IContractRepository } from 'src/01.domain/interfaces/repositories/icontract.repository';
import { Contract } from 'src/01.domain/entities/contract.entity';
import { ContractSchema } from '../config/mapping/contract.schema';

@Injectable({ scope: Scope.REQUEST })
export class ContractRepository implements IContractRepository {
    private readonly _repository: MongoRepository<Contract>;

    constructor(
        @Inject(EntityManager) manager: EntityManager,
    ) {
        this._repository = manager.getMongoRepository<Contract>(ContractSchema);
    }

    async addAsync(entity: Contract): Promise<void> {
            await this._repository.save(entity);
        }
    
        async updateAsync(entity: Contract): Promise<void> {
            await this._repository.update({
                _id: entity._id,
            }, entity);
        }

    async findByIdAsync(id: string): Promise<Contract> {
        return await this._repository.findOne({
            where: {
                _id: { $eq: id },
            }
        });
    }

    async findByFileAndCustomerAsync(contractFileId: string, customerDocument: string): Promise<Contract> {
        const result = await this._repository.findOne({
            where: {
                $and: [
                    {
                        contractFileId: {
                            $eq: contractFileId
                        },
                    },
                    {
                        "customer.document": {
                            $eq: customerDocument
                        }
                    }
                ]
            }
        });
        return Contract.createFrom(result);
    }

    async findAllAsync(): Promise<Contract[]> {
        return await this._repository.find();
    }
}