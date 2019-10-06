import styled from '@emotion/styled';
import * as React from 'react';
import { VariableSizeGrid, VariableSizeGridProps } from 'react-window';
import { SizeUtils } from '../../utils';

export interface VirtualGridProps extends VariableSizeGridProps {
    hideVerticalScrollbar?: boolean;
}

export class VirtualGrid extends React.PureComponent<VirtualGridProps> {

    private readonly innerElement = React.createRef<VariableSizeGrid>();

    public scrollTo = (e: ScrollEvent) => {
        if (this.innerElement.current) {
            this.innerElement.current.scrollTo(e);
        }
    }

    public render() {

        const outerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
        };

        const innerStyle: React.CSSProperties = {};

        if (this.props.hideVerticalScrollbar) {
            const paddingDir = (this.props.direction === 'rtl' ? 'paddingLeft' : 'paddingRight');
            innerStyle[paddingDir] = SizeUtils.scrollbarWidth;
        }

        return (
            <OuterVirtualGrid style={outerStyle}>
                <InnerVirtualGrid
                    {...this.props}
                    ref={this.innerElement}
                    style={Object.assign({}, this.props.style, innerStyle)}
                />
            </OuterVirtualGrid>
        );
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const OuterVirtualGrid = styled.div`
    overflow: hidden;    
`;

export const InnerVirtualGrid = styled(VariableSizeGrid)`
    overflow: auto;
    box-sizing: content-box;
`;