'use client'
import React from 'react';
import { ListFiles } from './list-files.component';
import { SseServiceFactory } from '@/services/sse/sse-service.factory';
import { ContractFileServiceFactory } from '@/services/contract-file/contract-file-service.factory';
import { useListFilesController } from '@/app/(controller)/list-files.controller';

const contractFileService = ContractFileServiceFactory.Create();
const sse = SseServiceFactory.Create();

const ListFilesHoC: React.FC = () => {
    const controller = useListFilesController({
        contractFileService,
        sse
    });

    return (
        <ListFiles controller={controller} />
    );
};

export {
    ListFilesHoC
};
