
type Constructor<T> = new (...args: any[]) => T;

interface IMap<T> {
    [key: string]: T;
}

type OneOrMore<T> = T | T[];

type DocDir = 'ltr' | 'rtl';

type SizeCallback = (index: number) => number;