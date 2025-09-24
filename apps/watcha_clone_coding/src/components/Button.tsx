import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
