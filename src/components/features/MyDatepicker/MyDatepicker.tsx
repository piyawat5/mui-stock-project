/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./MyDatepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import { Portal } from "react-overlays";

type props = {
  handleDate: (date: Date | null) => void;
};

const MyDatepicker: React.FC<props> = ({ handleDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ** fix popup is overlaid by other element.
  const CalendarContainer = ({ children }: any) => {
    const el = document.getElementById("calendar-portal");

    return <Portal container={el}>{children}</Portal>;
  };

  useEffect(() => {
    handleDate(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <DatePicker
        showMonthDropdown
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        placeholderText="Birth of date"
        wrapperClassName="date-picker"
        maxDate={new Date()}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="my-datepicker"
        calendarClassName="my-datepicker-calendar"
        popperContainer={CalendarContainer}
        dayClassName={(date) => (date.getDay() === 0 ? "sunday" : null)}
        customInput={<TextField fullWidth></TextField>}
      />
    </div>
  );
};

export default MyDatepicker;
