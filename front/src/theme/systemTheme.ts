import { extendTheme } from "@chakra-ui/react";

const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "navy",
        color: "white"
      },
      button: {
        backgroundColor: "white",
        color: "black"
      }
    },
  },
});
export default systemTheme;
