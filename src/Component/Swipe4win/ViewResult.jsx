import React, { useState } from "react";
import { Grid, Typography, FormControl, OutlinedInput, InputAdornment, Button, CircularProgress, TableContainer, makeStyles, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem, } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { GET } from "../../shared/Axios";
import clsx from "clsx";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "tailwindcss/tailwind.css";
import { Header } from "../../CommonComponent";
import { useNavigate } from "react-router-dom";
import { subDays, startOfDay } from "date-fns";
const useStyles = makeStyles((theme) => ({


  // ...
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: "5px",
    border: "solid gray 2px",
    // overflowX: "hidden",

  },
  imageCell: {
    padding: 0,
  },
  image: {
    width: "80px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
    padding: "10px",
  },
  header: {
    backgroundColor: "#BBDEFB",
    fontSize: "24px",
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "center",
    
  },
  actionButton: {
    padding: theme.spacing(1),
  },

  buttonProgress: {
    color: "black",
    position: "absolute",
    // top: "200%",
    left: "50%",
    marginTop:"20rem",
    marginLeft: -12,
    zIndex: 111111
  },
  menu: {
    marginTop: theme.spacing(2),
    zIndex: 1111
  },
  tablecell: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  submit: {
    backgroundColor: "#BBDEFB",
    color: "black",
    width: "120px"
  }

}));
const ViewResult = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const today = new Date();
  const defaultStartDate = subDays(startOfDay(today), 7);
  const defaultEndDate = today;
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const handleStartDateChange = (date) => {
    const ndate = new Date(date)
    console.log(ndate.toISOString())
    setStartDate(ndate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartDateIconClick = () => {
    setOpenStartDatePicker(true);
  };

  const handleEndDateIconClick = () => {
    setOpenEndDatePicker(true);
  };
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    // setSelectedItemId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedItemId(null);
  };
  const handleSubmit = () => {
    // Handle submit logic here
    console.log(startDate, endDate);
    setLoading(true)
    GET(`https://swip4winapiv1.bngrenew.com:5081/swipe4win/cms/report/leaderboard?operatorId=zainlibyana_libya&gtDate=${startDate?.toISOString().split("T")[0]}&ltDate=${endDate?.toISOString().split("T")[0]}`).then((res) => { setReportData(res); setLoading(false) }).catch((err) => console.log(err))
  };
  const handleExport = () => {
    GET(`https://swip4winapiv1.bngrenew.com:5081/swipe4win/cms/report/export/excel?operatorId=zainlibyana_libya&gtDate=${startDate?.toISOString().split("T")[0]}&ltDate=${endDate?.toISOString().split("T")[0]}`).then((res) => res.blob()).then((blob) => {
      const fileURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileURL;
      console.log(fileURL, "fileURL");
      link.download = 'downloaded_file'; // Replace with the desired file name
      link.click()
    }).catch((err) => console.log(err, "err"))
  }
  return (
    <div className="mx-2 my-2">
      <Header />
      <div className="mt-24 mx-16 pl-4 bg-white drop-shadow-2xl rounded-xl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" style={{ color: "black" }}>
                Start Date
              </Typography>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM-dd-yyyy"
                margin="normal"
                id="start-date-picker"
                value={startDate}
                onChange={handleStartDateChange}
                open={openStartDatePicker}
                onOpen={() => setOpenStartDatePicker(true)}
                onClose={() => setOpenStartDatePicker(false)}
                KeyboardButtonProps={{
                  "aria-label": "change start date",
                }}
                TextFieldComponent={(props) => (
                  <OutlinedInput
                    {...props}
                    endAdornment={
                      <InputAdornment position="end">
                        <CalendarTodayIcon
                          style={{ color: "black" }}
                          onClick={handleStartDateIconClick}
                        />
                      </InputAdornment>
                    }
                  />
                )}
                keyboardInputProps={{
                  readOnly: true, // Make the input field readOnly
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" style={{ color: "black" }}>
                End Date
              </Typography>
              <DatePicker
                disableToolbar
                variant="inline"
                format="MM-dd-yyyy"
                margin="normal"
                id="end-date-picker"
                value={endDate}
                onChange={handleEndDateChange}
                open={openEndDatePicker}
                onOpen={() => setOpenEndDatePicker(true)}
                onClose={() => setOpenEndDatePicker(false)}
                TextFieldComponent={(props) => (
                  <OutlinedInput
                    {...props}
                    endAdornment={
                      <InputAdornment position="end">
                        <CalendarTodayIcon
                          style={{ color: "black" }}
                          onClick={handleEndDateIconClick}
                        />
                      </InputAdornment>
                    }
                  />
                )}
                inputProps={{
                  readOnly: true, // Make the input field readOnly
                }}
              />
           
           
          
 


              {/* <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM-dd-yyyy"
                margin="normal"
                id="end-date-picker"
                value={endDate}
                onChange={handleEndDateChange}
                open={openEndDatePicker}
                onOpen={() => setOpenEndDatePicker(true)}
                onClose={() => setOpenEndDatePicker(false)}
                KeyboardButtonProps={{
                  "aria-label": "change end date",
                }}
                TextFieldComponent={(props) => (
                  <OutlinedInput
                    {...props}
                    endAdornment={
                      <InputAdornment position="end">
                        <CalendarTodayIcon
                          style={{ color: "black" }}
                          onClick={handleEndDateIconClick}
                        />
                      </InputAdornment>
                    }
                  />
                )}
                keyboardInputProps={{
                  readOnly: true, // Make the input field readOnly
                }}
              /> */}
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outlined" className={classes.submit} onClick={handleSubmit}>Submit</Button>
            </Grid>
            {/* {reportData?.winners?.length > 0  && <Grid item xs={12} sm={3}>
            <Button variant="outlined" onClick={handleExport}>Export</Button>
          </Grid>} */}
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="bg-white rounded-xl drop-shadow-2xl mx-16 ">
        {loading
          ? <CircularProgress
            size={36}
            className={classes.buttonProgress}
          /> : reportData?.winners?.length > 0 && <TableContainer className={(classes.tableContainer, "mt-10")}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  {/* <TableCell>portal Access Count</TableCell> */}
                  <TableCell>rank</TableCell>
                  <TableCell>score</TableCell>
                  <TableCell>total Correct Answers</TableCell>
                  <TableCell>total Question Attempted</TableCell>
                  <TableCell>User Id</TableCell>
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData?.winners?.length > 0 ?
                  reportData.winners.map((item, idx) => {
                    return (<TableRow key={item.rank}>
                      <TableCell>{idx + 1}.</TableCell>
                      {/* <TableCell key={item.rank}>{item.portalAccessCount}</TableCell> */}
                      <TableCell>{item.rank}</TableCell>
                      <TableCell>{item.score}</TableCell>
                      <TableCell>{item.totalCorrectAnswers}</TableCell>
                      <TableCell>{item.totalQuestionAttempted}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      {/* <IconButton
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        className={classes.actionButton}
                        onClick={(event) => handleMenuClick(event, item.rank)}
                      >
                        <MoreVertIcon />
                      </IconButton> 
                       <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl && selectedItemId === item.rank)}
                        onClose={handleMenuClose}
                        className={classes.menu}
                      >
                        <MenuItem onClick={() => navigate("/swipe4win/EditDetails", { state: item })}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
                      </Menu> */}

                    </TableRow>)
                  })
                  : <div className="text-black">no data found</div>}

              </TableBody>
            </Table>
          </TableContainer>}
      </div>
    </div>
  );
};

export default ViewResult;
