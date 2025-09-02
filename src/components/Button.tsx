import { ButtonHTMLAttributes, createContext } from "react";

type ButtonProps = {
  icon?: any;
  children?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, children, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
