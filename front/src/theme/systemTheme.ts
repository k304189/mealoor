import { extendTheme } from "@chakra-ui/react";

const baseColor = "navy";
const mainColor = "white";
const textColor = "black";

const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: baseColor,
        color: mainColor
      },
      button: {
        backgroundColor: mainColor,
        color: textColor
      },
      ".systemHeader": {
        backgroundColor: mainColor,
        height: "48px",
        color: textColor
      },
      ".systemHeaderButton": {
        _hover: {
          cursor: "pointer",
          backgroundColor: "#E2E8F0",
          height: "100%"
        }
      }
    },
  },
});
export default systemTheme;
