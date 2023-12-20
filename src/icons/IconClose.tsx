import React from "react";
import { IconProps } from "./IconProps.ts";

const IconClose = ({ color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} viewBox="0 0 16 16">
    <path fillRule="nonzero"
          d="M13.041 1.898l1.06 1.06L9.062 8l5.04 5.042-1.06 1.06L8 9.062 2.96 14.1l-1.06-1.06L6.938 8 1.9 2.96l1.06-1.06 5.04 5.04z" />
  </svg>
);

export default IconClose;