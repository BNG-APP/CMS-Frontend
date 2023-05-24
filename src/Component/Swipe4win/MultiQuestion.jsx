import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Header } from '../../CommonComponent'

function MultiQuestion() {
  const location = useLocation();
  const MAX_FILE_SIZE_KB = 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const handleUpload = (files) => {
    const file = files[0];
    if (file.size > MAX_FILE_SIZE_KB * 1024) {
      // File size exceeds the limit
      console.log('File size exceeds the limit');
      return;
    }
    setSelectedFile(file);
    console.log(file.size, "file size");
  };
  const handleCSVUpload = (files) => {
    const file = files[0];
    if (file.size > MAX_FILE_SIZE_KB * 1024) {
      // File size exceeds the limit
      console.log('File size exceeds the limit');
      return;
    }
    setSelectedCSVFile(file);
    console.log(file.size, "file size");
  };
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col m-2">
          <div className="text-black">Upload Csv Files</div>
          <div className="flex m-2">
            <input type="file" accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" className="text-black" />
            <div className="text-black">{selectedFile}</div>
            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="text-black">Upload Csv Files</div>
            <div className="flex m-2">
              <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="text-black" />
              <div className="text-black">{selectedCSVFile}</div>
              <Button variant="contained" onClick={handleCSVUpload}>
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiQuestion