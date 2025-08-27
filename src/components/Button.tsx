const Button = ({
  value,
  className,
  onClick,
  ariaLabel,
}: {
  value: any;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) => {
  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {value}
    </button>
  );
};

export default Button;
