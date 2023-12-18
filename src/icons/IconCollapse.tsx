import React from "react";
import { IconProps } from "./IconProps.ts";

const IconCollapse = ({ color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} viewBox="0 0 16 16">
    <path fillRule="nonzero"
          d="M12 1a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V4a3 3 0 013-3h8zm0 1.5H4a1.5 1.5 0 00-1.493 1.356L2.5 4v8a1.5 1.5 0 001.356 1.493L4 13.5h8a1.5 1.5 0 001.493-1.356L13.5 12V4a1.5 1.5 0 00-1.356-1.493L12 2.5zM8.027 5.282l3.76 3.76-1.06 1.061-2.701-2.7-2.699 2.7-1.06-1.06 3.76-3.76z" />
  </svg>
);

export default IconCollapse;