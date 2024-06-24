// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />

// const data = node.data ? node.data : {};

// import { h } from "hastscript";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

export default function remarkButtonPlugin() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree: import("mdast").Root, file: VFile): undefined => {
        visit(tree, (node) => {
            if (
                node.type === "containerDirective" ||
                node.type === "leafDirective" ||
                node.type === "textDirective"
            ) {

                if (node.name !== "button") return;

                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};
                const path = attributes.path;

                // if (node.type === "textDirective") {
                //     file.fail(
                //         "Unexpected `:youtube` text directive, use two colons for a leaf directive",
                //         node,
                //     );
                // }

                if (!path) {
                    file.fail("Unexpected missing `path` on `button` directive", node);
                }

                data.hName = "button";
                data.hProperties = {
                    path,
                };
            }
        });
    };
}