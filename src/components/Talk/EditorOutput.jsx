import Block from "./Block.jsx";

/**
 * Renders the root of the parsed clause tree.
 */
export default function EditorOutput({parseTree}) {
    return (
        <div className="editor-output">
            {
                parseTree.map(
                    (block, bi) => (
                        <Block key={bi} block={block}/>
                    )
                )
            }
        </div>
    );
}