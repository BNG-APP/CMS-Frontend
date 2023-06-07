import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Modal } from "@material-ui/core";
import { convertToPNG } from "../../CommonComponent/CovertToPNG";
import { DecodeBase64 } from "../../CommonComponent/DecodeBase64";
import useFetch from "../../Utilities/useFetch";
import { API_URLS } from "../../shared/Constant";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "20px",
    backgroundColor: "#f9f9f9", // Add your desired background color or image here
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formControl: {
    marginBottom: "20px",
  },
  button: {
    margin: "25px",
  },
  inputField: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    fontSize: "16px",
    color: "#333",
    width: "100%",
    marginBottom: "10px",
    fontSize: "18px", // Increase the font size
    lineHeight: "1.5",
  },
  modalContainer: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "20px",
    width: "400px",
  },
}));
const EditEntity = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [savedText, setSavedText] = React.useState('');
  const rowData = location.state;
  console.log("row data", rowData);
  const { id } = useParams();
  const [edit, editApiCall, loading] = useFetch(API_URLS.Edit, {
    operatorId: location.state,
    questionId: rowData._id,
  });
  const [selectedValue, setSelectedValue] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const dropdownStyles = {
    width: '200px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#333',
  };

  const focusedStyles = {
    outline: 'none',
    borderColor: '#007bff',
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  };

  // const modalStyles = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: '100%',
  //   outline: 'none',
  // };
  const modalStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    outline: "none",
    overflow: "auto", // Add overflow to allow scrolling if modal content exceeds the screen height
  };

  const modalContainerStyles = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    width: '400px',
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputText('');
  };

  const isButtonDisabled = selectedValue === '';

  const handleInputChangeModal = (event) => {
    const { value } = event.target;
    const language = selectedValue;

    if (language === 'option1') {
      // Arabic
      setInputText(value.replace(/[^ء-ي\s]/g, ''));
    } else if (language === 'option2') {
      // English
      setInputText(value.replace(/[^A-Za-z\s]/g, ''));
    } else if (language === 'option3') {
      // French
      setInputText(value.replace(/[^A-Za-z\sàâçéèêëîïôûùüÿñæœ]/g, ''));
    } else if (language === 'option4') {
      // Portuguese
      setInputText(value.replace(/[^A-Za-z\sàáâãçéèêíîóôõúü]/g, ''));
    } else if (language === 'option5') {
      // Spanish
      setInputText(value.replace(/[^A-Za-z\sáéíñóúü]/g, ''));
    } else if (language === 'option6') {
      // Thai
      setInputText(value.replace(/[^ก-๙\s]/g, ''));
    }
  };

  const languageToPlaceholder = {
    option1: 'Enter text in Arabic',
    option2: 'Enter text in English',
    option3: 'Enter text in French',
    option4: 'Enter text in Portuguese',
    option5: 'Enter text in Spanish',
    option6: 'Enter text in Thai',
  };

  const handleSaveClick = () => {
    setSavedText(inputText);
    setIsModalOpen(false);
    setInputText('');
  };


  useEffect(() => {
    // Populate the form fields with the rowData
    setFormData(rowData);
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "name and value");
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // answerOption: {
      //   ...prevData.answerOption,
      //   [name]: value,
      // },
    }));
  };

  console.log(formData, "formData");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    navigate("/swipe4win/ViewEntity")
    // Redirect back to the view page after editing
    // history.push("/view");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    convertToPNG(file, setConvertedImage);
  };

  return (
    <div className={classes.container}>
      <h2>Edit Row</h2>
      <form onSubmit={handleSubmit}>
        {convertedImage ? (
          <Grid item xs={12}>
            <Typography variant="h6">Converted Image:</Typography>
            <img
              src={URL.createObjectURL(convertedImage)}
              alt="Converted"
              style={{ maxWidth: "100%", width: "250px", height: "250px" }}
            />
          </Grid>
        ) : (
          <img
            label="Image URL"
            name="imageUrl"
            src={formData.imageUrl || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        )}
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
          value={
            formData.questionText?.ar &&
            DecodeBase64(formData.questionText?.ar || "")
          }
          onChange={handleInputChange}
          fullWidth
          multiline
          margin="normal"
          placeholder="Enter decoded question text"
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="dropdown-label">Select Language</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedValue}
            onChange={handleChange}
            style={dropdownStyles} // Apply the styles
            inputProps={{ style: focusedStyles }} // Apply focused styles
          >
            <MenuItem value="option1">Arabic</MenuItem>
            <MenuItem value="option2">English</MenuItem>
            <MenuItem value="option3">French</MenuItem>
            <MenuItem value="option4">Portuguese</MenuItem>
            <MenuItem value="option5">Spanish</MenuItem>
            <MenuItem value="option6">Thai</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          className={classes.button}
          disabled={isButtonDisabled} // Disable the button if no value is selected
          style={{ margin: '25px' }}
        >
          Add text
        </Button>

        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={modalStyles}
        >
          <div style={modalContainerStyles}>
            <h2 id="modal-title">Modal Title</h2>
            <TextField
              id="modal-input"
              label={languageToPlaceholder[selectedValue]}
              value={inputText}
              onChange={handleInputChangeModal}
              fullWidth
            />
            <div className="flex justify-center pt-4">
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          </div>
        </Modal>

        <TextField
          label="Added text"
          value={savedText}
          fullWidth
          readOnly
          className={classes.inputField}
        />

        {/* <TextField
          label="Answer Option 1"
          name="answerOption1"
          value={formData.answerOption?.option1 && formData.answerOption?.option1 || ""}
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
        /> */}

        <TextField
          label="Answer Option 1"
          name="option1"
          defaultValue={formData.answerOption?.option1 || "True"}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />

        <TextField
          label="Answer Option 2"
          name="option2"
          defaultValue={formData.answerOption?.option2 || "False"}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />

        <TextField
          label="Level"
          name="level"
          value={formData.level || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />
        <TextField
          label="Priority"
          name="priority"
          value={formData.priority || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />
        <TextField
          label="Answer"
          name="answer"
          value={formData.answer || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />
        <TextField
          label="Operator Id"
          name="operatorId"
          value={formData.operatorId || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          className={classes.inputField}
        />
        {/* Add more TextField components for other properties */}
        <Button variant="contained" color="primary" type="submit" >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditEntity;
