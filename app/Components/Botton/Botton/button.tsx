"use client";

import { useGlobalState } from '@/app/content/globalProvider';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  name: string;
  type: "submit" | "button"; // Specifies the button type
  padding?: string; // Optional padding with a default value
  borderRad?: string; // Optional border radius with a default value
  fw?: string; // Optional font weight
  fs?: string; // Optional font size
  click?: () => void; // Click is now optional
  border?: string; // Optional border
  icon?: React.ReactNode; // Optional icon
  background?: string; // Optional background color
}

const Button: React.FC<ButtonProps> = ({
  icon,
  name,
  background = "transparent", // Default background is transparent
  padding = "0.5rem 1rem", // Default padding
  borderRad = "0.5rem", // Default border radius
  fw = "500", // Default font weight
  fs = "1rem", // Default font size
  click = () => {}, // Default empty function for click
  type = "button", // Default button type is "button"
  border = "none", // Default border
}) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      type={type}
      style={{
        background: background,
        padding: padding,
        borderRadius: borderRad,
        fontWeight: fw,
        fontSize: fs,
        border: border,
      }}
      theme={theme}
      onClick={click} // Handles the click event
    >
      {icon && <span>{icon}</span>} {/* Only render icon if provided */}
      {name}
    </ButtonStyled>
  );
};

// Styled button component
const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colorGrey2}; // Uses theme color
  z-index: 5;
  cursor: pointer;
  transition: all 0.35s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey3};
    font-size: 1.5rem;
    transition: all 0.35s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Button;
