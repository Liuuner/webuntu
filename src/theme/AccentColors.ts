type AccentColor =
  "default"
  | "bark"
  | "sage"
  | "olive"
  | "viridian"
  | "prussiangreen"
  | "blue"
  | "purple"
  | "magenta"
  | "red";

type AccentColorMap = {
  [key in AccentColor]: string;
};

const accentColorMap: AccentColorMap = {
  default: "#E95420",
  bark: "#787859",
  sage: "#657B69",
  olive: "#4B8501",
  viridian: "#03875B",
  prussiangreen: "#308280",
  blue: "#0073E5",
  purple: "#8856EB",
  magenta: "#BC33DB",
  red: "#E61D34"
};

const getAccentColor = (accentColor: AccentColor) => accentColorMap[accentColor];

export default getAccentColor;
export type { AccentColor };
export { accentColorMap };
