'use client'
import React from 'react';
import { INewFileViewModel } from '@/app/(viewmodel)/new-file.viewmodel';

import './styles.css';

type NewFileComponentPropos = {
  controller: INewFileViewModel;
}

const NewFileComponent: React.FC<NewFileComponentPropos> = ({ controller }) => {
  return (
    <div className="new-file-wrapper">
      {controller.fileName && <p className="new-file-name">Arquivo - {controller.fileName}</p>}

      <label htmlFor="new-file-upload" className="new-file-button">
        Selecionar arquivo
      </label>
      <input
        id="new-file-upload"
        type="file"
        onChange={controller.uploadAsync}
        className="new-file-input"
      />

      {controller.isUploadPending && (
        <div className="new-file-progress-bar">
          <div
            className="new-file-progress-bar-fill" style={{ width: `${controller.uploadProgress}%` }}
          />
        </div>
      )}

      {controller.uploadResult === true && (<p className={`new-file-status-message success`}>Arquivo enviado com sucesso e aguardando processamento.</p>)}
      {controller.uploadResult === false && (<p className={`new-file-status-message error`}>Erro ao enviar o arquivo.</p>)}
    </div>
  );
};

export {
  NewFileComponent
}