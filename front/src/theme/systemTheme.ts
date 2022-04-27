import { extendTheme } from "@chakra-ui/react";

export const baseColor = "#E6D6B5";
export const mainColor = "#FBF9F4";
export const accentColor = "#FFAA00";
export const textColor = "#403726";
export const systemComponentColor = "blue.800";
export const readOnlyColor = "#A0AEC0";

export const primaryButtonColor = "#FF6D62";
export const secondaryButtonColor = textColor;
export const withdrawButtonColor = "#829CBA";
export const noButtonColor = "#F5F5F4";
export const defaultRadioColor = "#D07D59";
export const secondRadioColor = "#64A05E";
export const primaryCheckboxButtonColor = "#738CF0";

export const appAccountBgColor = "#2A4365";
export const appAccountBorderColor = "#C4F1F9";
export const appBodyBgColor = "#51BC37";
export const appEatBgColor = "#EE7800";
export const appFavoriteEatBgColor = "#FCC800";
export const appFavoriteEatBorderColor = "#A16D58";
export const appStockBgColor = "#E03448";
export const appStockBorderColor = "#FDBA77";
export const appFavoriteStockBgColor = "#FF97C2";
export const appFavoriteStockBorderColor = "#A791B2";

export const eatSummaryKcalColor = "#F75959";
export const eatSummaryPriceColor = "#FFD454";

export const eatTimingBreakfastBgColor = "#CCFFEC";
export const eatTimingLunchBgColor = "#FDFDC4";
export const eatTimingDinnerBgColor = "#FFE8CF";
export const eatTimingSnackBgColor = "#FFDEDE";

export const eatTimingBreakfastChartColor = "#45D6A0";
export const eatTimingLunchChartColor = "#EEEE65";
export const eatTimingDinnerChartColor = "#FBC489";
export const eatTimingSnackChartColor = "#F49797";

export const eatTypeOutColor = "#FFA952";
export const eatTypeHmrColor = "#FFE79A";
export const eatTypeInColor = "#FEFFDF";

export const bodyWeightColor = "#2ECFCA";
export const bodyFatRateColor = "#009EE6";
export const bodyFatWeightColor = "#6C7CD3";

export const trLimitExpiredBgColor = "#CBD5E0";
export const trLimitTodayBgColor = "#FEB2B2";
export const trLimitWarningBgColor = "#FAF089";
export const tdMinusValueBgColor = "#BBE2F1";
export const tdPlusValueBgColor = "#FDEDE4";

const systemHeaderHeight = "48px";
const systemMainHeight = `calc(100% - ${systemHeaderHeight})`;
const appTitleHeight = "40px";
const betweenAppMargin = "20px";
const appContentsHeight = `calc(100% - ${systemHeaderHeight} - ${appTitleHeight} - ${betweenAppMargin})`;
const appOnlyContentsHeight = `calc(100% - ${systemHeaderHeight} - ${betweenAppMargin})`;

const systemButtonHover = {
  cursor: "pointer",
  backgroundColor: "#E2E8F0",
  height: "100%",
};

const menuSection = {
  paddingTop: "8px",
  paddingBottom: "8px",
};

