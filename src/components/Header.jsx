import React from "react";
import "./Header.css";

const Header = ({ currentDate, onPrev, onNext }) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>Prev</button>
      <h2>{currentDate.format("MMMM YYYY")}</h2>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Header;
