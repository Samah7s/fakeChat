const theme = {
  colors: {
    primary: "#00a884",
    background: "#f0f2f5",
    border: "#ddd",
    error: "#ff4444",
    disabled: "#cccccc",
    text: "#333333",
    white: "#ffffff",
  },
  shadows: {
    base: "0 2px 4px rgba(0,0,0,0.1)",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  radii: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

export type ThemeType = typeof theme;
export default theme;
