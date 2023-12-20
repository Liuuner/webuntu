import React from "react";
import { IconProps } from "./IconProps.ts";

const IconMinus = ({ color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} viewBox="0 0 16 16">
    <path fillRule="nonzero" d="M14.849 7.25v1.5H1.15v-1.5z" />
  </svg>
);

export default IconMinus;