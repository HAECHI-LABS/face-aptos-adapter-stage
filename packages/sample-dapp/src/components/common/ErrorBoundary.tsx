import React, { ReactNode } from 'react';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('An error occurred:', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
