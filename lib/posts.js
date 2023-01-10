import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);

	const postsData = fileNames.map((fName) => {
		const fullPath = path.join(postsDirectory, fName);
		const fContent = fs.readFileSync(fullPath, "utf8");
		const grayMatterData = matter(fContent);

		return {
			id: fName.replace(/\.md$/, ""),
			...grayMatterData.data,
		};
	});

	return postsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((f) => ({
		params: {
			id: f.replace(/\.md$/, ""),
		},
	}));
}

export async function getPostData(id) {
	const fName = path.join(postsDirectory, `${id}.md`);
	const content = fs.readFileSync(fName);

	const matterData = matter(content);

	const processedContent = await remark()
		.use(html)
		.process(matterData.content);
	const htmlContent = processedContent.toString();

	return {
		id,
		htmlContent,
		...matterData.data,
	};
}
