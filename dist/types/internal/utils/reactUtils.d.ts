import * as React from 'react';
import { Constructor } from '../../types';
export declare class ReactUtils {
    static addPropsToChildren(children: React.ReactNode, createPropsToAdd: (child: React.ReactElement<any>, index?: number) => any): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    static childrenOfType<T>(parentElement: any, type: Constructor<T>): T[];
    /**
     * Return the only child that matches the given type.
     * If more than one child matches an error is thrown.
     *
     * Notice that this function gives no indication of the total number of
     * children, only the number of matching children.
     * @param parentElement
     * @param type
     */
    static singleChildOfType<T>(parentElement: any, type: Constructor<T>): T;
    static compareKeys(a: React.Key, b: React.Key): number;
    private static childrenArray;
    private static elementInstanceOf;
}
