import * as React from 'react';
declare class ErrorBoundaryState {
    hasError: boolean;
}
export declare class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: any);
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): {};
}
export {};
