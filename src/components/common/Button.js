import React from "react";
import { BorderRadius, Colors } from '../../config/styles';

const Button = ({
  action,
  children,
  fontColor,
  borderRadius,
  backgroundColor,
  classOverrides,
  onClick,
  borderColor,
  borderWidth,
  buttonPadding,
  type
}) => (
  <button
    action={action}
    style={{
     minWidth: "100px",
     color: fontColor ? Colors[fontColor] : Colors.white,
     borderRadius: borderRadius ? BorderRadius[borderRadius].all : BorderRadius['medium'].all,
     backgroundColor: backgroundColor ? Colors[backgroundColor] : Colors.brandPrimary,
     borderColor: borderColor ? Colors[borderColor] : Colors.darkGrey,
     border: `${borderWidth} solid` || 'none',
   }}
    type={type}
    className={buttonPadding ? `${buttonPadding} tc bn f5 pointer ${classOverrides}` : `pa3 tc bn f5 pointer ${classOverrides}`}
    onClick={onClick} >
    {children}
  </button>
);

export default Button;
