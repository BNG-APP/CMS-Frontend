import React,{useState,useEffect} from 'react'
import Header from './Header'
import { Box ,Button,TextField,Typography} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Document, Page } from 'react-pdf';

const PdfUpload = () => {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [selectedPdf, setselectedPdf] = useState(null);
  const [error,setError]=useState(false)
  const [tags, setTags] = useState("");
   const [pdfObject,setPdfObject]=useState(
    {
       size:"",
       title:"",
       category:"",
       subcategory:"",
       pages:""
    }
  )
  const handleSinglePdfSection = () => {
    setIsSingleExpanded(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handlePdfUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    handlePdfUpload(file);
  };

  const handlePdfUpload = (file) => {
    if (file && file.size <= 5242880) {
      setselectedPdf(URL.createObjectURL(file));
      setPdfObject({...pdfObject,size:file.size})
      console.log("number of pages are:::",file)
    } else {
      console.log("Selected pdf is bigger then 5242880KB")
      setselectedPdf(null);
      setPdfObject({...pdfObject,size:null})
      setError(true)
      // setselectedAudioSize(null);
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

// Function to get the number of pages in the selected PDF
// const getNumPages = async () => {
//   const response = await fetch(selectedPdf);
//   const buffer = await response.arrayBuffer();
//   const pdfData = new Uint8Array(buffer);

//   return new Promise((resolve, reject) => {
;
  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleStateChange = (value, fieldName) => {
    setPdfObject((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  return (
    <div>
    <Header title=""/>
    <h1 className='txt-black'>Video</h1>
    <div className="mt-20 flex items-center flex-col">
      <div
        className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${
          isSingleExpanded ? "h-auto" : ""
        }`}
        onClick={handleSinglePdfSection}
      >
        Single Pdf Upload
        {isSingleExpanded && !selectedPdf && (
          <div className="mt-4">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                border: "2px dashed #ccc",
                borderRadius: "4px",
                padding: "16px",
              }}
              onDrop={handleDrop}
              onDragOver={preventDefault}
            >
              <CloudUploadIcon fontSize="large" />
              <input
                type="file"
                accept="application/pdf"
                
                onChange={handleFileInput}
                style={{ display: "none" }}
              />
              <span>Drag and drop an pdf here</span>
              <Button
                variant="contained"
                component="label"
                className="mt-2"
              >
                Choose Pdf
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
              </Button>
            </Box>
            {error &&
            <Typography variant="subtitle2" component="p" color="error.main">
             * The file you are trying to upload is larger then 5 MB.
         </Typography>
}
          </div>
        )}
        {isSingleExpanded && selectedPdf && (
          <div className="mt-4">
           <iframe
          src={selectedPdf}
          title="PDF Viewer"
          width="500px"
          height="500px"
        />
            <div className="mt-4">
              <div className="flex gap-4">
                <TextField
                  label="Title"
                  variant="outlined"
                  value={pdfObject.title}
                  onChange={(event) => handleStateChange(event.target.value, 'title')}
                />
                {/* <TextField
                  label="Alt Text"
                  variant="outlined"
                  value={altText}
                  onChange={handleAltTextChange}
                /> */}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex gap-4">
                <TextField
                  label="Category"
                  variant="outlined"
                  value={pdfObject.category}
                  onChange={(event) => handleStateChange(event.target.value, 'category')}
                />
                <TextField
                  label="Subcategory"
                  variant="outlined"
                  value={pdfObject.subcategory}
                  onChange={(event) => handleStateChange(event.target.value, "subcategory")}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextField
                label="Tags"
                variant="outlined"
                value={tags}
                onChange={handleTagsChange}
                fullWidth
              />
            </div>
            <div className="mt-4">
              <TextField
                label="Pages"
                variant="outlined"
                value={pdfObject.pages}
                onChange={(event) => handleStateChange(event.target.value, "pages")}
                fullWidth
              />
            </div>
            <div className="mt-4">
              {/* Audio Size: {(selectedAudioSize / 1024).toFixed(2)} KB */}
              pdf Size:{pdfObject.size} KB
            </div>
            {pdfObject.size > 5242880 && (
              <div className="mt-2 text-red-500">
                The selected pdf exceeds the maximum file size of 5MB.
                Please choose a smaller pdf.
              </div>
            )}
          <Button variant="contained"
                component="label"
                className="mt-2"  onClick={() => {
                  console.log("pdfObject is::",pdfObject)
                  // alert(pdfObject)
                }}> Upload</Button>
          </div>
        )}
      </div>

      <div
        className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow`}
      >
        Multiple Pdfs Upload
      </div>
    </div>
  </div>
  )
}

export default PdfUpload