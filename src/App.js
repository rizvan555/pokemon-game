import "./App.css";
import Search from "./components/Search";
import { useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { Route, Routes } from "react-router-dom";
import Num1 from "./pages/Num1";
import Num2 from "./pages/Num2";
import Num3 from "./pages/Num3";
import Num4 from "./pages/Num4";
import Num5 from "./pages/Num5";
import Num0 from "./pages/Num0";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/num0" element={<Num0 />}></Route>
        <Route path="/num1" element={<Num1 />}></Route>
        <Route path="/num2" element={<Num2 />}></Route>
        <Route path="/num3" element={<Num3 />}></Route>
        <Route path="/num4" element={<Num4 />}></Route>
        <Route path="/num5" element={<Num5 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
