import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VariableSizeList } from 'react-window';
import { IMap } from '../../types';
import { KeyEvent, Keys } from '../../utils';
import { CustomScrollbars } from '../CustomScrollbars';
import { List, ListProps } from './List';

const scrollKeys: IMap<boolean> = {
    [Keys.PageUp]: true,
    [Keys.PageDown]: true,
    [Keys.End]: true,
    [Keys.Home]: true,
};

export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}

export class VirtualList extends React.PureComponent<VirtualListProps> implements List {

    private tableRef = React.createRef<VariableSizeList>();
    private tableInnerRef = React.createRef<HTMLElement>();
    private tableOuterRef = React.createRef<HTMLElement>();

    public refresh() {
        if (this.tableRef.current) {
            this.tableRef.current.resetAfterIndex(0, false);
        }
        this.forceUpdate();
    }

    public scrollTo(offset: number): void {
        if (this.tableRef.current) {
            this.tableRef.current.scrollTo(offset);
        }
    }

    public render() {
        return (
            <VariableSizeList
                ref={this.tableRef}
                innerRef={this.tableInnerRef}
                outerRef={this.tableOuterRef}
                style={Object.assign({ outline: 'none' }, this.props.style)}
                outerElementType={this.getOuterElementType()}
                direction={this.props.dir}
                layout={this.props.layout}
                height={this.props.height}
                width={this.props.width}
                itemCount={this.props.itemCount}
                itemSize={this.props.itemSize}
                overscanCount={this.props.overscan}
                {...this.getKeyScrollProps()}
            >
                {({ index, style }) => this.renderRow(index, style)}
            </VariableSizeList>
        );
    }

    private renderRow(index: number, style: React.CSSProperties) {
        const row = this.props.children(index);

        return React.cloneElement(row, {
            style: {
                ...row.props.style,
                ...style
            }
        });
    }

    //
    // scroll with keys
    //

    private getKeyScrollProps() {
        if (this.props.keyScroll === false)
            return {};
        return {
            onMouseEnter: this.registerKeyHandlers,
            onMouseLeave: this.removeKeyHandlers,
            onKeyDown: this.scrollByKey
        };
    }

    private registerKeyHandlers = () => {
        window.addEventListener('keydown', this.scrollByKey);
    };

    private removeKeyHandlers = () => {
        window.removeEventListener('keydown', this.scrollByKey);
    };

    private scrollByKey = ({ key }: KeyEvent) => {

        // https://dev.to/dance2die/scrolling-with-page-up-down-keys-in-react-window-31ei

        if (!scrollKeys[key])
            return;

        if (!this.tableRef.current || !this.tableInnerRef.current || !this.tableOuterRef.current)
            return;

        const scrollElement = (this.props.customScrollbar ? this.tableOuterRef.current : this.tableRef.current);
        const table = (ReactDOM.findDOMNode(scrollElement) as HTMLElement);
        const currentOffset = table.scrollTop;
        const bodyHeight = table.clientHeight;
        const pageSize = bodyHeight * 0.85;
        const minOffset = 0.1;
        const maxOffset = this.tableInnerRef.current.clientHeight;

        const offsetByKey: IMap<number> = {
            [Keys.PageUp]: Math.max(minOffset, currentOffset - pageSize),
            [Keys.PageDown]: Math.min(currentOffset + pageSize, maxOffset),
            [Keys.End]: maxOffset,
            [Keys.Home]: minOffset,
        };

        this.tableRef.current.scrollTo(offsetByKey[key]);
    };

    private getOuterElementType() {
        return this.props.customScrollbar ? CustomScrollbars : undefined;
    }
}