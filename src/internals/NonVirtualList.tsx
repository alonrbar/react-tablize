import * as React from 'react';
import { SizeUtils } from '../utils';
import { ListProps } from './List';

export class NonVirtualList extends React.PureComponent<ListProps> {

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
            direction: this.props.dir,
            outline: 'none',
            overflow: 'hidden'
        };
        const innerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
            boxSizing: 'content-box',
            outline: 'none',
            overflow: 'auto',
            [this.isHorizontal ? 'overflowY' : 'overflowX']: 'hidden'
        };

        if (this.isHorizontal) {
            innerStyle.display = 'flex';
        }

        if (this.props.hideScrollbar) {
            if (this.isHorizontal) {
                innerStyle.paddingBottom = SizeUtils.scrollbarWidth;
            } else {
                const paddingDir = (this.props.dir === 'rtl' ? 'paddingLeft' : 'paddingRight');
                innerStyle[paddingDir] = SizeUtils.scrollbarWidth;
            }
        }

        return React.createElement('div',
            {
                style: outerStyle,
                onScroll: this.handleOnScroll
            },
            React.createElement('div',
                {
                    ref: this.innerElement,
                    style: innerStyle
                },
                Array(this.props.itemCount).fill(0).map((_, index) => (
                    React.createElement('div',
                        {
                            key: index,
                            index,
                            style: {
                                [this.isHorizontal ? 'minWidth' : 'minHeight']: this.props.itemSize(index),
                                [this.isHorizontal ? 'height' : 'width']: (this.isHorizontal ? this.props.height : this.props.width)
                            },
                            data: null
                        },
                        this.props.children(index)
                    )
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
        this.props.onScroll(this.isHorizontal ? scrollLeft : scrollTop);
    }
}