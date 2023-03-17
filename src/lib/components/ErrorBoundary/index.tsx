import { Component } from "react";

import Error from "../ErrorComp";

class ErrorBoundary extends Component {
  constructor(props: object | Readonly<object>) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment, @typescript-eslint/no-explicit-any
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <Error />;
    }

    // eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
    return (this.props as any).children;
  }
}

export default ErrorBoundary;
