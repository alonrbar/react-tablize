import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { Theme } from 'styled';
import { ErrorBoundary } from 'utils/ErrorBoundary';
import { ReactUtils } from 'utils/reactUtils';
import * as utils from 'utils/utils';
import { BodyCellRender, GridBody } from './GridBody';
import { GridCell } from './GridCell';
import { GridFooter } from './GridFooter';
import { GridHead } from './GridHead';
import { StyledGridHead, StyledGridHeadCell, StyledGridView } from './style';

interface Heights {
    height: any;
    minHeight: any;
    maxHeight: any;
}

type FullSyntaxChildren = [React.SubComp<GridHead>, React.SubComp<GridBody>];
type GridChildren = FullSyntaxChildren | BodyCellRender;

export interface GridViewProps extends React.DivProps {

    columnCount: number;
    columnWidth: number;

    dir?: DocDir;

    children?: GridChildren;
}

export class GridView extends React.PureComponent<GridViewProps> {

    public static readonly defaultHeight = '35vh';
    public static readonly defaultHeadHeight = '40px';

    //
    // nested types
    //

    public static Head = GridHead;

    public static Body = GridBody;

    public static Footer = GridFooter;

    public static Cell = GridCell;

    //
    // component code
    //

    public render() {
        const { columnCount, columnWidth, children, ...divProps } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={this.getTheme()}>
                    <StyledGridView
                        {...divProps}
                        style={Object.assign({}, this.props.style, this.getHeights(GridView.defaultHeight))}
                    >
                        {this.renderHead()}
                        {this.renderBody()}
                        {this.renderFooter()}
                    </StyledGridView>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }

    private renderHead() {
        const head = ReactUtils.singleChildOfType(this, GridHead);
        if (!head)
            return null;

        const { children, ...divProps } = head.props;

        return (
            <StyledGridHead
                {...divProps}
                style={Object.assign({}, head.props.style, this.getHeights(GridView.defaultHeadHeight))}
            >
                <ErrorBoundary>

                    {/* frozen first column */}
                    {/* TODO... */}

                    {/* main columns */}
                    <AutoSizer>
                        {({ width, height }) => (
                            <FixedSizeList
                                layout="horizontal"
                                height={height}
                                width={width}
                                itemCount={this.props.columnCount}
                                itemSize={this.props.columnWidth}
                            >
                                {({ index, style }) => {

                                    // create the cell
                                    const cell: any = children(index);

                                    // get cell props & content
                                    const { props: cellProps, content: cellContent } = GridCell.extract(cell);
                                    console.log(cellProps);

                                    // render
                                    return (
                                        <StyledGridHeadCell
                                            key={index}
                                            {...cellProps}                                            
                                            style={Object.assign({}, cellProps.style, style)}
                                        >
                                            <ErrorBoundary>
                                                {cellContent}
                                            </ErrorBoundary>
                                        </StyledGridHeadCell>
                                    );
                                }}
                            </FixedSizeList>
                        )}
                    </AutoSizer>

                </ErrorBoundary>
            </StyledGridHead>
        );
    }

    private renderBody() {
        return <span>Body</span>;
    }

    private renderFooter() {
        const footer = ReactUtils.singleChildOfType(this, GridFooter);
        if (!footer)
            return null;

        return (
            <span>Footer</span>
        );
    }

    private getTheme(): Theme {
        return {
            dir: this.props.dir
        };
    }

    private getHeights(defaultHeight: number | string): Heights {
        const style = (this.props.style || {});

        let height = style.height;
        let minHeight = style.minHeight;
        let maxHeight = style.maxHeight;

        if (height === undefined && minHeight === undefined) {
            height = defaultHeight;
        }

        height = utils.cssSizeString(height);
        minHeight = utils.cssSizeString(minHeight);
        maxHeight = utils.cssSizeString(maxHeight);

        return {
            height,
            minHeight,
            maxHeight
        };
    }
}