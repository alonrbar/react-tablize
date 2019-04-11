
type Constructor<T>  = new (...args: any[]) => T;

interface IMap<T> {
    [key: string]: T;
}

interface INestedMap<T> {
    [key: string]: IMap<T>;
}

type OneOrMore<T> = T | T[];

type Id = any;

interface IIdentifiable {
    id: Id;
}

type DocDir = 'ltr' | 'rtl';