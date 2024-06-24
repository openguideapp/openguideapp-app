// import TOML from "@iarna/toml";
// @ts-ignore
// import normalizeForReactNative from "mdast-normalize-react-native";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from "remark-parse";
// @ts-ignore
// import { Options as RemarkRehypeOptions } from 'mdast-util-to-hast'
import remarkToRehype from "remark-rehype";
import toml from "toml"
import { unified } from "unified";
import { VFile } from "vfile";

import remarkAudioPlayerPlugin from "./remark-directive-plugins/remarkAudioPlayerPlugin";
import remarkButtonPlugin from "./remark-directive-plugins/remarkButtonPlugin";
import remarkListPlugin from "./remark-directive-plugins/remarkListPlugin";
import remarkVideoPlayerPlugin from "./remark-directive-plugins/remarkVideoPlayerPlugin";
// import remarkYoutubePlugin from "./remark-directive-plugins/remarkYoutubePlugin";
// import flattenImageParagraphs from "mdast-flatten-image-paragraphs";
// @ts-ignore
// import moveImagesToRoot from "mdast-move-images-to-root";

export default function markdownToHast(md: string): VFile {
	//   const remarkParseOptions: RemarkParseOptions = {}
	// const remarkToRehypeOptions = []

	const remarkPlugins = [
		remarkDirective,
		// remarkYoutubePlugin,
		remarkButtonPlugin,
		remarkAudioPlayerPlugin,
		remarkVideoPlayerPlugin,
		remarkListPlugin

	];
	// const rehypePlugins = []

	return (
		unified()
			.use(remarkParse) //, remarkParseOptions)
			.use(remarkFrontmatter, ['toml'])
			.use(remarkExtractFrontmatter, { toml: toml.parse })
			.use(remarkPlugins)
			// .use(flattenImageParagraphs)
			// .use(moveImagesToRoot)
			.use(remarkToRehype) //, remarkToRehypeOptions)
			// .use(rehypePlugins)
			.use(rehypeStringify)
			.processSync(md)
	)
}