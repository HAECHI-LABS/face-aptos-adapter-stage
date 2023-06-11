import { ReactNode } from 'react';

interface FieldProps {
  label: ReactNode;
  children?: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="field is-horizontal">
      <div className="field-label">
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Field;
