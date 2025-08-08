import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import eventsData from "./events.json";
import Header from "./components/Header";
import CalendarGrid from "./components/CalendarGrid";
import Sidebar from "./components/Sidebar";
import ToogleSwitch from "./components/ToogleSwitch";
import "./App.css";

const App = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(() =>
    dayjs().startOf("month").startOf("week")
  );
  const [events, setEvents] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const handlePrevMonth = () => {
    const newDate = currentDate.subtract(1, "month");
    setCurrentDate(newDate);
    setStartDate(newDate.startOf("month").startOf("week"));
  };

  const handleNextMonth = () => {
    const newDate = currentDate.add(1, "month");
    setCurrentDate(newDate);
    setStartDate(newDate.startOf("month").startOf("week"));
  };

  const handleWheelScroll = (e) => {
    if (e.deltaY > 0) {
      setStartDate((prev) => prev.add(7, "day"));
    } else {
      setStartDate((prev) => prev.subtract(7, "day"));
    }
  };

  const appStyle = {
    backgroundColor: isDark ? "#121212" : "#f5f5f5",
    color: isDark ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  return (
    <div className="calendar-container" style={appStyle} onWheel={handleWheelScroll}>
      <ToogleSwitch isDark={isDark} setIsDark={setIsDark} />
      <Sidebar />
      <Header currentDate={currentDate} onPrev={handlePrevMonth} onNext={handleNextMonth} />
      <CalendarGrid currentDate={currentDate} startDate={startDate} events={events} />
    </div>
  );
};

export default App;
