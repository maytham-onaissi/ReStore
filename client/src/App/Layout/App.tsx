import { useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (!buyerId) setLoading(false);

    agent.basket
      .get()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  // set theme mode
  // -----------------------------------------------
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
  // -----------------------------------------------

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header themeHandler={themeHandler} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
