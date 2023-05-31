import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { convertToPNG } from "../../CommonComponent/CovertToPNG";

const EditEntity = () => {
  const history = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const rowData = location.state;
  console.log("row data", rowData);
  const { id } = useParams();
  useEffect(() => {
    // Populate the form fields with the rowData
    setFormData(rowData);
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Redirect back to the view page after editing
    // history.push("/view");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    convertToPNG(file, setConvertedImage);
  };

  return (
    <div>
      <h2>Edit Row</h2>
      <form onSubmit={handleSubmit}>
        {convertedImage ? <Grid item xs={12}>
          <Typography variant="h6">Converted Image:</Typography>
          <img
            src={URL.createObjectURL(convertedImage)}
            alt="Converted"
            style={{ maxWidth: "100%",width:"250px", height: "250px" }}
          />
        </Grid> : <img
          label="Image URL"
          name="imageUrl"
          src={formData.imageUrl || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />}
        {console.log("converted image", convertedImage)}
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="select-image">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        <TextField
          label="Question Text (Decoded)"
          name="questionText"
          value={formData.questionText || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          label="Answer Option 1"
          name="answerOption1"
          value={formData.answerOption?.option1 || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Answer Option 2"
          name="answerOption2"
          value={formData.answerOption?.option2 || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Level"
          name="level"
          value={formData.level || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Priority"
          name="priority"
          value={formData.priority || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Answer"
          name="answer"
          value={formData.answer || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Operator Id"
          name="operatorId"
          value={formData.operatorId || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {/* Add more TextField components for other properties */}
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditEntity;
