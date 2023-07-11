import React,{useState} from 'react'
import Header from "../CommonComponent/Header"
import { Box ,Button,TextField} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VideoUpload = () => {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [error,setError]=useState(false)
  const [tags, setTags] = useState("");
   const [videoObject,setVideoObject]=useState(
    {
       size:"",
       title:"",
       category:"",
       subcategory:"",
       duration:"",
    }
  )
    const handleSingleVideoSection = () => {
    setIsSingleExpanded(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleVideoUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    handleVideoUpload(file);
  };

  const handleVideoUpload = (file) => {
    if (file && file.size <= 5242880) {
      setselectedVideo(URL.createObjectURL(file));
      setVideoObject({...videoObject,size:file.size})
      // setselectedAudioSize(file.size);
    } else {
      console.log("Selected video is bigger then 5242880KB")
      setselectedVideo(null);
      setAudioObject({...videoObject,size:null})
      setError(true)
      // setselectedAudioSize(null);
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };


  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleStateChange = (value, fieldName) => {
    setAudioObject((prevState) => ({
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
          onClick={handleSingleVideoSection}
        >
          Single Video Upload
          {isSingleExpanded && !selectedVideo && (
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
                  accept="audio/*"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <span>Drag and drop an video here</span>
                <Button
                  variant="contained"
                  component="label"
                  className="mt-2"
                >
                  Choose Video
                  <input
                    type="file"
                    accept="audio/*"
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
          {isSingleExpanded && selectedVideo && (
            <div className="mt-4">
              <audio controls>
                  <source src={selectedVideo} type="audio/mp3"/>              
                </audio>
              <div className="mt-4">
                <div className="flex gap-4">
                  <TextField
                    label="Title"
                    variant="outlined"
                    value={audioObject.title}
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
                    value={audioObject.category}
                    onChange={(event) => handleStateChange(event.target.value, 'category')}
                  />
                  <TextField
                    label="Subcategory"
                    variant="outlined"
                    value={audioObject.subcategory}
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
                  label="Duration in seconds"
                  variant="outlined"
                  value={audioObject.duration}
                  onChange={(event) => handleStateChange(event.target.value, "duration")}
                  fullWidth
                />
              </div>
              <div className="mt-4">
                {/* Audio Size: {(selectedAudioSize / 1024).toFixed(2)} KB */}
                Video Size:{audioObject.size} KB
              </div>
              {audioObject.size > 5242880 && (
                <div className="mt-2 text-red-500">
                  The selected video exceeds the maximum file size of 5MB.
                  Please choose a smaller video.
                </div>
              )}
            <Button variant="contained"
                  component="label"
                  className="mt-2"  onClick={() => {
                    console.log("AudioObject is::",videoObject)
                  }}> Upload</Button>
            </div>
          )}
        </div>

        <div
          className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow`}
        >
          Multiple Videos Upload
        </div>
      </div>
    </div>
  )
}

export default VideoUpload