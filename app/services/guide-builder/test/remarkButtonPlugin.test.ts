import { expect, test } from "bun:test";
import unified from "unified";
import markdown from "remark-parse";
import html from "rehype-stringify";
import remarkButtonPlugin from "../markdown/remark-directive-plugins/remarkButtonPlugin";

test("remark button plugin converts button directive to HTML", () => {
    const markdownString = "::button[Click me!]{ path=/click }";
    const result = unified()
        .use(markdown)
        .use(remarkButtonPlugin)
        .use(html)
        .processSync(markdownString);

    expect(result.contents).toContain('<button path="/click">Click me!</button>');
});
