import { theme } from "antd";

const LightTheme = {
  token: {
    colorPrimary: "#6c40b5",
    colorInfo: "#6c40b5",
    colorBgBase: "#ffffff",
    colorLink: "#579dff",
    colorBgLayout: "transparent",
    colorBgContainer: "transparent"
  },
};

const darkTheme = {
  token: {
    colorPrimary: "#28124d",
    colorInfo: "#28124d",
    colorBgBase: "#1d2125",
    colorLink: "#28124d",
    colorLinkHover: "#86a8d6",
    colorBgLayout: "transparent",
    colorBgContainer: "transparent"
  },
  algorithm: theme.darkAlgorithm,
};


export const themeConfig = (isDark) => (isDark ? darkTheme : LightTheme);