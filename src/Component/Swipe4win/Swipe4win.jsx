import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Button,
 
  Container,
  Grid,
  Typography,
  
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useNavigate } from "react-router-dom";
import { Header, Card, Loader } from "../../CommonComponent";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from "@material-ui/icons/Description";
import { POST } from "../../shared/Axios";
import { API_BASE_URL, API_URLS } from "../../shared/Constant";
import useFetch from "../../Utilities/useFetch";
import { convertToPNG } from "../../CommonComponent/CovertToPNG";
import BusinessIcon from "@material-ui/icons/Business";
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
  button: {
    margin: theme.spacing(1.5),
    backgroundColor:"green",
    color:"black"
  },
  root: {
    marginTop: theme.spacing(4),
    background: "linear-gradient(180deg, #FFFFFF 0%, #F4F6FC 100%)",
    padding: theme.spacing(2),
    color: "black",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(8),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  section: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  imageUpload: {
    marginBottom: theme.spacing(2),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  viewResultButton: {
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  },
  viewEntityButton: {
    backgroundColor: "blue",
    color: "white",
    "&:hover": {
      backgroundColor: "darkblue",
    },
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

function Swipe4win() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedOp, setSelectedOp] = useState("")
  const [isDisabledShow, setIsDisabledShow] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [oprData, getOperator, loading] = useFetch(API_URLS.opertordata , {
    serviceName: "swipe4win",
  });
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertedLogoFile, setConvertedLogoFile] = useState(null);
   const [isDisabled, setIsDisabled] = useState(true);
const [showDetails,setShowDetails]=useState(false)
  useEffect(() => {
    getOperator()
  }, [])
  useEffect(() => {
    if (selectedCSVFile && selectedFile) {
      setIsDisabled(false);
    }
  }, [selectedCSVFile, selectedFile]);
  const handleUpload = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };
  const uploadApi = () => {
    POST(API_URLS.dataUpload, {
      imageFile: URL.createObjectURL(selectedFile),
      csvFile: URL.createObjectURL(selectedCSVFile),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCSVUpload = (e) => {
    setSelectedCSVFile(e.target.files[0]);
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setSelectedBannerFile(file);
    convertToPNG(file, setConvertedFile);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setSelectedLogoFile(file);
    convertToPNG(file, setConvertedLogoFile);
  };

  const handleUploadLogo = () => {
    logoUploadApi({
      imageFile: URL.createObjectURL(convertedLogoFile),
      operatorId: op,
    });
  };

  const handleUploadBanner = () => {
    BanneraUploadApi({
      imageFile: URL.createObjectURL(convertedLogoFile),
      operatorId: op,
    });
  };
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/sample-file.csv";
    downloadLink.download = "sample.csv";
    downloadLink.click();
  };
  // const [oprData , setOprData] = useState(allOperators)

  console.log(oprData);
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    setIsDisabledShow(false)
  };
  const handleChangeOp = (event) => {
    setSelectedOp(event.target.value);

  };
  useEffect(() => {
    if (selectedOp) {
      localStorage.setItem("op", oprData[selectedItem].operators[0].operatorId)
    }
    POST("https://swip4winapiv1.bngrenew.com:5081/swipe4win/config",{operatorId
    : 
    "zainlibyana_libya",
    userId
    : 
    "917428689305"}).then((res)=>console.log(res)).catch((err)=>console.log(err))
  }, [selectedOp])
  useEffect(() => {
    if (selectedItem && oprData && oprData[selectedItem].operators?.length === 1) {
      setSelectedOp(oprData[selectedItem].operators[0].operatorName);
    }
    
  }, [oprData, selectedItem]);

  return (
    <div>
      {loading ? <Loader /> :
        <>
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
                      {oprData && Object.values(oprData?.countrylist).map((name) => (
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
                      disabled={isDisabledShow}
                    >
                      {(oprData && selectedItem) && oprData[selectedItem]?.operators?.map((name) => (

                        <MenuItem key={name.operatorName} value={name.operatorName}>
                          {name.operatorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Button className={classes.button} disabled={(selectedItem&&selectedOp)?false:true} variant="outlined" onClick={() => {  setShowDetails(true)}}>Show</Button>
              </div>

            </div>
          </div>
        </>}
      {  showDetails&&<Container className={classes.root}>
        <Typography variant="h4" align="center" gutterBottom style={{ fontSize: "24px",marginBottom:"10px" }}>
          Upload Files
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <div className={classes.imageUpload}>
              <Typography variant="h6" style={{ fontSize: "18px" }}>Upload Question Images(Zip Files)</Typography>
              <input
                type="file"
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                className="text-black"
                onChange={handleUpload}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.imageUpload}>
              <Typography variant="h6" style={{ fontSize: "18px" }}>Upload CSV Files</Typography>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="text-black"
                onChange={handleCSVUpload}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={uploadApi}
              disabled={isDisabled}
              className={classes.uploadButton}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DescriptionIcon />}
              onClick={handleDownload}
            >
              Download Sample CSV
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className={classes.imageUpload}>
              <Typography variant="h6">Upload Banner Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="text-black"
              />
            </div>
            {convertedFile && (
              <>
                <Typography variant="h6">Preview Image:</Typography>
                <img
                  src={URL.createObjectURL(convertedFile)}
                  alt="Converted"
                  style={{ maxWidth: "100%", height: "100px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUploadBanner}
                  className={classes.uploadButton}
                >
                  Upload Banner
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.imageUpload}>
              <Typography variant="h6">Upload Logo Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="text-black"
              />
            </div>
            {convertedLogoFile && (
              <>
                <Typography variant="h6">Preview Image:</Typography>
                <img
                  src={URL.createObjectURL(convertedLogoFile)}
                  alt="Converted"
                  style={{ maxWidth: "100%", height: "100px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUploadLogo}
                  className={classes.uploadButton}
                >
                  Upload Logo
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <div className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="success"
                className={classes.viewResultButton}
                onClick={() => {
                  navigate("/swipe4win/ViewResult");
                }}
              >
                <VisibilityIcon style={{ marginRight: "0.5rem" }} />
                View Result
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate("/swipe4win/ViewEntity");
                }}
                className={classes.viewEntityButton}
              >
                <BusinessIcon style={{ marginRight: "0.5rem" }} />
                View Entities
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>}
    </div>
  );
}

export default Swipe4win;
