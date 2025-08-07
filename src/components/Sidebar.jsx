import React, { useState } from "react";
import "./Sidebar.css";
import events from "../events.json";

const Sidebar = () => {
    const [active, setActive] = useState("Home");

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const remainingEvents = events.filter((event) => {
        const [year, month, day] = event.date.split("-");
        const normalizedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        if (normalizedDate !== today) return false;

        const [hour, minute] = event.endTime.split(":").map(Number);
        const eventEnd = hour * 60 + minute;
        return eventEnd >= currentTime;
    });

    const navItems = [
        { icon: "🏠", label: "Home" },
        { icon: "📅", label: "Calendar" },
        {
            icon: "📋",
            label: "Events",
            count: remainingEvents.length,
        },
        { icon: "🔔", label: "Notifications" },
        { icon: "⚙️", label: "Settings" },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">MyPlanner</div>
            {navItems.map((item) => (
                <div
                    key={item.label}
                    className={`sidebar-item ${active === item.label ? "active" : ""}`}
                    onClick={() => setActive(item.label)}
                >
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                    {item.count > 0 && (
                        <span className="event-count">{item.count}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
