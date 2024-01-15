import React, { ReactNode, MouseEvent } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const UbuntuButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="ubuntu-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default UbuntuButton;
