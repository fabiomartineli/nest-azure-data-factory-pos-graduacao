import React from 'react';

import './styles.css';
import { ContractStatusType } from '@/models/common/contract-status.type';

type ListFileProps = {
  name: string;
  status: ContractStatusType;
  statusDescription: string;
  uploadedAt: string;
  updatedAt: string;
};

const ListFilesItem: React.FC<ListFileProps> = ({ name, uploadedAt, updatedAt, status, statusDescription }) => {
  return (
    <div className="list-files-item">
      <span className="list-files-item-name">{name}</span>
      <span className="">{uploadedAt}</span>
      <span className="">{updatedAt}</span>
      <span className={`list-files-item-status ${ContractStatusType[status]}`}>{statusDescription}</span>
    </div>
  );
};

export {
  ListFilesItem
};
