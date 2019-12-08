export type Constructor<T> = new (...args: any[]) => T;

export interface IMap<T> {
    [key: string]: T;
}

export type OneOrMore<T> = T | T[];

export type DocDir = 'ltr' | 'rtl';

export type SizeCallback = (index: number) => number;

export interface ScrollEvent {
    scrollTop: number;
    scrollLeft: number;
}