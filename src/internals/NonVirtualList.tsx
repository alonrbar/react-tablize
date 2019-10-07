import styled from '@emotion/styled';
import * as React from 'react';
import { SizeUtils } from '../utils';
import { CustomScrollbars } from './CustomScrollbars';
import { ListProps } from './List';

export class NonVirtualList extends React.PureComponent<ListProps> {

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    private disableScrollEvents = false;

    private readonly listElement = React.createRef<HTMLDivElement>();

    public scrollTo = (scrollOffset: number) => {
        const currentInner = this.listElement.current;
        if (currentInner) {

            if (scrollOffset === undefined)
                return;

            const currentOffset = (this.isHorizontal ? currentInner.scrollLeft : currentInner.scrollTop);
            if (scrollOffset === currentOffset)
                return;

            this.disableScrollEvents = true;
            currentInner.scrollTo({
                top: (this.isHorizontal ? undefined : scrollOffset),
                left: (this.isHorizontal ? scrollOffset : undefined)
            });
        }
    }

    public render() {

        const wrapperStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
            direction: this.props.dir,
            outline: 'none',
            overflow: 'hidden'
        };
        const listStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
            boxSizing: 'content-box',
            outline: 'none',
            overflow: 'auto',
            [this.isHorizontal ? 'overflowY' : 'overflowX']: 'hidden'
        };

        if (this.isHorizontal) {
            listStyle.display = 'flex';
        }

        if (this.props.hideScrollbar) {
            if (this.isHorizontal) {
                listStyle.paddingBottom = SizeUtils.scrollbarWidth;
            } else {
                const paddingDir = (this.props.dir === 'rtl' ? 'paddingLeft' : 'paddingRight');
                listStyle[paddingDir] = SizeUtils.scrollbarWidth;
            }
        }

        return (
            <NonVirtualListWrapper
                style={wrapperStyle}
                onScroll={this.handleOnScroll}
            >

                {/* list */}
                {React.createElement(this.getListElementType() as any,
                    {
                        ref: this.listElement,
                        style: listStyle
                    },

                    // rows
                    Array(this.props.itemCount).fill(0).map((_, index) => (
                        <NonVirtualListRow
                            key={index}
                            style={{
                                [this.isHorizontal ? 'minWidth' : 'minHeight']: this.props.itemSize(index),
                                [this.isHorizontal ? 'height' : 'width']: (this.isHorizontal ? this.props.height : this.props.width)
                            }}
                        >

                            {/* content */}
                            {this.props.children(index)}

                        </NonVirtualListRow>
                    ))
                )}
            </NonVirtualListWrapper>
        );
    }

    private handleOnScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        if (this.disableScrollEvents) {
            this.disableScrollEvents = false;
            return;
        }

        if (!this.props.onScroll)
            return;

        const { scrollTop, scrollLeft } = e.currentTarget;
        this.props.onScroll(this.isHorizontal ? scrollLeft : scrollTop);
    }

    private getListElementType() {
        return this.props.customScrollbar ? CustomScrollbars : 'div';
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const NonVirtualListWrapper = styled.div`
`;

const NonVirtualListRow = styled.div`
`;