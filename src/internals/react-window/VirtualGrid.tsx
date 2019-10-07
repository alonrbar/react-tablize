import styled from '@emotion/styled';
import * as React from 'react';
import { VariableSizeGrid } from 'react-window';
import { SizeUtils } from '../../utils';
import { GridProps } from '../Grid';

export class VirtualGrid extends React.PureComponent<GridProps> {

    private readonly innerElement = React.createRef<VariableSizeGrid>();

    public scrollTo = (e: ScrollEvent) => {
        if (this.innerElement.current) {
            this.innerElement.current.scrollTo(e);
        }
    }

    public render() {

        const wrapperStyle: React.CSSProperties = {
            height: this.props.height,
            width: this.props.width,
        };

        const innerStyle: React.CSSProperties = {};

        if (this.props.hideVerticalScrollbar) {
            const paddingDir = (this.props.dir === 'rtl' ? 'paddingLeft' : 'paddingRight');
            innerStyle[paddingDir] = SizeUtils.scrollbarWidth;
        }

        return (
            <VirtualGridWrapper style={wrapperStyle}>
                <StyledVirtualGrid
                    ref={this.innerElement}
                    style={Object.assign({}, this.props.style, innerStyle)}
                    direction={this.props.dir}
                    height={this.props.height}
                    width={this.props.width}
                    rowCount={this.props.rowCount}
                    rowHeight={this.props.rowHeight}
                    columnCount={this.props.columnCount}
                    columnWidth={this.props.columnWidth}
                    onScroll={this.props.onScroll}
                    overscanRowsCount={this.props.overscanRows}
                    overscanColumnsCount={this.props.overscanColumns}
                >
                    {({ rowIndex, columnIndex, style }) => this.renderCell(rowIndex, columnIndex, style)}
                </StyledVirtualGrid>
            </VirtualGridWrapper>
        );
    }

    private renderCell(rowIndex: number, columnIndex: number, style: React.CSSProperties) {

        const cell = this.props.children({ rowIndex, columnIndex });

        return React.cloneElement(cell, {
            key: `[ ${rowIndex}, ${columnIndex} ]`,
            style: {
                ...cell.props.style,
                ...style
            }
        });
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const VirtualGridWrapper = styled.div`
    overflow: hidden;    
`;

export const StyledVirtualGrid = styled(VariableSizeGrid)`
    overflow: auto;
    box-sizing: content-box;
`;