import { ContractFile } from 'src/01.domain/entities/contract-file.entity';
import { ContractStatusType } from 'src/01.domain/types/contract-status.type';
import { EntitySchema } from 'typeorm';

export const ContractFileSchema = new EntitySchema<ContractFile>({
    name: "ContractFile",
    tableName: "contract_file",
    columns: {
        _id: {
            type: 'string',
            nullable: false,
            primary: true,
            objectId: true,
        },
        status: {
            type: "enum",
            enum: ContractStatusType,
            primary: false,
            nullable: false,
        },
        message: {
            type: 'string',
            nullable: false,
        },
        uploadAt: {
            type: 'timestamp without time zone',
            nullable: false,
        },
        updateAt: {
            type: 'timestamp without time zone',
            nullable: false,
        },
    },
});