import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface CustomScrollbarsProps {
    onScroll: any;
    style: React.CSSProperties;
    children: React.ReactChildren;
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