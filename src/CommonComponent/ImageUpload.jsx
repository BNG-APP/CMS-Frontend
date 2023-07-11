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

export default function ImageUpload() {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [isMultiExpanded, setIsMultiExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
          height: parseInt(dimensions.split("x")[1].trim())
        }
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

  return (
    <div>
      <Header />
      <div className="mt-20 flex items-center flex-col">
        <div
          className={`w-[90%] bg-white text-black p-4 m-2 rounded-lg shadow cursor-pointer ${
            isSingleExpanded ? "h-auto" : ""
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
                <div className="flex gap-4"></div>
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
          className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow ${
            isMultiExpanded ? "h-80" : ""
          }`}
          onClick={handleMultiImageSection}
        >
          Multiple Image Upload
        </div>
      </div>

      {/* Dialog to display JSON data */}
      <Dialog open={jsonDialogOpen} onClose={handleCloseJsonDialog}>
        <DialogTitle style={{fontWeight:700}}>Form Data JSON</DialogTitle>
        <DialogContent>
          <code>
            <pre>{jsonData}</pre>
          </code>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJsonDialog} color="primary">
            Close
          </Button>
        </DialogActions>
        <DialogActions
          style={{ position: "absolute", top: 0, right: 0, margin: "12px",  }}
        >
          <Button
            onClick={handleCopyJson}
            color="primary"
            disabled={isJsonCopied}
            style={{fontWeight:700}}
          >
            {isJsonCopied ? "JSON Copied" : "Copy JSON"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
