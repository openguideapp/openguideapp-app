// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />

// const data = node.data ? node.data : {};

// import { h } from "hastscript";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

export default function remarkYoutubePlugin() {
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

				if (node.name !== "youtube") return;

				// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
				const data = node.data || (node.data = {});
				const attributes = node.attributes || {};
				const id = attributes.id;

				if (node.type === "textDirective") {
					file.fail(
						"Unexpected `:youtube` text directive, use two colons for a leaf directive",
						node,
					);
				}

				if (!id) {
					file.fail("Unexpected missing `id` on `youtube1` directive", node);
				}

				data.hName = "iframe";
				data.hProperties = {
					src: `https://www.youtube.com/embed/${id}`,
					width: 200,
					height: 200,
					frameBorder: 0,
					allow: "picture-in-picture",
					allowFullScreen: true,
				};
			}
		});
	};
}
