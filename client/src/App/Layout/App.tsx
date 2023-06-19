import { useState } from "react";
import Catalog from "../../features/Catalog/Catalog";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const bgColor = darkMode ? "#121212" : "#eaeaea";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: bgColor,
      },
    },
  });

  const themeHandler = () => {
    setDarkMode((preValue) => !preValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header themeHandler={themeHandler} darkMode={darkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
