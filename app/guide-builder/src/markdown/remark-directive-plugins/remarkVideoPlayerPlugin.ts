// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />

// const data = node.data ? node.data : {};

// import { h } from "hastscript";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

export default function remarkVideoPlayerPlugin() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree: import("mdast").Root, file: VFile): undefined => {
        visit(tree, (node) => {
            if (
                node.type === "containerDirective" || // ::: container [ ] { }
                node.type === "leafDirective" || // ::leaf[ ]{ }
                node.type === "textDirective" // :text[ ]{ }
            ) {

                if (node.name !== "video") return;

                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};
                const url = attributes.url;

                // if (node.type === "textDirective") {
                //     file.fail(
                //         "Unexpected `:youtube` text directive, use two colons for a leaf directive",
                //         node,
                //     );
                // }

                if (!url) {
                    file.fail("Unexpected missing `url` on `video` directive", node);
                }

                data.hName = "video";
                data.hProperties = {
                    url,
                };
            }
        });
    };
}