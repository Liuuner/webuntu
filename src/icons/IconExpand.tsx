import React from "react";
import { IconProps } from "./IconProps.ts";

const IconExpand = ({ color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} viewBox="0 0 16 16">
    <path fillRule="nonzero"
          d="M12 1a3 3 0 012.995 2.824L15 4v8a3 3 0 01-2.824 2.995L12 15H4a3 3 0 01-2.995-2.824L1 12V4a3 3 0 012.824-2.995L4 1h8zm0 1.5H4l-.144.007a1.5 1.5 0 00-1.35 1.349L2.5 4v8l.007.144a1.5 1.5 0 001.349 1.35L4 13.5h8l.144-.007a1.5 1.5 0 001.35-1.349L13.5 12V4l-.007-.144a1.5 1.5 0 00-1.349-1.35L12 2.5zm-1.25 3.372l1.061 1.06-3.784 3.786-3.785-3.785 1.06-1.06 2.724 2.723 2.725-2.724z" />
  </svg>
);

export default IconExpand;