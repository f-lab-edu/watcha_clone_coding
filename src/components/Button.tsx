import { Link } from "react-router-dom";

const Button = ({
  value,
  className,
  onClick,
  ariaLabel,
  to,
}: {
  value: any;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  to?: string;
}) => {
  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel}>
        {value}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {value}
    </button>
  );
};

export default Button;
