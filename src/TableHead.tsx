import * as React from 'react';

// tslint:disable:whitespace
export class TableHeadProps<T> {

    /**
     * Default: 40px
     */
    public height?= '40px';
}
// tslint:enable

export class TableHead<T> extends React.PureComponent<TableHeadProps<T>> { }