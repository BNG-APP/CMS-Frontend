import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../CommonComponent/Header";
import ImageUpload from "../../CommonComponent/ImageUpload";

const useStyles = makeStyles({
  textField: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop:"20px",
    width: "50ch",
  },
  button:{
    width: "29ch",
    margin: "10px",
    marginTop: "20px",
    padding: "13px",
    color: " #33ce33",
    border: "2px solid #33ce33",
    hover:"green"
  },

  root: {
    width: 200,
    margin: 1,
    p: 2,
    // add your custom styles here
  },

  inputLabel: {
    fontWeight: "bold",
    paddingLeft: "20px",
    position: "absolute",
    top: "-5px",
  },
  FormControl: {
    marginTop: 20,
  },
});
const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];
function AddGame() {
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [selectedNames, setSelectedNames] = useState([]);
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    console.log(url, desc, imageFile, iconImage);
  };
  const handleIconChange = (e) => {
    setIconImage(e.target.files[0]);
  };
  console.log(url, desc, imageFile, iconImage, selectedNames);
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className="mt-20 flex justify-center item-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-4  w-[100vh] h-[70vh]"
        >
          <div className="text-black text-center text-xl font-bold">
            Add Game
          </div>
          <TextField
            label="URL"
            className={classes.textField}
            onChange={(e) => setUrl(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={url}
          />{" "}
          <FormControl
            sx={{ m: 1, width: 500 }}
            classes={{
              root: classes.FormControl,
            }}
          >
            <InputLabel
              classes={{
                root: classes.inputLabel,
              }}
            >
              {" "}
              Select Operator
            </InputLabel>
            <Select
              multiple
              value={selectedNames}
              onChange={(e) => setSelectedNames(e.target.value)}
              input={<OutlinedInput label="Multiple Select" />}
              classes={{
                root: classes.root,
              }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex">
            <ImageUpload uploadText={"Banner Image Upload"}  />
            <ImageUpload  uploadText={"Icon Image Upload"} />
          </div>
          
          <TextField
            type="text"
            variant="outlined"
            className={classes.textField}
            color="secondary"
            label="description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            className={classes.button}
          >
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddGame;
