import React,{useState,useEffect} from 'react'
import Header from "../CommonComponent/Header"
import { Box ,Button,TextField,Chip,Stack} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VideoUpload = () => {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [error,setError]=useState(false)
  const [tags, setTags] = useState([]);
  const [tagInput,setTagInput]=useState("");
   const [videoObject,setVideoObject]=useState(
    {
       size:"",
       title:"",
       category:"",
       subcategory:"",
       duration:"",
    }
  );
  const addTag = () => {
    console.log("Gek")
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      console.log("tags ::",tags)
    }
  };
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
    } else {
      console.log("Selected video is bigger then 5242880KB")
      setselectedVideo(null);
      setVideoObject({...videoObject,size:null})
      setError(true)
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };
  const handleDelete=(tag)=>
  {
    const filteredTags=tags.filter((item)=>item!==tag)
    setTags(filteredTags)
    return tags;
  }

  useEffect(() => {
    if (selectedVideo) {
      const videoElement = document.createElement('video');
      videoElement.src = selectedVideo;
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoObject({...videoObject,duration:videoElement.duration})
      });
    }
  }, [selectedVideo]);
  console.log("Selected video is::",videoObject)
  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleStateChange = (value, fieldName) => {
    setVideoObject((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  return (
    <div>
      <Header title=""/>
      <h1 className='text-black'>Video</h1>
      <div className="mt-20 flex items-center flex-col">
        <div
          className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${
            isSingleExpanded ? "h-auto" : ""
          }`}
          onClick={handleSingleVideoSection}
        >
         <div className='text-xl font-bold'>
          Single Video Upload
          </div> 
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
                  accept="video/*"
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
                    accept="video/*"
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
              <video src={selectedVideo} controls width="400px" height="400px">
          {/* Your browser does not support the video tag. */}
        </video>
              <div className="mt-4">
                <div className="flex gap-4">
                  <TextField
                    label="Title"
                    variant="outlined"
                    sx={{width:'25ch'}}
                    value={videoObject.title}
                    onChange={(event) => handleStateChange(event.target.value, 'title')}
                  />
                   <TextField
                    label="Category"
                    variant="outlined"
                    sx={{width:'25ch'}}
                    value={videoObject.category}
                    onChange={(event) => handleStateChange(event.target.value, 'category')}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-4">
                <TextField
                  label="Duration in seconds"
                  variant="outlined"
                  value={videoObject.duration}
                  InputProps={{
                    readOnly: true,
                    disabled:true,
                  }}                
                  onChange={(event) => handleStateChange(event.target.value, "duration")}         
                />
                  <TextField
                    label="Subcategory"
                    variant="outlined"
                    sx={{width:'25ch'}}
                    value={videoObject.subcategory}
                    onChange={(event) => handleStateChange(event.target.value, "subcategory")}
                  />
                </div>
              </div>
              <div className="mt-4">
              <div className="flex gap-4">
                <TextField
                  label="Tags"
                  variant="outlined"
                  value={tagInput}
                  onChange={(e)=>setTagInput(e.target.value)}
                  sx={{width: '60ch'}}
                />
                 <Button variant="contained" onClick={addTag}>
                    Add Tag
                  </Button>
                  </div>
                </div>
                <div className="mt-2 flex">               
                  <Stack direction="row" spacing={1}>
                    {
                      tags && tags.map((tag,index)=>
                      {
                        return <Chip key={index} label={tag} onDelete={()=>handleDelete(tag)} />
                      }
                    )}
                </Stack>
              </div>
              <div className="mt-4">
                Video Size:{videoObject.size} KB
              </div>
              {videoObject.size > 5242880 && (
                <div className="mt-2 text-red-500">
                  The selected video exceeds the maximum file size of 5MB.
                  Please choose a smaller video.
                </div>
              )}
            <Button variant="contained"
                  component="label"
                  className="mt-2"  onClick={() => {
                    console.log("videoObject is::",videoObject)
                  }}> Upload</Button>
            </div>
          )}
        </div>

        <div
          className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow`}
        >
         <div className='text-xl font-bold'>
          Multiple Videos Upload
          </div> 
        </div>
      </div>
    </div>
  )
}

export default VideoUpload