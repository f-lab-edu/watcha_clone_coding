import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = React.PropsWithChildren<{
  icon?: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, children, ...props }: ButtonProps): React.ReactElement => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