const overlayDiv = {
  width: "100%",
  height: "100%",
  display: "inline-block",
  position: "relative",
  "img.bg": {
    width: "100%",
    height: "100%",
    display: "block",
    opacity: "0.7",
  },
  ".overlayText": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export const systemTheme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        height: "100%",
        backgroundColor: baseColor,
        color: textColor,
      },
      button: {
        _hover: {
          opacity: "0.9",
        },
      },
      "input[type='number']": {
        textAlign: "right",
      },
      "button.transparent": {
        backgroundColor: "transparent",
      },
      "button.primary": {
        backgroundColor: primaryButtonColor,
        color: "white",
      },
      "button.secondary": {
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: secondaryButtonColor,
        color: secondaryButtonColor,
        _hover: {
          color: "white",
          backgroundColor: secondaryButtonColor,
        },
      },
      "button.withdraw": {
        backgroundColor: withdrawButtonColor,
        color: "white",
      },
      "button.no": {
        backgroundColor: noButtonColor,
        color: "black",
      },
      "button.limitIcon": {
        backgroundColor: "transparent",
        _hover: {
          backgroundColor: "transparent",
          cursor: "default",
        },
      },
      "button.body": {
        backgroundColor: appBodyBgColor,
        color: "white",
      },
      "button.eat": {
        backgroundColor: appEatBgColor,
        color: "white",
      },
      "button.favoriteEat": {
        backgroundColor: appFavoriteEatBgColor,
        color: "black",
      },
      "button.stock": {
        backgroundColor: appStockBgColor,
        color: "white",
      },
      "button.favoriteStock": {
        backgroundColor: appFavoriteStockBgColor,
        color: "black",
      },
      "div.defaultRadioButton": {
        borderColor: defaultRadioColor,
        color: defaultRadioColor,
        _hover: {
          cursor: "pointer",
        },
        _checked: {
          bg: defaultRadioColor,
          color: "white",
        },
      },
      "div.defaultSecondRadioButton": {
        borderColor: secondRadioColor,
        color: secondRadioColor,
        _hover: {
          cursor: "pointer",
        },
        _checked: {
          bg: secondRadioColor,
          color: "white",
        },
      },
      "div.defaultCheckBoxButton": {
        _hover: {
          cursor: "pointer",
        },
        "&.primary": {
          borderColor: primaryCheckboxButtonColor,
          color: primaryCheckboxButtonColor,
          ".smallCheckbox": {
            borderColor: primaryCheckboxButtonColor,
          },
          _checked: {
            backgroundColor: primaryCheckboxButtonColor,
            color: "white",
            ".smallCheckbox": {
              color: "white",
            },
          },
        },
      },
      "tr.limitExpired": {
        backgroundColor: trLimitExpiredBgColor,
      },
      "tr.limitToday": {
        backgroundColor: trLimitTodayBgColor,
      },
      "tr.limitWarning": {
        backgroundColor: trLimitWarningBgColor,
      },
      ".systemHeader": {
        backgroundColor: mainColor,
        height: systemHeaderHeight,
        color: textColor,
        position: "fixed",
        zIndex: "1",
        width: "100%",
        ".logo": {
          height: systemHeaderHeight,
        },
      },
      ".systemMain": {
        position: "fixed",
        top: systemHeaderHeight,
        height: systemMainHeight,
        width: "100%",
        ".appTitle": {
          height: appTitleHeight,
          marginTop: betweenAppMargin,
          lineHeight: appTitleHeight,
          borderLeftWidth: "10px",
          borderLeftStyle: "solid",
          paddingLeft: "10px",
        },
        ".appContents": {
          height: appContentsHeight,
          marginTop: betweenAppMargin,
        },
        ".appOnlyContents": {
          height: appOnlyContentsHeight,
          marginTop: betweenAppMargin,
          marginBottom: betweenAppMargin,
        },
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
      "input.readOnly,textarea.readOnly, select.readOnly": {
        backgroundColor: readOnlyColor,
      },
      ".overlayDark": {
        backgroundColor: "black",
        color: "white",
        ...overlayDiv,
      },
      ".overlayLight": {
        backgroundColor: "white",
        color: "black",
        ...overlayDiv,
      },
      ".bgMain": {
        backgroundColor: mainColor,
      },
      ".sectionTitle": {
        display: "flex",
        borderLeft: `5px solid ${baseColor}`,
        paddingLeft: "8px",
        alignItems: "center",
      },
      ".pagination": {
        display: "flex",
        listStyle: "none",
        gap: "2px",
        li: {
          borderRadius: "5px",
          width: "40px",
          height: "48px",
          _hover: {
            backgroundColor: accentColor,
            color: "white",
          },
          "&.xs": {
            width: "20px",
            height: "28px",
          },
          "&.sm": {
            width: "24px",
            height: "32px",
          },
          "&.md": {
            width: "28px",
            height: "36px",
          },
          "&.lg": {
            width: "32px",
            height: "40px",
          },
          "&.selected": {
            backgroundColor: accentColor,
            color: "white",
          },
        },
        a: {
          display: "flex",
          width: "100%",
          height: "100%",
          fontWeight: "bold",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      ".pagingTable td": {
        paddingTop: "4px",
        paddingBottom: "4px",
      },
      ".eatTable": {
        td: {
          "&.breakfast": {
            backgroundColor: eatTimingBreakfastBgColor,
          },
          "&.lunch": {
            backgroundColor: eatTimingLunchBgColor,
          },
          "&.dinner": {
            backgroundColor: eatTimingDinnerBgColor,
          },
          "&.snack": {
            backgroundColor: eatTimingSnackBgColor,
          },
          "&.eatTypeOut": {
            backgroundColor: eatTypeOutColor,
          },
          "&.eatTypeHmr": {
            backgroundColor: eatTypeHmrColor,
          },
          "&.eatTypeIn": {
            backgroundColor: eatTypeInColor,
          },
        },
      },
      ".account": {
        backgroundColor: appAccountBgColor,
        borderLeftColor: appAccountBorderColor,
        color: "white",
      },
      ".favoriteEat": {
        backgroundColor: appFavoriteEatBgColor,
        borderLeftColor: appFavoriteEatBorderColor,
        color: "black",
      },
      ".stock": {
        backgroundColor: appStockBgColor,
        borderLeftColor: appStockBorderColor,
        color: "white",
      },
      ".favoriteStock": {
        backgroundColor: appFavoriteStockBgColor,
        borderLeftColor: appFavoriteStockBorderColor,
        color: "black",
      },
      ".diffDownCell": {
        backgroundColor: tdMinusValueBgColor,
        color: "blue",
      },
      ".diffUpCell": {
        backgroundColor: tdPlusValueBgColor,
        color: "red",
      },
    },
  },
});
// export default systemTheme;
