import {useMemo} from 'react';

/**
 * Takes in inputText and outputs the tree
 *
 * This useParseTree hook runs EVERY TIME inputText changes (i.e. when the user types ANYTHING within the editor-input textarea),
 * Turns a flat string with [ and ] into a nested array tree.
 * Memoizes the result so we only re-compute when `text` changes.
 *
 * Parses a flat string into a nested tree.
 *   - `[`   → start a new array node
 *   - `]`   → close the current node
 *   - `\n`  → emit an explicit newline marker
 *   - other chars → accumulate into strings
 *
 */
export default function useParseTree(inputText) {
    return useMemo(() => {
        // 1. split into raw lines
        const blocks = inputText.split('\n');

        // 2. parse each line into its own rune-tree
        return blocks.map((block) => {
            const root = [];
            const stack = [root];

            for (const char of block) {

                // Start plain rune
                if (char === '[') {
                    const rune = [];
                    stack[stack.length - 1].push(rune);
                    stack.push(rune);

                // Close plain rune
                } else if (char === ']') {
                    stack.pop();

                // Start parenthetical rune
                } else if (char === '(') {
                    const rune = [];
                    stack[stack.length - 1].push(rune);
                    stack.push(rune);

                // Close parenthetical rune
                } else if (char === ')') {
                    stack.pop();

                // Pass a NEWLINE onto the AST so that I can know where to start each new block
                } else if (char === '\n') {
                    stack[stack.length - 1].push('\n');

                // Just add the next char onto the current rune
                } else {
                    const curr = stack[stack.length - 1];
                    const last = curr[curr.length - 1]; //TODO: implement slingback
                    if (typeof last === 'string') {
                        curr[curr.length - 1] = last + char;
                    } else {
                        curr.push(char);
                    }
                }
            }

            return root;
        });
    }, [inputText]);
}

