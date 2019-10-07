import * as React from 'react';

declare module 'react' {

    type SubComp<T> = T extends React.Component<infer P> ? React.ReactElement<P, any> : never;

    type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

    type RefFunction<T> = (elem: T) => void;
}