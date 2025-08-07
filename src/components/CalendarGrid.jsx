import React from "react";
import dayjs from "dayjs";
import DayCell from "./DayCell";
import "./CalendarGrid.css";

const CalendarGrid = ({ currentDate, events }) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");
  const today = dayjs();

  const days = [];
  let date = startDate;
  while (date.isBefore(endDate, "day") || date.isSame(endDate, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  return (
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
        <div key={idx} className="calendar-day-header">
          {day}
        </div>
      ))}
      {days.map((day, idx) => (
        <DayCell
          key={idx}
          day={day}
          isToday={day.isSame(today, "day")}
          isCurrentMonth={day.month() === currentDate.month()}
          events={events.filter((e) => dayjs(e.date).isSame(day, "day"))}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
