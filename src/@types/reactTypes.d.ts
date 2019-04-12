import * as React from 'react';

declare module 'react' {
    type SubComp<T> = T extends React.Component<infer P> ? React.ReactElement<P, any> : never;
}