import * as React from "react";
import Button from "@mui/material/Button";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/private-theming";

import HabitList from "./HabitList";
import "./App.css";

import { lightGreen } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      light: lightGreen[100],
      main: lightGreen[500],
      dark: lightGreen[700],
      contrast: lightGreen[900],
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function retrieveLocalStorage() {
  const store = JSON.parse(localStorage.getItem("dopadetoxer"));

  if (store) {
    return store;
  }

  localStorage.setItem(
    "dopadetoxer",
    JSON.stringify([{ date: getDateString(), count: 0 }])
  );
  return JSON.parse(localStorage.getItem("dopadetoxer"));
}

function setLocalStorage(rows) {
  localStorage.setItem("dopadetoxer", JSON.stringify(rows));
}

function getDateString() {
  return new Date().toDateString();
}

function App() {
  const [rows, setRows] = React.useState(retrieveLocalStorage);

  const handleClick = (e) => {
    let mutateRows = rows.slice().map(({ date, count }) => {
      console.log(date, count);
      if (date === getDateString()) {
        return { date, count: ++count };
      } else {
        return { date, count };
      }
    });

    const hasDate = mutateRows.find((row) => row.date === getDateString());

    if (!hasDate) {
      mutateRows.push({ date: getDateString(true), count: 0 });
    }

    setRows(mutateRows);
    setLocalStorage(mutateRows);
  };

  const handleDelete = () => {
    setLocalStorage([{ date: getDateString(), count: 0 }]);
    setRows(retrieveLocalStorage);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <PsychologyIcon
            sx={{ width: "100px", height: "100px", marginTop: "5vh" }}
          />
          <Button
            variant="contained"
            onClick={(e) => handleClick(e)}
            sx={{ marginBottom: "5vh", marginTop: "5vh" }}
          >
            Did it again
          </Button>
          <HabitList rows={rows} />
          <Button
            variant="contained"
            color="warning"
            onClick={(e) => handleDelete(e)}
            sx={{ marginBottom: "5vh", marginTop: "5vh" }}
          >
            Reset
          </Button>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
