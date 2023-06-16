import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../CommonComponent";
import { convertToPNG } from "../../CommonComponent/CovertToPNG";
import { POST } from "../../shared/Axios";
import { API_URLS } from "../../shared/Constant";
import useFetch from "../../Utilities/useFetch";
import Breadcrumbs from "../../CommonComponent/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    background: "linear-gradient(180deg, #FFFFFF 0%, #F4F6FC 100%)",
    padding: theme.spacing(2),
    color: "black",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
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

}));

function MultiQuestion() {
  const classes = useStyles();
  const location = useLocation();
  const op = window.localStorage.getItem("op")
  const MAX_FILE_SIZE_KB = 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertedLogoFile, setConvertedLogoFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataUpload, dataUploadApi, loading] = useFetch("https://cmsn.bngrenew.com/cms/cmsUploadAllMultipartFile"
    , {
    imageFile: selectedFile,
    csvFile: selectedCSVFile,
  });
  
  const [BannerUpload, BanneraUploadApi, Bannerloading] = useFetch(API_URLS.BannerUpload);
  const [logoUpload, logoUploadApi, Logoloading] = useFetch(API_URLS.LogoUpload);

  const navigate = useNavigate();

  const handleUpload = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (selectedCSVFile && selectedFile) {
      setIsDisabled(false);
    }
  }, [selectedCSVFile, selectedFile]);

  const uploadApi = () => {
    console.log(typeof selectedFile, selectedCSVFile,"both file");


    // const formData = new FormData()
    // formData.append("imageFile", JSON.stringify(selectedFile))
    // formData.append("csvFile", JSON.stringify(selectedCSVFile))
    // const data = {
    //   imageFile:selectedFile ,
    //   csvFile:selectedCSVFile,
    // };
    // console.log("Form Data:", formData);


    POST(API_URLS.dataUpload, {imageFile:URL.createObjectURL(selectedFile),csvFile:URL.createObjectURL(selectedCSVFile)})
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

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/sample-file.csv";
    downloadLink.download = "sample.csv";
    downloadLink.click();
  };

  const handleUploadLogo = () => {
    let logoImage = new FormData()
    logoImage.append("imageFile", "convertedLogoFile")
    console.log(logoImage.getAll("imageFile"), "@@@@@@@@@@@@@@@logoImage>>>>>>>>>>", convertedLogoFile,logoImage);
    logoUploadApi({ imageFile:URL.createObjectURL( convertedLogoFile), "operatorId": op })
  };

  const handleUploadBanner = () => {
    BanneraUploadApi({ imageFile:URL.createObjectURL( convertedLogoFile), "operatorId": op })
  };

  return (
    <div >
      <Header />
      <Breadcrumbs />
      <Container className={classes.root}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className={classes.imageUpload}>
              <Typography variant="h6">Upload Question (Zip Files)</Typography>
              <input
                type="file"
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                className="text-black"
                onChange={handleUpload}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.imageUpload}>
              <Typography variant="h6">Upload CSV Files</Typography>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="text-black"
                onChange={handleCSVUpload}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={uploadApi}
              disabled={isDisabled}
              className={classes.uploadButton}
            >
              Upload
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleDownload}>
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
                <Typography variant="h6">Converted Image:</Typography>
                <img
                  src={URL.createObjectURL(convertedFile)}
                  alt="Converted"
                  style={{ maxWidth: "100%", height: "100px" }}
                />
                <Button
                  variant="contained"
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
                <Typography variant="h6">Converted Image:</Typography>
                <img
                  src={URL.createObjectURL(convertedLogoFile)}
                  alt="Converted"
                  style={{ maxWidth: "100%", height: "100px" }}
                />
                <Button
                  variant="contained"
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
                onClick={() => {
                  navigate("/swipe4win/ViewResult");
                }}
              >
                View Result
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/swipe4win/ViewEntity");
                }}
              >
                View Entities
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default MultiQuestion;
