import "./App.css";
import Search from "./components/Search";
import { useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
