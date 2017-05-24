import * as React from "react";

interface BlockProps {
    id?: string;
    blocks?: BlockMap;
    childBlocks?: ChildMap;
    className?: string;
    title?: any;
    isEditable?: boolean;
    onAdd?: Function;
    onRemove?: Function;
    onChangeClass?: Function;
}

interface ChildMap {
    [id: string]: boolean;
}

export interface BlockMap {
    [id: string]: BlockData;
}

export interface BlockData extends BlockProps {

}


export class Block extends React.Component<BlockProps, undefined> {

    render() {

        console.log('rendering block')

        let children: JSX.Element[];

        if (this.props.childBlocks)
            children = Object.keys(this.props.childBlocks).map((key, index) => {

                let block = this.props.blocks[key];

                if (!block) return;

                return <Block
                    id={key}
                    blocks={this.props.blocks}
                    isEditable={true}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    onChangeClass={this.props.onChangeClass}
                    key={index}
                    childBlocks={block.childBlocks}
                    className={block.className}
                    title={block.title}></Block>;

            });

        let editButtons;
        if (this.props.isEditable) {
            editButtons = <div style={{ marginTop: -5 }}>
                <span className="btn btn-sm btn-default glyphicon glyphicon-plus"
                    onClick={e => {
                        this.props.onAdd(this.props.id)
                    }}></span>

                <span className="btn btn-sm btn-warning glyphicon glyphicon-remove"
                    onClick={e => {
                        this.props.onRemove(this.props.id)
                    }}></span>

                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-3")
                    }}>3</span>


                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-4")
                    }}>4</span>


                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-6")
                    }}>6</span>

                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-8")
                    }}>8</span>


                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-9")
                    }}>9</span>


                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "col-sm-12")
                    }}>12</span>
                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "row")
                    }}>row</span>
                <span className="btn btn-sm btn-default"
                    onClick={e => {
                        this.props.onChangeClass(this.props.id, "")
                    }}>div</span>
            </div >


        }


        return <div className={this.props.className}>
            <div className="panel panel-default">

                <div className="panel-heading">

                    <select className="form-control" style={{ maxWidth: 250 }}>
                        <option>container</option>
                        <option>bbbb</option>
                        <option>cccc</option>
                        <option>ddd</option>
                    </select>


                    {editButtons}
                </div>

                <div className="panel-body">



                    {children}
                </div>

            </div>
        </div>

    }

}