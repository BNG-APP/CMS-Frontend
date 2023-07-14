import React, { useState,useEffect } from 'react';
import { Box, Button, TextField,Typography ,Chip,Stack} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Header  from './Header';

const AudioUpload = () => {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [error,setError]=useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [audioObject,setAudioObject]=useState(
    {
       size:"",
       title:"",
       category:"",
       subcategory:"",
       duration:"",
    }
  )
  const addTag = () => {
    console.log("Gek")
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      console.log("tags ::",tags)
    }
  };

  const handleSingleAudioSection = () => {
    setIsSingleExpanded(true);
  };
  useEffect(() => {
    if (selectedAudio) {
      const audioElement = document.createElement('audio');
      audioElement.src = selectedAudio;
      audioElement.addEventListener('loadedmetadata', () => {
        setAudioObject({...audioObject,duration:audioElement.duration})
      });
    }
  }, [selectedAudio]);
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleAudioUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    handleAudioUpload(file);
  };

  const handleAudioUpload = (file) => {
    if (file && file.size <= 5242880) {
      setSelectedAudio(URL.createObjectURL(file));
      setAudioObject({...audioObject,size:file.size})
      const reader = new FileReader();
      reader.onload = () => {
        const audioSrc = reader.result; // Get the data URL of the image
        setSelectedAudio(audioSrc);
      };
      reader.readAsDataURL(file);
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onload = () => {
        const audioWidth = audio.naturalWidth;
        const audioHeight = audio.naturalHeight;
        console.log("Dimensions are::",`${audioWidth} x ${audioHeight}`)
        // setDimensions(`${imageWidth} x ${imageHeight}`);
      };
    } else {
      console.log("Selected audio is bigger then 5242880KB")
      setSelectedAudio(null);
      setAudioObject({...audioObject,size:null})
      setError(true)
      // setselectedAudioSize(null);
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

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleStateChange = (value, fieldName) => {
    setAudioObject((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
 console.log("the tags are :",tags)
  return (
    <div>
      <Header title=""/>
      <h1 className='text-black'>Audio</h1>
      <div className="mt-20 flex items-center flex-col">
        <div
          className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${
            isSingleExpanded ? "h-auto" : ""
          }`}
          onClick={handleSingleAudioSection}
        >
         <div className='text-xl font-bold'> Single Audio Upload</div>
          {isSingleExpanded && !selectedAudio && (
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
                <span>Drag and drop an audio here</span>
                <Button
                  variant="contained"
                  component="label"
                  className="mt-2"
                >
                  Choose Audio
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
          {isSingleExpanded && selectedAudio && (
            <div className="mt-4">
              <audio controls>
                  <source src={selectedAudio} type="audio/mp3"/>              
                </audio>
              <div className="mt-4">
                <div className="flex gap-4 ">
                  <TextField
                    label="Title"
                    variant="outlined"
                    sx={{width: '25ch'}}
                    value={audioObject.title}
                    onChange={(event) => handleStateChange(event.target.value, 'title')}
                  />
                    <TextField
                    label="Category"
                    variant="outlined"
                    sx={{width: '25ch'}}
                    value={audioObject.category}
                    onChange={(event) => handleStateChange(event.target.value, 'category')}
                  />
                  
                </div>
              </div>
              <div className="mt-4"> 
              <div className="flex gap-4">           
                 <TextField
                  label="Duration in seconds"
                  variant="outlined"
                  value={audioObject.duration}
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
                    value={audioObject.subcategory}
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
              </div>             
            
              <div className="mt-4">
                Audio Size:{audioObject.size} KB
              </div>
              {audioObject.size > 5242880 && (
                <div className="mt-2 text-red-500">
                  The selected audio exceeds the maximum file size of 5MB.
                  Please choose a smaller audio.
                </div>
              )}
            <Button variant="contained"
                  component="label"
                  className="mt-2"  onClick={() => {
                    console.log("AudioObject is::",audioObject)
                  }}> Upload</Button>
            </div>
          )}
        </div>

        <div
          className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow`}
        >
         <div className='text-xl font-extrabold'>Multiple Audios Upload</div>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
