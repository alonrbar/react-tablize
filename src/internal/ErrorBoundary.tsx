import * as React from 'react';

class ErrorBoundaryState {
    public hasError: boolean;
}

export class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {

    constructor(props: unknown) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ hasError: true });
        console.error(error);  // eslint-disable-line no-console
    }

    public render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <span>X</span>
            );
        }
        return this.props.children !== undefined ? this.props.children : null;
    }
}