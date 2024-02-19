import { AccentColor } from "../../../theme/AccentColors.ts";

type AccentColorBtnProps = {
  accentColor: AccentColor;
  color: string;
  onClick: (accentColor: AccentColor) => void;
  selected: boolean;
}

function AccentColorButton({ accentColor, color, onClick, selected }: AccentColorBtnProps) {
  const handleClick = () => {
    onClick(accentColor);
  };

  return (
    <input type="radio" name={"accentColor"} onClick={handleClick} />
  );
}

export default AccentColorButton;