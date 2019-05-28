
type Constructor<T> = new (...args: any[]) => T;

interface IMap<T> {
    [key: string]: T;
}

type OneOrMore<T> = T | T[];

type DocDir = 'ltr' | 'rtl';

interface Heights {
    height: string | number;
    minHeight: string | number;
    maxHeight: string | number;
}

type SizeCallback = (index: number) => number;