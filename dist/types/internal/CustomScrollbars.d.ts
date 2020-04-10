import * as React from 'react';
export interface CustomScrollbarsProps {
    style?: React.CSSProperties;
    onScroll?: any;
    forwardedRef: React.Ref<any>;
    children?: React.ReactNode;
}
export declare const CustomScrollbars: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
