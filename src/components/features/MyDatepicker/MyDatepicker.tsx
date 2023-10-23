/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./MyDatepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import { Portal } from "react-overlays";

type props = {
  handleDate: (date: Date | null) => void;
  value: Date | null;
};

const MyDatepicker: React.FC<props> = ({ handleDate, value }) => {
  // ** fix popup is overlaid by other element.
  function CalendarContainer({ children }: any) {
    const element = document.getElementById("calendar-portal");
    return <Portal container={element}>{children}</Portal>;
  }

  return (
    <div>
      <DatePicker
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        autoComplete="off"
        dateFormat="dd/MM/yyyy"
        placeholderText="Date of birth"
        wrapperClassName="date-picker"
        maxDate={new Date()}
        selected={value}
        onChange={(date) => handleDate(date)}
        className="my-datepicker"
        calendarClassName="my-datepicker-calendar"
        popperContainer={CalendarContainer}
        dayClassName={(date) => (date.getDay() === 0 ? "sunday" : null)}
        customInput={<TextField fullWidth></TextField>}
        required
      />
    </div>
  );
};

export default MyDatepicker;
