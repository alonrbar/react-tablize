import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface CustomScrollbarsProps {
    style?: React.CSSProperties;
    onScroll?: any;
    forwardedRef: (elem: Element) => void;
    children?: React.ReactNode;
}

class CustomScrollbarsInner extends React.PureComponent<CustomScrollbarsProps> {
    public render() {

        // https://github.com/bvaughn/react-window/issues/110#issuecomment-469061213

        const refSetter = (elem: any) => {
            if (!this.props.forwardedRef)
                return;
            this.props.forwardedRef((elem || {}).view);
        };

        return (
            <Scrollbars
                ref={refSetter}
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

export const CustomScrollbars = React.forwardRef((props, ref) => (
    <CustomScrollbarsInner {...props} forwardedRef={ref as any} />
));
CustomScrollbars.displayName = 'CustomScrollbars';