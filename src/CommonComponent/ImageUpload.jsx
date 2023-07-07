import React, { useState } from "react";
import Header from "./Header";
import { Box, Button, TextField } from "@mui/material";
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
  const [tags, setTags] = useState("");
  const [dimensions, setDimensions] = useState("");

  const handleSingleImageSection = () => {
    setIsSingleExpanded(true);
    setIsMultiExpanded(false);
  };

  const handleMultiImageSection = () => {
    setIsMultiExpanded(true);
    setIsSingleExpanded(false);
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
    if (file && file.size <= 20480) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageSize(file.size);
    } else {
      setSelectedImage(null);
      setSelectedImageSize(null);
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

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleDimensionsChange = (event) => {
    setDimensions(event.target.value);
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
          Single Image Upload
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
                <Button
                  variant="contained"
                  component="label"
                  className="mt-2"
                >
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    style={{ display: "none" }}
                  />
                </Button>
              </Box>
            </div>
          )}
          {isSingleExpanded && selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "260px" }}
              />
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
                  label="Dimensions"
                  variant="outlined"
                  value={dimensions}
                  onChange={handleDimensionsChange}
                  fullWidth
                />
              </div>
              <div className="mt-4">
                Image Size: {(selectedImageSize / 1024).toFixed(2)} KB
              </div>
              {selectedImageSize > 20480 && (
                <div className="mt-2 text-red-500">
                  The selected image exceeds the maximum file size of 20KB.
                  Please choose a smaller image.
                </div>
              )}
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
    </div>
  );
}
