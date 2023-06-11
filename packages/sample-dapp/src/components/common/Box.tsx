import { ReactNode } from 'react';

interface BoxProps {
  id?: string;
  title?: string;
  children: ReactNode;
}

function Box({ title, children, id }: BoxProps) {
  return (
    <div className="box" id={id}>
      <h2 className="box__title title is-4">{title}</h2>
      <div className="box__body">{children}</div>
    </div>
  );
}

export default Box;
