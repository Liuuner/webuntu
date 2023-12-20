import { IconClose } from "../../../icons";
import React from "react";

type WindowCloseIconProps = {
  onClose: (e: React.MouseEvent) => void,
  children?: string | React.ReactElement
}

export const WindowRoundedIcon = ({ onClose, children }: WindowCloseIconProps) => {
  return (
    <div
      onClick={onClose}
      className={"WindowCloseIcon"}
    >
      {children ||
        <IconClose color={"#FFF"} />
      }
    </div>
  );
};