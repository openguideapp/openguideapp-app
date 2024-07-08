import { expect, test } from "bun:test";
import markdownToHast from "../markdown/markdown-to-hast";

const markdownSample = `# Heading\n\nThis is a **bold** text.`;

test("convert markdown to HTML", async () => {
    const result = markdownToHast(markdownSample);
    expect(result.value).toContain("<h1>Heading</h1>");
    expect(result.value).toContain("<strong>bold</strong>");
});
