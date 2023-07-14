import React, { useState } from "react";
import Header from "./Header";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export default function ImageUpload() {
  const [isSingleExpanded, setIsSingleExpanded] = useState(true);
  const [isMultiExpanded, setIsMultiExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImageSize, setSelectedImageSize] = useState(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [dimensions, setDimensions] = useState("");
  const [description, setDescription] = useState("");
  const [jsonDialogOpen, setJsonDialogOpen] = useState(false);
  const [isJsonCopied, setIsJsonCopied] = useState(false);
  const [duplicateImageError, setDuplicateImageError] = useState(false);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [csvError, setCSVError] = useState(null);
  const [multiImageJsonDialogOpen, setMultiImageJsonDialogOpen] = useState(false);


  const handleSingleImageSection = () => {
    setIsSingleExpanded(true);
    setIsMultiExpanded(false);
  };

  const handleMultiImageSection = () => {
    setIsMultiExpanded(true);
    setIsSingleExpanded(false);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonData);
    setIsJsonCopied(true);
  };

  const handleDropMulti = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleImageUploadMulti(files);
  };

  const handleOpenMultiImageJsonDialog = () => {
    setMultiImageJsonDialogOpen(true);
  };
  const handleCloseMultiImageJsonDialog = () => {
    setMultiImageJsonDialogOpen(false);
  };

  const multiImageData = JSON.stringify(
    {
      images: selectedFiles.map((file) => file.url),
      csvFile: selectedCSVFile ? selectedCSVFile.name : null,
    },
    null,
    2
  );

  const handleMultiFileInput = (event) => {
    const files = Array.from(event.target.files);
    handleImageUploadMulti(files);
  };


  const handleImageUploadMulti = (files) => {
    let hasError = false;
    Array.from(files).forEach((file) => {
      const isDuplicate = selectedFiles.some(
        (selectedFile) => selectedFile.file.name === file.name
      );
      if (isDuplicate) {
        hasError = true;
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedFiles((prevFiles) => [
            ...prevFiles,
            { file: file, url: reader.result }, // Store the image URL directly
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    if (hasError) {
      setDuplicateImageError(true);
    }
  };
  console.log(selectedFiles, "selectedFiles");

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    console.log(file);
    if (file && file.size <= 20480) {
      setSelectedImage(file);
      setSelectedImageSize(file.size);
      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result; // Get the data URL of the image
        setSelectedImage(imageSrc);
      };
      reader.readAsDataURL(file);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const imageWidth = img.naturalWidth;
        const imageHeight = img.naturalHeight;
        setDimensions(`${imageWidth} x ${imageHeight}`);
      };
    } else {
      setSelectedImage(null);
      setSelectedImageSize(file ? file.size : null);
      setDimensions("");
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAltTextChange = (event) => {
    setAltText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("altText", altText);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("tags", JSON.stringify(tags));
    formData.append(
      "dimensions",
      JSON.stringify({
        pixel: {
          width: parseInt(dimensions.split("x")[0].trim()),
          height: parseInt(dimensions.split("x")[1].trim()),
        },
      })
    );
    formData.append("description", description);

    console.log(
      formData.getAll("image", "title", "altText", "description"),
      "formdata"
    );

    // TODO: Send the formData to your API endpoint using fetch or axios
    fetch("your-api-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle any errors
      });

    // Reset form fields
    setSelectedImage(null);
    setSelectedImageSize(null);
    setTitle("");
    setAltText("");
    setCategory("");
    setSubcategory("");
    setTags([]);
    setTagInput("");
    setDimensions("");
    setDescription("");
  };

  const handleViewJson = () => {
    setJsonDialogOpen(true);
  };

  const handleCloseJsonDialog = () => {
    setJsonDialogOpen(false);
  };

  const jsonData = JSON.stringify(
    {
      image: selectedImage,
      title,
      altText,
      category,
      subcategory,
      tags,
      dimensions: {
        pixel: {
          width: dimensions ? parseInt(dimensions.split("x")[0].trim()) : 0,
          height: dimensions ? parseInt(dimensions.split("x")[1].trim()) : 0,
        },
      },
      description,
    },
    null,
    2
  );

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const multiImageSectionHeight = () => {
    if (selectedFiles.length <= 3) {
      return `h-${120 + selectedFiles.length * 140}`;
    } else {
      return "h-auto";
    }
  };

  const handleCSVFileInput = (event) => {
    const file = event.target.files[0];
    handleCSVUpload(file);
  };

  const handleCSVUpload = (file) => {
    console.log(file,"file")
    setSelectedCSVFile(file)
    if (file) {
      
      Papa.parse(file, {
        complete: handleCSVData,
        error: handleCSVError,
      });
    } else {
      setSelectedCSVFile(null);
      setCSVData([]);
      setCSVError(null);
    }
  };

  const handleCSVData = (results) => {
    const data = results.data;
    // Skip the header row if it exists
    const csvRows =
      data.length > 0 && Array.isArray(data[0]) ? data.slice(1) : data;
    setCSVData(csvRows);
    setCSVError(null);
  };

  const handleCSVError = (error) => {
    setCSVData([]);
    setCSVError(error);
  };

  const handleMultiSubmit = () => {
    // Create an array to store the image data
    const images = selectedFiles.map((file) => {
      return {
        name: file.file.name,
        size: file.file.size,
        url: file.url, // Add the URL property
      };
    });

    // Create a JSON object with the multi-image data
    const multiImageData = JSON.stringify(
      {
        images: selectedFiles.map((file) => file.url),
        csvFile: selectedCSVFile ? selectedCSVFile.name : null,
      },
      null,
      2
    );
    
    // Convert the JSON object to a string
    const jsonData = JSON.stringify(
      {
        images,
        csvFile: selectedCSVFile ? selectedCSVFile.name : null,
      },
      null,
      2
    );

    // Send the formData to your API endpoint using fetch or axios
    fetch("your-api-endpoint", {
      method: "POST",
      body: jsonData, // Send the JSON string in the request body
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle any errors
      });

    // Reset form fields
    setSelectedFiles([]);
    setSelectedCSVFile(null);
  };
  
  return (
    <div>
      <Header />
      <div className="mt-20 flex items-center flex-col">
        <div
          className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${isSingleExpanded ? "h-auto" : ""
            }`}
          onClick={handleSingleImageSection}
        >
          <div className="text-xl font-bold">Single Image Upload</div>
          {isSingleExpanded && !selectedImage && (
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
                  accept="image/*"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <span>Drag and drop an image here</span>
                <Button variant="contained" component="label" className="mt-2">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    style={{ display: "none" }}
                  />
                </Button>
              </Box>
              {selectedImageSize > 20480 && (
                <div className="mt-2 text-red-500">
                  The selected image exceeds the maximum file size of 20KB.
                  Please choose a smaller image.
                </div>
              )}
            </div>
          )}
          {isSingleExpanded && selectedImage && (
            <div className="mt-4">
              <div className="flex gap-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "260px" }}
                />
                <div className="mt-4">
                  Image Size: {(selectedImageSize / 1024).toFixed(2)} KB
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-4">
                  <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <TextField
                    label="Alt Text"
                    variant="outlined"
                    value={altText}
                    onChange={handleAltTextChange}
                  />
                  <TextField
                    label="Dimensions"
                    variant="outlined"
                    value={dimensions}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-4">
                  <TextField
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                  <TextField
                    label="Subcategory"
                    variant="outlined"
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-4">
                  <TextField
                    label="Tags"
                    variant="outlined"
                    value={tagInput}
                    onChange={handleTagInputChange}
                  />
                  <Button variant="contained" onClick={addTag}>
                    Add Tag
                  </Button>
                </div>
                <div className="mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 bg-gray-200 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={
                    !selectedImage ||
                    !title ||
                    !altText ||
                    !category ||
                    !subcategory ||
                    !tags.length ||
                    !description
                  }
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewJson}
                  disabled={
                    !selectedImage ||
                    !title ||
                    !altText ||
                    !category ||
                    !subcategory ||
                    tags.length === 0 ||
                    !description
                  }
                  style={{ marginLeft: "10px" }}
                >
                  View JSON
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${isMultiExpanded ? multiImageSectionHeight() : ""
            }`}
          onClick={handleMultiImageSection}
        >
          <div className="text-xl font-bold">Multiple Image Upload</div>
          {isMultiExpanded && (
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
                onDrop={handleDropMulti}
                onDragOver={preventDefault}
              >
                <CloudUploadIcon fontSize="large" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMultiFileInput}
                  style={{ display: "none" }}
                  multiple
                />
                <span>Drag and drop images here or</span>
                <Button variant="contained" component="label" className="mt-2">
                  Choose Images
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMultiFileInput}
                    style={{ display: "none" }}
                    multiple
                  />
                </Button>
              </Box>
              {isMultiExpanded && selectedFiles.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-3 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={file.url}
                          alt={`Selected ${index + 1}`}
                          style={{ width: "80px", objectFit: "cover" }}
                        />
                        <button
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-3 py-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  {duplicateImageError && (
                    <div className="mt-2 text-red-500">
                      One or more images are already uploaded. Please choose different images.
                    </div>
                  )}
                </div>
              )}

              <div className="mt-2 flex">
                <a href="/sample-file.csv" download="sample-file.csv">
                <Button variant="contained" component="span" > Download Sample CSV</Button>
                </a>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVFileInput}
                  style={{ display: "none", marginLeft: "15px" }}
                  id="csv-upload"
                
                />
                <label htmlFor="csv-upload">
                  <Button variant="contained" component="span" style={{marginLeft:"10px"}}>
                    Upload CSV
                  </Button>
                </label>
                <div>{selectedCSVFile && (
                  <div>{selectedCSVFile.name}</div>
                )}</div>
                {csvError && <div>Error: {csvError.message}</div>}
               
              </div>
              <div className="mt-4 flex ">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenMultiImageJsonDialog}
                  disabled={!selectedFiles.length && !selectedCSVFile}
                >
                  View JSON
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginLeft: "5px" }}
                  onClick={handleMultiSubmit}
                  disabled={!selectedFiles.length && !selectedCSVFile}
                >
                  Submit
                </Button>
              </div>

            </div>
          )}
        </div>
      </div>
      {/* Dialog to display JSON data */}
      <Dialog open={jsonDialogOpen} onClose={handleCloseJsonDialog}>
        <DialogTitle style={{ fontWeight: 700 }}>Form Data JSON</DialogTitle>
        <DialogContent>
          <code>
            <pre>{jsonData}</pre>
          </code>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseJsonDialog}
            color="primary"
            style={{ fontWeight: 700 }}
          >
            Close
          </Button>
        </DialogActions>
        <DialogActions
          style={{ position: "absolute", top: 0, right: 0, margin: "12px" }}
        >
          <Button
            onClick={handleCopyJson}
            color="primary"
            disabled={isJsonCopied}
            style={{ fontWeight: 700 }}
          >
            {isJsonCopied ? "JSON Copied" : "Copy JSON"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={multiImageJsonDialogOpen} onClose={handleCloseMultiImageJsonDialog}>
        <DialogTitle style={{ fontWeight: 700 }}>Multi-Image Form Data JSON</DialogTitle>
        <DialogContent>
          <code>
            <pre>{multiImageData}</pre>
          </code>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMultiImageJsonDialog} color="primary" style={{ fontWeight: 700 }}>
            Close
          </Button>
        </DialogActions>
        <DialogActions style={{ position: "absolute", top: 0, right: 0, margin: "12px" }}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(multiImageData);
            }}
            color="primary"
            style={{ fontWeight: 700 }}
          >
            Copy JSON
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
