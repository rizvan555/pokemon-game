import "./App.css";
import Search from "./components/Search";
import { useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { Route, Routes } from "react-router-dom";

function App() {
  const [light, setLight] = useState(true);
  return (
    <div
      className="App"
      style={{
        color: light ? "black" : "white",
        backgroundColor: light ? "white" : "black",
        height: "100%",
      }}
    >
      <CgDarkMode onClick={() => setLight(!light)}>Light-Dark</CgDarkMode>
      <Routes>
        <Route path="/" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
