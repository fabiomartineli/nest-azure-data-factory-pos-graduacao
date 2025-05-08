'use client'
import React from 'react';
import { NewFileComponent } from './new-file.component';
import { useNewFileController } from '@/app/(controller)/new-file.controller';
import { StorageServiceFactory } from '@/services/storage/storage-service.factory';
import { ContractFileServiceFactory } from '@/services/contract-file/contract-file-service.factory';

const storageService = StorageServiceFactory.Create();
const contractFileService = ContractFileServiceFactory.Create();

const NewFileHoC: React.FC = () => {
    const controller = useNewFileController({
        contractFileService,
        storageService
    });

    return (
        <NewFileComponent controller={controller} />
    );
};

export {
    NewFileHoC
};
