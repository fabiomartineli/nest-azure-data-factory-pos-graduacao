import { Inject, Injectable, Scope } from '@nestjs/common';
import { EntityManager, MongoRepository } from 'typeorm';
import { IContractFileDataRepository } from 'src/01.domain/interfaces/repositories/icontract-file-data.repository';
import { ContractFileData } from 'src/01.domain/entities/contract-file-data.entity';
import { ContractFileDataSchema } from '../config/mapping/contract-file.schema-data';

@Injectable({ scope: Scope.REQUEST })
export class ContractFileDataRepository implements IContractFileDataRepository {
    private readonly _repository: MongoRepository<ContractFileData>;

    constructor(
        @Inject(EntityManager) manager: EntityManager,
    ) {
        this._repository = manager.getMongoRepository<ContractFileData>(ContractFileDataSchema);
    }

    findByFileAndCustomerAsync(fileName: string, customerDocument: string): Promise<ContractFileData> {
        return this._repository.findOne({
            where: {
                $and: [
                    {
                        fileName: {
                            $eq: fileName
                        },
                    },
                    {
                        "customer.document": {
                            $eq: customerDocument
                        }
                    }
                ]
            }
        })
    }

    async findByFileAsync(fileName: string): Promise<ContractFileData[]> {
        const result = await this._repository.find({
            where: {
                fileName: {
                    $eq: fileName
                },
            }
        });

        return result.map(ContractFileData.createFrom);
    }

    async deleteByFileAsync(fileName: string): Promise<void> {
        await this._repository.delete({
            fileName
        });
    }
}