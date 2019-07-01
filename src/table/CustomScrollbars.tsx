import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface CustomScrollbarsProps {
    style: React.CSSProperties;
    onScroll?: any;
    children?: React.ReactChildren;
}

export class CustomScrollbars extends React.PureComponent<CustomScrollbarsProps> {
    public render() {
        return (
            <Scrollbars
                style={{
                    ...this.props.style,
                    overflow: 'hidden',
                    direction: 'ltr'
                }}
                onScroll={this.props.onScroll}
            >
                {this.props.children}
            </Scrollbars>
        );
    }
}