import { fromMarkdown } from "mdast-util-from-markdown";
// import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import  flatMap  from "unist-util-flatmap";


const tree = fromMarkdown(`![Image Text](https://example.com/image.png)
![Image Text](https://example.com/image.png)`);

// visitParents(tree, "paragraph", (node, ancestors) => {
// 	// console.log(node);
// 	// console.log(ancestors);

// 	// (1) find the first parent that is not a paragraph

// 	let firstTopParagraphParent = ancestors.find((ancestor, index) => {
// 		console.log("index ", index);
// 		return ancestor.type === "paragraph";
// 	});
// 	console.log(firstTopParagraphParent);

// 	// case firstTopParagraphParent is undefined

// 	// (2) check if parent has more than one child

// 	if (
// 		firstTopParagraphParent?.children.length &&
// 		firstTopParagraphParent.children.length > 1
// 	) {
// 		// (2 a ) if yes, add image node above paragraph

// 		console.log("add image node above paragraph");
// 	} else {
// 		// (2 b ) if no, replace paragraph with image node
// 		firstTopParagraphParent = node;
// 		console.log("replace paragraph with image node");
// 	}
// });

// @ts-nocheck
function flattenImageParagraphs() {
	return (ast) => {
		return flatMap(ast, (node) => {
			if (
				node.type === "paragraph" &&
				node.children.some((child) => child.type === "image")
			) {
				return node.children.map((child) => {
					if (child.type === "image") return child;
					return {
						type: "paragraph",
						children: [child],
						position: child.position,
					};
				});
			}
			return [node];
		});
	};
}

// console.log(flattenImageParagraphs()(tree));