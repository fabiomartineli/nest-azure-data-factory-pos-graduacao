import { ContractFileData } from 'src/01.domain/entities/contract-file-data.entity';
import { EntitySchema } from 'typeorm';

export const ContractFileDataSchema = new EntitySchema<ContractFileData>({
    name: "ContractFileData",
    tableName: "contract_file_data",
    columns: {
        _id: {
            type: 'string',
            nullable: false,
            primary: true,
            objectId: true,
        },
        fileName: {
            type: 'string',
            nullable: false,
        },
        description: {
            type: 'string',
            nullable: false,
        },
        contract: {
            type: 'jsonb',
            nullable: false,
        },
        customer: {
            type: 'jsonb',
            nullable: false,
        },
    },
});