import { extendTheme } from "@chakra-ui/react";

export const baseColor = "orange.300";
export const mainColor = "white";
export const textColor = "black";
export const avatarColor = "blue.800";

const systemButtonHover = {
  cursor: "pointer",
  backgroundColor: "#E2E8F0",
  height: "100%",
};

const menuSection = {
  paddingTop: "8px",
  paddingBottom: "8px",
};

export const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: baseColor,
        color: textColor,
      },
      button: {
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
        _hover: systemButtonHover,
      },
      ".menuSection": {
        ...menuSection,
      },
      ".menuButton": {
        ...menuSection,
        paddingLeft: "12px",
        _hover: systemButtonHover,
      },
      "input.readOnly": {
        backgroundColor: "#A0AEC0",
      },
    },
  },
});
// export default systemTheme;
