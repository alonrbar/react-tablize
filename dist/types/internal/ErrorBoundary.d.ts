import * as React from 'react';
declare class ErrorBoundaryState {
    hasError: boolean;
}
export declare class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
    constructor(props: unknown);
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
export {};
