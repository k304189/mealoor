import { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./router/Router";
import { systemTheme } from "./theme/systemTheme";

const App: VFC = () => {
  return (
    <ChakraProvider theme={systemTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
