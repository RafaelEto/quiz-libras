import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Ranking from "./pages/Ranking";
import Menu from "./pages/Menu";
import "./styles.css";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="menu" element={<Menu />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="ranking" element={<Ranking />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
