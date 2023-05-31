import { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

const EditEntity = () => {
  const history = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const rowData = location.state?.rowData;
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

  return (
    <div>
      <h2>Edit Row</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
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
          value={formData.answerOption1 || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Answer Option 2"
          name="answerOption2"
          value={formData.answerOption2 || ""}
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
