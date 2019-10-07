import styled from '@emotion/styled';
import * as React from 'react';
import { range, SizeUtils } from '../utils';
import { GridProps } from './Grid';

export class NonVirtualGrid extends React.PureComponent<GridProps> {

    private disableScrollEvents = false;

    private readonly innerElement = React.createRef<HTMLDivElement>();

    public scrollTo = (e: ScrollEvent) => {
        const currentGrid = this.innerElement.current;
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

        const outerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
        };

        const innerStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
        };

        if (this.props.hideVerticalScrollbar) {
            const paddingDir = (this.props.dir === 'rtl' ? 'paddingLeft' : 'paddingRight');
            innerStyle[paddingDir] = SizeUtils.scrollbarWidth;
        }

        const totalWidth = range(this.props.columnCount).map(this.props.columnWidth).reduce((total, cur) => total + cur, 0);

        return (
            <NonVirtualGridWrapper style={outerStyle}>
                <StyledNonVirtualGrid
                    ref={this.innerElement}
                    style={innerStyle}
                    onScroll={this.handleOnScroll}
                >
                    {/* rows */}
                    {range(this.props.rowCount).map(rowIndex => (
                        <NonVirtualGridRow
                            key={rowIndex}
                            style={{
                                height: this.props.rowHeight(rowIndex),
                                width: totalWidth
                            }}
                        >
                            {/* columns */}
                            {range(this.props.columnCount).map(columnIndex => (
                                <NonVirtualGridColumn
                                    key={columnIndex}
                                    style={{
                                        height: this.props.rowHeight(rowIndex),
                                        width: this.props.columnWidth(columnIndex),
                                        minWidth: this.props.columnWidth(columnIndex)
                                    }}
                                >
                                    {/* content */}
                                    {this.props.children({
                                        rowIndex,
                                        columnIndex
                                    })}
                                </NonVirtualGridColumn>
                            ))}
                        </NonVirtualGridRow>
                    ))}
                </StyledNonVirtualGrid>
            </NonVirtualGridWrapper>
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
            scrollLeft
        });
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const NonVirtualGridWrapper = styled.div`
    overflow: hidden;    
`;

export const StyledNonVirtualGrid = styled.div`
    overflow: auto;
    box-sizing: content-box;
`;

const NonVirtualGridRow = styled.div`
    display: flex;
`;

const NonVirtualGridColumn = styled.div`
`;