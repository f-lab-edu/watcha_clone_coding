import { ButtonHTMLAttributes } from "react";

type ButtonProps = React.PropsWithChildren<{
  icon?: any;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, children, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
