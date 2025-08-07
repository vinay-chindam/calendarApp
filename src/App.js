import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import eventsData from "./events.json";
import Header from "./components/Header";
import CalendarGrid from "./components/CalendarGrid";
import "./App.css";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(() => dayjs().startOf('month').startOf('week'));
  const [events, setEvents] = useState([]);

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
      setStartDate(prev => prev.add(7, 'day'));
    } else {
      setStartDate(prev => prev.subtract(7, 'day'));
    }
  };

  return (
    <div className="calendar-container" onWheel={handleWheelScroll}>
      <Sidebar/>
      <Header
        currentDate={currentDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <CalendarGrid
        currentDate={currentDate}
        startDate={startDate}
        events={events}
      />
    </div>
  );
};

export default App;
