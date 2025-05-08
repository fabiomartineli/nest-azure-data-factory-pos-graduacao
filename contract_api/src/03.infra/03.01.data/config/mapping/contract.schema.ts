import { Contract } from "src/01.domain/entities/contract.entity";
import { EntitySchema } from "typeorm";

export const ContractSchema = new EntitySchema<Contract>({
     name: "Contract",
        tableName: "contract",
        columns: {
            _id: {
                type: 'string',
                nullable: false,
                primary: true,
                objectId: true,
            },
            description: {
                type: 'string',
                nullable: false,
            },
            contractFileId: {
                type: 'string',
                nullable: false,
            },
            createdAt: {
                type: 'timestamp without time zone',
                nullable: false,
            },
            updateAt: {
                type: 'timestamp without time zone',
                nullable: false,
            },
            rate: {
                type: 'enum',
                nullable: false,
            },
            customer: {
                type: "jsonb",
                nullable: false,
            },
            value: {
                type: "decimal",
                nullable: false,
            }
        },
});