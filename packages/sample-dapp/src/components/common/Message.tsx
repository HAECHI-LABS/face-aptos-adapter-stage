import { ReactNode } from 'react';

interface MessageProps {
  type?: string;
  className?: string;
  children?: ReactNode;
}

function Message({ type, className, children }: MessageProps) {
  return (
    <div className={`message ${type ? 'is-' + type : ''} ${className}`}>
      <div className="message-body">{children}</div>
    </div>
  );
}

export default Message;
