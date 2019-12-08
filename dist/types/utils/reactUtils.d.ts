import * as React from 'react';
import { Constructor } from '../types';
export declare class ReactUtils {
    static addPropsToChildren(children: React.ReactNode, createPropsToAdd: (child: React.ReactElement<any>, index?: number) => any): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    static childrenOfType<T>(parentElement: any, type: Constructor<T>): T[];
    static singleChildOfType<T>(parentElement: any, type: Constructor<T>): T;
    private static childrenArray;
    private static elementInstanceOf;
}
