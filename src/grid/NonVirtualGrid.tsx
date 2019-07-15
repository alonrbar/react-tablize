import styled from '@emotion/styled';
import * as React from 'react';
import { VariableSizeGridProps } from 'react-window';
import { range } from '../utils';

export interface NonVirtualGridProps extends VariableSizeGridProps {
}

export class NonVirtualGrid extends React.PureComponent<NonVirtualGridProps> {

    public render() {
        return (
            <StyledNonVirtualGrid
                style={{
                    height: this.props.height,
                    width: this.props.height,
                }}
                onScroll={e => this.handleOnScroll({
                    scrollLeft: (e.target as HTMLElement).scrollLeft,
                    scrollTop: (e.target as HTMLElement).scrollTop,
                })}
            >
                {range(this.props.rowCount).map(rowIndex => (
                    <NonVirtualGridRow
                        key={rowIndex}
                        style={{
                            height: this.props.rowHeight(rowIndex)
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
                                    width: this.props.columnWidth(columnIndex)
                                },
                            })
                        ))}
                    </NonVirtualGridRow>
                ))}
            </StyledNonVirtualGrid>
        );
    }

    private handleOnScroll = (e: ScrollEvent) => {
        if (this.props.onScroll) {
            this.props.onScroll({
                scrollUpdateWasRequested: null,
                horizontalScrollDirection: null,
                verticalScrollDirection: null,
                ...e
            });
        }
    }
}

// ---------------- //
//      styles      //
// ---------------- //

const StyledNonVirtualGrid = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const NonVirtualGridRow = styled.div`
    display: flex;
`;