import React, { useState } from "react";
import { Grid, Typography, FormControl, OutlinedInput, InputAdornment, Button, TableContainer } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { GET } from "../../shared/Axios";

const ViewResult = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [reportData, setReportData] = useState({})
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

  const handleSubmit = () => {
    // Handle submit logic here
    console.log(startDate, endDate);
    GET(`https://swip4winapiv1.bngrenew.com:5081/swipe4win/cms/report/leaderboard?operatorId=zainlibyana_libya&gtDate=${startDate?.toISOString().split("T")[0]}&ltDate=${endDate?.toISOString().split("T")[0]}`).then((res) => setReportData(res)).catch((err) => console.log(err))
  };

  return (
    <div className="mx-4 my-2">
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
            <KeyboardDatePicker
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
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      {reportData && <TableContainer></TableContainer>}
    </div>
  );
};

export default ViewResult;
