import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VariableSizeList } from 'react-window';
import { KeyEvent, Keys } from '../../utils';
import { ListProps } from '../List';
import { CustomScrollbars } from '../CustomScrollbars';

const scrollKeys: IMap<boolean> = {
    [Keys.PageUp]: true,
    [Keys.PageDown]: true,
    [Keys.End]: true,
    [Keys.Home]: true,
};

export interface VirtualListProps extends ListProps {
    keyScroll?: boolean;
}

export class VirtualList extends React.PureComponent<VirtualListProps> {

    private tableElement = React.createRef<VariableSizeList>();
    private tableInnerRef = React.createRef<HTMLElement>();
    private tableOuterRef = React.createRef<HTMLElement>();

    public refresh() {
        if (this.tableElement.current) {
            this.tableElement.current.resetAfterIndex(0, false);
        }
        this.forceUpdate();
    }

    public render() {
        return (
            <VariableSizeList
                innerRef={this.tableInnerRef}
                outerRef={this.tableOuterRef}
                style={{ outline: 'none' }}
                outerElementType={this.getOuterElementType()}
                direction={this.props.dir}
                layout="vertical"
                height={this.props.height}
                width={this.props.width}
                itemCount={this.props.itemCount}
                itemSize={this.props.itemSize}
                overscanCount={this.props.overscan}
                {...this.getKeyScrollProps()}
            >
                {({ index, style }) => this.renderBodyRow(index, style)}
            </VariableSizeList>
        );
    }

    private renderBodyRow(index: number, style: React.CSSProperties) {
        
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
    }

    private removeKeyHandlers = () => {
        window.removeEventListener('keydown', this.scrollByKey);
    }

    private scrollByKey = ({ key }: KeyEvent) => {

        // https://dev.to/dance2die/scrolling-with-page-up-down-keys-in-react-window-31ei

        if (!scrollKeys[key])
            return;

        if (!this.tableElement.current || !this.tableInnerRef.current || !this.tableOuterRef.current)
            return;

        const scrollElement = (this.props.customScrollbar ? this.tableOuterRef.current : this.tableElement.current);
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

        this.tableElement.current.scrollTo(offsetByKey[key]);
    }

    private getOuterElementType() {
        return this.props.customScrollbar ? CustomScrollbars : undefined;
    }
}