import { extendTheme } from "@chakra-ui/react";

export const baseColor = "orange.300";
export const mainColor = "white";
export const textColor = "black";

export const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: baseColor,
        color: mainColor,
      },
      button: {
        backgroundColor: mainColor,
        color: textColor,
        _hover: {
          opacity: "0.9",
        },
      },
      "button.primary": {
        backgroundColor: "#FF6D62",
        color: mainColor,
      },
      ".systemHeader": {
        backgroundColor: mainColor,
        height: "48px",
        color: textColor,
      },
      ".systemHeaderButton": {
        _hover: {
          cursor: "pointer",
          backgroundColor: "#E2E8F0",
          height: "100%",
        },
      },
    },
  },
});
// export default systemTheme;
