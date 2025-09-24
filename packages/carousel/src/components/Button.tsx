import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = React.PropsWithChildren<{
  icon?: React.ReactNode;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, children, ...props }: ButtonProps): React.JSX.Element => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
