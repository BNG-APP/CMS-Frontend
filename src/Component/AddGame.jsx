import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    marginLeft: '20px',
    marginRight: '20px',
    margin:"5px",
    width:"50ch"
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
    "Harris Glenn"
  ];
function AddGame() {
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedNames, setSelectedNames] = useState([]);
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    console.log("log");
  };
  const classes = useStyles();
  return (
    <div>
      <div>AddGame</div>
      <form autoComplete="off" onSubmit={handleSubmit} className="bg-white h-[80vh]" >
        <h2>ADD GAME</h2>

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
        /> <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel> Select</InputLabel>
        <Select
          multiple
          value={selectedNames}
          onChange={(e) => setSelectedNames(e.target.value)}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
         <TextField
        label="Image"
        className={classes.textField}
        type="file"
        onChange={handleImageChange}
        InputLabelProps={{ shrink: true }}
       // value={imageFile}
      />
      <TextField
        label="Image"
        className={classes.textField}
        type="file"
        onChange={handleImageChange}
        InputLabelProps={{ shrink: true }}
       // value={imageFile}
      />

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

        <Button variant="outlined" color="secondary" type="submit"className={classes.textField} >
          ADD
        </Button>
      </form>
    </div>
  );
}

export default AddGame;
