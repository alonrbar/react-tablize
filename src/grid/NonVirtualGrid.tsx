import styled from '@emotion/styled';
import * as React from 'react';
import { VariableSizeGridProps } from 'react-window';
import { range, SizeUtils } from '../utils';

export interface NonVirtualGridProps extends VariableSizeGridProps {
    hideVerticalScrollbar?: boolean;
}

export class NonVirtualGrid extends React.PureComponent<NonVirtualGridProps> {

    private readonly gridElement = React.createRef<HTMLDivElement>();

    private disableScrollEvents = false;

    public scrollTo = (e: ScrollEvent) => {
        const currentGrid = this.gridElement.current;
        if (currentGrid) {

            if (
                (e.scrollLeft === undefined || e.scrollLeft === currentGrid.scrollLeft) &&
                (e.scrollTop === undefined || e.scrollTop === currentGrid.scrollTop)
            ) {
                return;
            }

            this.disableScrollEvents = true;
            currentGrid.scrollTo({
                top: e.scrollTop,
                left: e.scrollLeft
            });
        }
    }

    public render() {

        const gridStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
        };

        if (this.props.hideVerticalScrollbar) {
            const paddingDir = (this.props.direction === 'rtl' ? 'paddingLeft' : 'paddingRight');
            gridStyle[paddingDir] = SizeUtils.scrollbarWidth;
        }

        const totalWidth = range(this.props.columnCount).map(this.props.columnWidth).reduce((total, cur) => total + cur, 0);

        return (
            <StyledNonVirtualGrid
                ref={this.gridElement}
                style={gridStyle}
                onScroll={this.handleOnScroll}
            >
                {range(this.props.rowCount).map(rowIndex => (
                    <NonVirtualGridRow
                        key={rowIndex}
                        style={{
                            height: this.props.rowHeight(rowIndex),
                            width: totalWidth
                        }}
                    >
                        {range(this.props.columnCount).map(columnIndex => (
                            React.createElement(this.props.children, {
                                key: columnIndex,
                                columnIndex,
                                rowIndex,
                                data: null,
                                isScrolling: false,
                                style: {
                                    height: this.props.rowHeight(rowIndex),
                                    width: this.props.columnWidth(columnIndex),
                                    minWidth: this.props.columnWidth(columnIndex)
                                },
                            })
                        ))}
                    </NonVirtualGridRow>
                ))}
            </StyledNonVirtualGrid>
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
            scrollTop,
            scrollLeft,
            horizontalScrollDirection: undefined,
            verticalScrollDirection: undefined,
            scrollUpdateWasRequested: false
        });
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const StyledNonVirtualGrid = styled.div`
    overflow: auto;
    box-sizing: content-box;
`;

const NonVirtualGridRow = styled.div`
    display: flex;
`;