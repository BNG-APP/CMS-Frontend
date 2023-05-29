import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../CommonComponent'
import { API_URLS } from '../../shared/Constant';
import useFetch from '../../Utilities/useFetch';

function MultiQuestion() {
  const location = useLocation();
  const MAX_FILE_SIZE_KB = 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataUpdload,dataUploadApi,loading]=useFetch(API_URLS.dataUpload,{selectedFile,selectedCSVFile})
  const navigate=useNavigate()
  const handleUpload = (e) => {
    // const file = files[0];
    // if (file.size > MAX_FILE_SIZE_KB * 1024) {
    //   // File size exceeds the limit
    //   console.log('File size exceeds the limit');
    //   return;
    // }
    // console.log(file);
    setSelectedFile(e.target.value);
    // console.log(file.size, "file size");
   
  };
  useEffect(() => {
    if(selectedCSVFile&&selectedFile){
      console.log("inside");
      setIsDisabled(false)
    }
  }, [selectedCSVFile,selectedFile])
  const uploadApi=()=>{
    dataUploadApi()
  }
  console.log(selectedCSVFile,selectedFile);
  const handleCSVUpload = (e) => {
    // console.log(files);
    // const file = files[0];
    // if (file.size > MAX_FILE_SIZE_KB * 1024) {
    //   // File size exceeds the limit
    //   console.log('File size exceeds the limit');
    //   return;
    // }
    setSelectedCSVFile(e.target.value);
    
  };
  return (
    <div>
      <Header />
      <div className="flex w-full mt-20">
        <div className="flex flex-col m-2">
          <div className="text-black">Upload ZIP Files</div>
          <div className="flex m-2">
            <input type="file" accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" className="text-black" onChange={handleUpload} />
            {/* <div className="text-black">{selectedFile}</div> */}
           
          </div>
          <div className="flex flex-col">
            <div className="text-black">Upload Csv Files</div>
            <div className="flex m-2">
              <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="text-black" onChange={handleCSVUpload} />
              {/* <div className="text-black">{selectedCSVFile}</div> */}
             
            </div>
          </div>
          <Button variant="contained" onClick={uploadApi} disabled={isDisabled} >
                Upload
              </Button>
        </div>
        <div className="flex flex-col justify-around mt-3">
            <div className="p-4 font-bold">
              <Button variant="outlined" onClick={()=>{navigate("/swipe4win/ViewResult")}}>View Result</Button>
            </div>

            <div className="p-4">
              <Button variant="outlined" onClick={()=>{navigate("/swipe4win/ViewEntity")}}>View Entities</Button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MultiQuestion