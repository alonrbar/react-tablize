import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ErrorBoundary } from '../internal/ErrorBoundary';
import { VirtualGrid, VirtualGridProps } from '../internal/grid';
import { SizeUtils } from '../internal/utils';
import { DocDir } from '../types';

export interface GridViewProps extends Omit<VirtualGridProps, 'height' | 'width'> {
    height?: string | number;
    width?: string | number;
}

export class GridView extends React.PureComponent<GridViewProps> {

    public static readonly defaultHeight = '35vh';

    private get direction(): DocDir {
        return this.props.style?.direction === 'rtl' ? 'rtl' : 'ltr';
    }

    public render() {
        return (
            <ErrorBoundary>
                <div
                    style={{
                        direction: this.direction,
                        width: '100%',
                        ...this.props.style,
                        ...SizeUtils.getElementHeights(this, GridView.defaultHeight)
                    }}
                >
                    <AutoSizer>
                        {({ width, height }) => (
                            <VirtualGrid 
                                {...this.props}
                                height={height}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                </div>
            </ErrorBoundary >
        );
    }
}