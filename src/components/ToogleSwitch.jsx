import './ToogleSwitch.css'

function ToogleSwitch({ isDark, setIsDark }) {
  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" onChange={toggleMode} checked={isDark} />
        <span className="slider"></span>
      </label>
      <span className="mode-label">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </div>
  );
}

export default ToogleSwitch
