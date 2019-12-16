import * as React from 'react';
import { Constructor } from '../../types';

export class ReactUtils {

    public static addPropsToChildren(children: React.ReactNode, createPropsToAdd: (child: React.ReactElement<any>, index?: number) => any) {

        // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
        return React.Children.map(children, (child: React.ReactElement<any>, index: number) => {
            const propsToAdd = createPropsToAdd(child, index);
            return React.cloneElement(child, propsToAdd);
        });
    }    

    public static childrenOfType<T>(parentElement: any, type: Constructor<T>): T[] {
        const children = ReactUtils.childrenArray(parentElement);
        if (!children)
            return null;
        return children.filter(child => ReactUtils.elementInstanceOf(child, type)) as any;
    }

    /**
     * Return the only child that matches the given type.  
     * If more than one child matches an error is thrown.  
     * 
     * Notice that this function gives no indication of the total number of
     * children, only the number of matching children.
     * @param parentElement 
     * @param type 
     */
    public static singleChildOfType<T>(parentElement: any, type: Constructor<T>): T {
        const matchingChildren = ReactUtils.childrenOfType(parentElement, type);
        if (!matchingChildren || !matchingChildren.length)
            return null;

        if (matchingChildren.length > 1)
            throw new Error(`Only one ${type.name} child element is allowed.`);

        return matchingChildren[0] as any;
    }

    //
    // private methods
    //

    private static childrenArray(parentElement: any): React.ReactChild[] {
        if (!parentElement)
            return null;
        if (!parentElement.props)
            return null;

        const children = parentElement.props.children;
        if (Array.isArray(children))
            return children;

        return React.Children.map(children, child => child);
    }

    private static elementInstanceOf<T>(elem: any, type: Constructor<T>): elem is T {
        if (!elem)
            return false;
        if (!elem.type)
            return false;

        // https://stackoverflow.com/questions/39387405/using-instanceof-to-test-for-base-class-of-a-react-component
        // https://stackoverflow.com/questions/14486110/how-to-check-if-a-javascript-class-inherits-another-without-creating-an-obj
        // https://stackoverflow.com/questions/2464426/whats-the-difference-between-isprototypeof-and-instanceof-in-javascript

        return elem.type === type ||
            elem.type.prototype instanceof type ||
            Object.prototype.isPrototypeOf.call(type, elem.type);
    }    
}