import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  item: string;
  onCheck?: (checked: boolean, item: string) => void;
}

function Checkbox({ className, item, onCheck, ...rest }: CheckboxProps) {
  return (
    <div className="Checkbox">
      <input
        type="checkbox"
        className={`check ${className}`}
        onChange={(e) => onCheck?.(e.target.checked, item)}
        {...rest}
      />
    </div>
  );
}

export default Checkbox;
