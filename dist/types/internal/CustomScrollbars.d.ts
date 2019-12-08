import * as React from 'react';
export interface CustomScrollbarsProps {
    style?: React.CSSProperties;
    onScroll?: any;
    forwardedRef: React.RefFunction<any> | React.RefObject<any>;
    children?: React.ReactNode;
}
export declare const CustomScrollbars: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
