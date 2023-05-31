import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../CommonComponent";
import { convertToPNG } from "../../CommonComponent/CovertToPNG";
import { API_URLS } from "../../shared/Constant";
import useFetch from "../../Utilities/useFetch";

function MultiQuestion() {
  const location = useLocation();
  const MAX_FILE_SIZE_KB = 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [convertedLogoFile, setConvertedLogoFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataUpdload, dataUploadApi, loading] = useFetch(API_URLS.dataUpload, {
    imageFile: selectedFile && selectedFile,
    csvFile: selectedCSVFile && selectedCSVFile,
  });
  const navigate = useNavigate();

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedCSVFile && selectedFile) {
      console.log("inside");
      setIsDisabled(false);
    }
  }, [selectedCSVFile, selectedFile]);

  const uploadApi = () => {
    dataUploadApi();
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

  // const convertToPNG = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = function (event) {
  //     const img = new Image();
  //     img.onload = function () {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       canvas.toBlob((blob) => {
  //         const converted = new File([blob], "converted.png", {
  //           type: "image/png",
  //         });
  //         setConvertedFile(converted);
  //       }, "image/png");
  //     };
  //     img.src = event.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // };

    const handleDownload = () => {
      const downloadLink = document.createElement("a");
      downloadLink.href = "/sample-file.csv";
      downloadLink.download = "sample.csv";
      downloadLink.click();
    };
  return (
    <div>
      <Header />
      <div className="flex w-full mt-20">
        <div className="flex flex-col m-2">
          <div className="text-black">Upload ZIP Files</div>
          <div className="flex m-2">
            <input
              type="file"
              accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              className="text-black"
              onChange={handleUpload}
            />
            {/* <div className="text-black">{selectedFile}</div> */}
          </div>
          <div className="flex flex-col">
            <div className="text-black">Upload Csv Files</div>
            <div className="flex m-2">
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="text-black"
                onChange={handleCSVUpload}
              />
              {/* <div className="text-black">{selectedCSVFile}</div> */}
            </div>
          </div>
          <Button variant="contained" onClick={uploadApi} disabled={isDisabled}>
            Upload
          </Button>
        </div>
        <div>
          <Container>
            <div className="text-black">Upload Banner Image</div>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="text-black"
                  id="image-upload"
                />
                {/* <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label> */}
              </Grid>
              {/* {selectedBannerFile && (
                <Grid item xs={12}>
                  <Typography variant="h6">Selected Image:</Typography>
                  <img
                    src={URL.createObjectURL(selectedBannerFile)}
                    alt="Selected"
                    style={{ maxWidth: "100%",height:"6rem"  }}
                  />
                </Grid>
              )} */}
              {convertedFile && (
                <Grid item xs={12}>
                  <Typography variant="h6">Converted Image:</Typography>
                  <img
                    src={URL.createObjectURL(convertedFile)}
                    alt="Converted"
                    style={{ maxWidth: "100%", height: "6rem" }}
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        </div>
        <div>
          <Container>
            <div className="text-black">Upload Logo Image</div>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="text-black"
                  id="image-upload"
                />
              </Grid>
              {convertedLogoFile && (
                <Grid item xs={12}>
                  <Typography variant="h6">Converted Image:</Typography>
                  <img
                    src={URL.createObjectURL(convertedLogoFile)}
                    alt="Converted"
                    style={{ maxWidth: "100%", height: "6rem" }}
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        </div>
        <Button variant="contained"  onClick={handleDownload}>Download Sample CSV</Button>
        <div className="flex flex-col justify-around mt-3">
          <div className="p-4 font-bold">
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/swipe4win/ViewResult");
              }}
            >
              View Result
            </Button>
          </div>

          <div className="p-4">
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/swipe4win/ViewEntity");
              }}
            >
              View Entities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiQuestion;
