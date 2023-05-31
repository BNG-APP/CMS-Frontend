import React, { useState } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"; 
import DateFnsUtils from "@date-io/date-fns";

function ViewResult() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          // Add any desired props, such as format or disablePast, to customize the DatePicker
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          // Add any desired props, such as format or disablePast, to customize the DatePicker
        />
      </div>
    </MuiPickersUtilsProvider>
    </div>
  )
}

export default ViewResult