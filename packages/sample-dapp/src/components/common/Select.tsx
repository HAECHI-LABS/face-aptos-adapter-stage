import './Select.css';

import { ButtonHTMLAttributes } from 'react';

interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLSelectElement>, 'onSelect'> {
  items:
    | {
        name: string;
        value: string;
      }[]
    | string[];
  onSelect: (value: string) => void;
}

function Select({ items, onSelect, className = '', ...rest }: SelectProps) {
  return (
    <div className="Select">
      <select
        className={`button ${className}`}
        onChange={(e) => onSelect(e.target.value)}
        {...rest}>
        {items.map((item) => {
          const value = typeof item === 'string' ? item : item.value;
          const name = typeof item === 'string' ? item : item.name;

          return (
            <option key={value} value={value}>
              {name}
            </option>
          );
        })}
      </select>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </div>
  );
}

export default Select;
