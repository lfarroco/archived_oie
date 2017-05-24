import * as React from "react";
import { Block, BlockData, BlockMap } from "./Block";

let blocks: BlockMap = JSON.parse(localStorage.getItem('blocks'));

if (!blocks)
    blocks = {
        "main": {
            className: "",
            title: "block 1",
            childBlocks: {}
        }
    };

export class BlockEditor extends React.Component<undefined, BlockMap> {

    constructor(props: any) {

        super(props)

        this.state = blocks;

    }

    render() {

        return <Block
            id="main"
            blocks={this.state}
            childBlocks={this.state.main.childBlocks}
            title={this.state.main.title}
            className={this.state.main.className}
            isEditable={true}
            onAdd={this.addBlock.bind(this)}
            onRemove={this.removeBlock.bind(this)}
            onChangeClass={this.changeClass.bind(this)}
        />

    }

    addBlock(parentId: string) {

        let id = "block_" + new Date().getTime();

        let parent = JSON.parse(JSON.stringify(this.state[parentId]));

        console.log(parent)

        parent.childBlocks[id] = true;

        this.setState({
            [id]: {
                className: "col-sm-6",
                title: "block " + id,
                childBlocks: {}
            },
            [parentId]: parent
        });

        setInterval(() => {

            localStorage.setItem('blocks', JSON.stringify(this.state))

        }, 100)

    }

    removeBlock(blockId: string) {

        this.setState({ [blockId]: null });

        let state = JSON.parse(JSON.stringify(this.state));

        state = this.clearStateTree(state, blockId);

        let json = JSON.stringify(state);

        localStorage.setItem('blocks', json)

    }

    changeClass(blockId: string, className: string) {

        let block = JSON.parse(JSON.stringify(this.state[blockId]));

        block.className = className;

        this.setState({ [blockId]: block });

    }

    clearStateTree(state: any, blockId: string) {

        for (var key in state) {

            delete state[key];

            //delete parent references to this block
            if (state[key] && state[key].childBlocks[blockId]) {

                delete state[key].childBlocks[blockId];
            }
        }

        return state;
    }

}



