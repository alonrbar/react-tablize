import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface CustomScrollbarsProps {
    style?: React.CSSProperties;
    onScroll?: any;
    forwardedRef: React.Ref<any>;
    children?: React.ReactNode;
}

class CustomScrollbarsInner extends React.PureComponent<CustomScrollbarsProps> {
    public render() {

        // https://github.com/bvaughn/react-window/issues/110#issuecomment-469061213

        const refSetter = (elem: any) => {
            if (!this.props.forwardedRef)
                return;

            const ref = (elem || {}).view;
            if (typeof this.props.forwardedRef === 'function') {
                this.props.forwardedRef(ref);
            } else {
                (this.props.forwardedRef as any).current = ref;
            }
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
    <CustomScrollbarsInner {...props} forwardedRef={ref} />
));
CustomScrollbars.displayName = 'CustomScrollbars';