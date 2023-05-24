import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

function SingleQuestion() {
  const location = useLocation();
  const MAX_FILE_SIZE_KB = 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpload = (files) => {
    const file = files[0];
    if (file.size > MAX_FILE_SIZE_KB * 1024) {
      // File size exceeds the limit
      console.log('File size exceeds the limit');
      return;
    }
    setSelectedFile(file);
    console.log(file.size,"file size");
  };
  
  console.log(location.state);
  return (
    <div>
      <div >
        <input type="file" accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" className="text-black"/>
      <div className="text-black">{selectedFile}</div>
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
        </div>
     
    </div>
  );
}

export default SingleQuestion;
