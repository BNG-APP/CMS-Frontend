import { FormControl, InputLabel, makeStyles, MenuItem, Select, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Card } from "../../CommonComponent";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    padding: theme.spacing(.5),
    textAlign: 'center',
    border: '1px solid #ccc', // Border style
    borderRadius: 4, // Optional: Adding border radius
  },
}));
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'MtnIc',
  'AisThailand',
  'MtnZambia',
  'MtnCongo',
  'UnitelAngola',
  'ZainLibyanaLibya',
  'MtnBenin',
  'MtnSwaziland',
  'EntelPeru',
];

function Swipe4win() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    navigate(`/swipe4win/${event.target.value}`)
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center w-full mt-20">
      <div className="bg-white rounded-md drop-shadow-2xl w-[90%] ">
      <div className="flex justify-around w-full">
      <div className="flex flex-row">
      {/* <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox">Select an Swipe4win Service</InputLabel>
      </FormControl> */}
      <h3 className="text-black mt-7 font-semibold">Country</h3> 
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-customized-select-label">Select</InputLabel>
      <Select
        value={selectedItem}
        onChange={handleChange}
        className={classes.select}
        labelId="demo-customized-select-label"
          id="demo-customized-select"
          MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </div>

      <div className="flex flex-row">
      {/* <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox">Select an Swipe4win Service</InputLabel>
      </FormControl> */}
      <h3 className="text-black mt-7 font-semibold">Operator Id</h3> 
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-customized-select-label">Select</InputLabel>
      <Select
        value={selectedItem}
        onChange={handleChange}
        className={classes.select}
        labelId="demo-customized-select-label"
          id="demo-customized-select"
          MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </div>
      </div>

    <div className="flex justify-center">
    <div className="p-4">
    <Button variant="outlined">View Result</Button>
    </div>

    <div className="p-4">
    <Button variant="outlined">View Entities</Button>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Swipe4win;
