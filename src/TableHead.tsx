import * as React from 'react';

export class TableHeadProps<T> {

    /**
     * Default: 40px
     */
    public height?= '40px';
}

export class TableHead<T> extends React.PureComponent<TableHeadProps<T>> { }