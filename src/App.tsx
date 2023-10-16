import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "./reducers";
import * as someActions from "./actions/someAction";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const someReducer = useSelector((state: RootReducers) => state.someReducer);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Stack spacing={6} direction="column">
          <Button
            onClick={() => dispatch(someActions.first() as any)}
            variant="text"
          >
            Text
          </Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
