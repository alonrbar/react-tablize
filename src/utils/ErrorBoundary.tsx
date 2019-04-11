import * as React from 'react';

class ErrorBoundaryState {
    public hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {

    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ hasError: true });
        console.error(error);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <span>X</span>
            );
        }
        return this.props.children !== undefined ? this.props.children : null;
    }
}