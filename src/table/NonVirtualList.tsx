import { DirectionProperty } from 'csstype';
import * as React from 'react';
import { VariableSizeListProps } from 'react-window';
import { SizeUtils } from '../utils';

export interface NonVirtualListProps extends VariableSizeListProps {
    hideScrollbar?: boolean;
}

export class NonVirtualList extends React.PureComponent<NonVirtualListProps> {

    private get isHorizontal(): boolean {
        return this.props.layout === 'horizontal';
    }

    private disableScrollEvents = false;

    private readonly innerElement = React.createRef<HTMLDivElement>();

    public scrollTo = (scrollOffset: number) => {
        const currentInner = this.innerElement.current;
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

        const outerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
            direction: (this.props.direction as DirectionProperty),
            outline: 'none',
            overflow: 'hidden'
        };
        const innerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
            boxSizing: 'content-box',
            outline: 'none',
            overflow: 'auto'
        };

        if (this.isHorizontal) {
            innerStyle.display = 'flex';
        }

        if (this.props.hideScrollbar) {
            if (this.isHorizontal) {
                innerStyle.paddingBottom = SizeUtils.scrollbarWidth;
            } else {
                const paddingDir = (this.props.direction === 'rtl' ? 'paddingLeft' : 'paddingRight');
                innerStyle[paddingDir] = SizeUtils.scrollbarWidth;
            }
        }

        return React.createElement(this.props.outerElementType || 'div',
            {                
                style: outerStyle,
                onScroll: this.handleOnScroll
            },
            React.createElement(this.props.innerElementType || 'div',
                {
                    ref: this.innerElement,
                    style: innerStyle
                },
                Array(this.props.itemCount).fill(0).map((_, index) => (
                    React.createElement(this.props.children, {
                        key: index,
                        index,
                        style: {
                            [this.isHorizontal ? 'minWidth' : 'minHeight']: this.props.itemSize(index),
                            [this.isHorizontal ? 'height' : 'width']: (this.isHorizontal ? this.props.height : this.props.width)
                        },
                        data: null
                    })
                ))
            )
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
        this.props.onScroll({
            scrollOffset: (this.isHorizontal ? scrollLeft : scrollTop),
            scrollDirection: undefined,
            scrollUpdateWasRequested: false
        });
    }
}