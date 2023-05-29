import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Card } from "../../CommonComponent";
import { POST } from "../../shared/Axios";
import { API_BASE_URL, API_URLS } from "../../shared/Constant";
import useFetch from "../../Utilities/useFetch";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    border: "1px solid #ccc", // Border style
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
  "MtnIc",
  "AisThailand",
  "MtnZambia",
  "MtnCongo",
  "UnitelAngola",
  "ZainLibyanaLibya",
  "MtnBenin",
  "MtnSwaziland",
  "EntelPeru",
];

function Swipe4win() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedOp,setSelectedOp]=useState("")
  const [isDisabled, setIsDisabled] = useState(true);
  const [oprData, getOperator, loading] = useFetch(API_URLS.opertordata, {
    serviceName:  "swipe4win",
  });
  
  useEffect(() => {
    getOperator()
  }, [])
  
  console.log(oprData);
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
   setIsDisabled(false)
  };
  const handleChangeOp = (event) => {
    setSelectedOp(event.target.value);
   
  };
  const FilterOpID=oprData&&Object.keys(oprData).find(country=>country==selectedItem)
  console.log(FilterOpID,"oprID");
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center w-full mt-20">
        <div className="bg-white rounded-md drop-shadow-2xl w-[90%] ">
          <div className="flex justify-around w-full">
            <div className="flex flex-row">
              <h3 className="text-black mt-7 font-semibold">Country</h3>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-customized-select-label">
                  Select
                </InputLabel>
                <Select
                  value={selectedItem}
                  onChange={handleChange}
                  className={classes.select}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  MenuProps={MenuProps}
                >
                  {oprData&&Object.values(oprData?.countrylist).map((name) => (
                    <MenuItem key={name?._id} value={name?._id}>
                      {name?._id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex flex-row">
              <h3 className="text-black mt-7 font-semibold">Operator Id</h3>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-customized-select-label">
                  Select
                </InputLabel>
                <Select
                  value={selectedOp}
                  onChange={handleChangeOp}
                  className={classes.select}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  MenuProps={MenuProps}
                  disabled={isDisabled}
                >
                  {console.log((oprData&&selectedItem)&&oprData[selectedItem])}
                   {(oprData&&selectedItem)&&oprData[selectedItem].operators?.map((name) => (
                   
                    <MenuItem key={name.operatorName} value={name.operatorName}>
                      {name.operatorName}
                    </MenuItem>
                  ))} 
                </Select>
              </FormControl>
            </div>
            <Button  variant="outlined" onClick={()=>{navigate("/swipe4win/MultiQuestion")}}>Show</Button>
          </div>
{/* 
          <div className="flex justify-around ">
            <div className="p-4 font-bold">
              <Button variant="outlined" onClick={()=>{navigate("/swipe4win/ViewResult")}}>View Result</Button>
            </div>

            <div className="p-4">
              <Button variant="outlined" onClick={()=>{navigate("/swipe4win/ViewEntity")}}>View Entities</Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Swipe4win;
