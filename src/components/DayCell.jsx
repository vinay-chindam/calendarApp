import React from "react";
import "./DayCell.css";

const DayCell = ({ day, isToday, isCurrentMonth, events }) => {
    const dayOfWeek = day.day();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendIcon = dayOfWeek === 0 ? "☀️" : dayOfWeek === 6 ? "💤" : "";

    const now = new Date();
    const currentDateString = now.toISOString().split("T")[0];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const filteredEvents = events.filter((event) => {
        if (event.date > currentDateString) return true;
        if (event.date < currentDateString) return false;

        const [endHour, endMinute] = event.endTime.split(":").map(Number);
        const eventEndMinutes = endHour * 60 + endMinute;

        return eventEndMinutes >= currentMinutes;
    });

    return (
        <div
            className={`calendar-day 
        ${isToday ? "today" : ""} 
        ${!isCurrentMonth ? "other-month" : ""} 
        ${isWeekend ? "weekend" : ""}
      `}
        >
            <div className="date-number">
                {day.date()} <span className="weekend-icon">{weekendIcon}</span>
            </div>

            {filteredEvents.slice(0, 2).map((event, index) => (
                <div
                    key={index}
                    className="event"
                    title={`${event.title} (${event.startTime} - ${event.endTime})`}
                    style={{
                        backgroundColor: index % 2 === 0 ? "#87ceeb" : "#f08080",
                    }}
                >
                    <div className="event-title">{event.title}</div>
                    <div className="event-time">
                        {event.startTime} - {event.endTime}
                    </div>
                </div>
            ))}

            {filteredEvents.length > 2 && (
                <div className="more-events">+{filteredEvents.length - 2} more</div>
            )}
        </div>
    );
};

export default DayCell;
