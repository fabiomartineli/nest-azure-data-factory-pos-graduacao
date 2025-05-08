import React from 'react';
import { ListHeader } from './list-files-header.component';
import { ListFilesTitle } from './list-files-title.component';
import { ListFilesItem } from './list-files-item.component';
import { IListFilesViewModel } from '@/app/(viewmodel)/list-files.viewmodel';

import './styles.css';

interface FileListProps {
  controller: IListFilesViewModel;
}

const ListFiles: React.FC<FileListProps> = ({ controller }) => {
  return (
    <div className="list-files-container">
      <ListFilesTitle />
      <ListHeader />
      {controller.files?.items.map((file) => (
        <ListFilesItem
          key={file.fileName}
          name={file.fileName}
          uploadedAt={file.uploadAt}
          updatedAt={file.updateAt}
          status={file.status}
          statusDescription={file.statusDescription}
        />
      ))}
    </div>
  );
};

export {
  ListFiles
};
