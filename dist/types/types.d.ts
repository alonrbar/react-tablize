/// <reference types="react" />
export declare type Constructor<T> = new (...args: any[]) => T;
export interface IMap<T> {
    [key: string]: T;
}
export declare type OneOrMore<T> = T | T[];
export declare type DocDir = 'ltr' | 'rtl';
export declare type SizeCallback = (index: number) => number;
export interface ScrollEvent {
    scrollTop: number;
    scrollLeft: number;
}
export declare type ScrollDirection = 'vertical' | 'horizontal' | 'none' | 'both';
export interface StyleProps {
    style?: React.CSSProperties;
}
