import { IconClose } from "../../../icons";

type WindowCloseIconProps = {
  onClose: (e: React.MouseEvent) => void
}

export const WindowCloseIcon = ({ onClose }: WindowCloseIconProps) => {
  return (
    <div
      onClick={onClose}
      className={"WindowCloseIcon"}
    >
      <IconClose color={"#FFF"} />
    </div>
  );
};