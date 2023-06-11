import { ReactNode } from 'react';

import Checkbox from './Checkbox';

interface CheckboxListProps {
  items: {
    key: string;
    label?: ReactNode;
  }[];
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

function CheckboxList({ items, state, setState }: CheckboxListProps) {
  const handleCheck = (checked: boolean, item: string) => {
    setState((values: string[]) =>
      checked ? [...values, item] : values.filter((value) => value !== item)
    );
  };

  return (
    <table>
      <tbody>
        {items.map(({ key, label }) => (
          <tr key={key} onClick={() => handleCheck(!state?.includes(key), key)}>
            <td>{label ?? key}</td>
            <td>
              <Checkbox item={key} checked={state?.includes(key)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CheckboxList;
