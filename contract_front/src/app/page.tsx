import React, { Suspense } from "react";
import { ListFilesHoC } from "./(components)/(list_files)/list-files.hoc";
import { NewFileHoC } from "./(components)/(new_file)/new-file.hoc";

import './styles.css';

export default function Home() {
  return (
    <>
      <div className="root-container">
          <NewFileHoC />
          <Suspense fallback={<div>Crregando...</div>}>
            <ListFilesHoC />
          </Suspense>
      </div>
    </>
  );
}
