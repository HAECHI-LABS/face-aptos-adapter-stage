import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: string;
}

function Button({ type, children, className, ...rest }: ButtonProps) {
  return (
    <button className={`button ${type ? 'is-' + type : ''} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
