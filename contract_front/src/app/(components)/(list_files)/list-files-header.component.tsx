import React from 'react';

import './styles.css';

const ListHeader: React.FC = () => {
  return (
    <div className="list-files-header">
      <span>Nome</span>
      <span>Enviado em</span>
      <span>Atualizado em</span>
      <span>Status</span>
    </div>
  );
};

export {
  ListHeader
};
