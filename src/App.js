import styled from "styled-components";
import "./App.css";
import Search from "./components/Search";
import { useState } from "react";

const AppStyled = styled.section`
  background-color: ${(props) => (props.light ? "red" : "black")};
  color: ${(props) => (props.light ? "black" : "white")};
`;

function App() {
  const [light, setLight] = useState(true);
  return (
    <AppStyled light={light}>
      <button onClick={() => setLight(!light)}>Light-Dark</button>
      <Search />
    </AppStyled>
  );
}

export default App;
