const Button = ({
  value,
  className,
  onClick,
  ariaLabel,
  disabled,
}: {
  value: any;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}) => {
  return (
    <button type="button" className={className} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
