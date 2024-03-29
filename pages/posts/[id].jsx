import Head from "next/head";
import Layout from "../../components/layout";
import { getPostData, getPostIds } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
	const ids = getPostIds();

	return {
		paths: ids,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function FirstPost({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>

			<article>
				<h1 className={utilStyles.headingX1}>{postData.title}</h1>

				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>

				<div
					dangerouslySetInnerHTML={{ __html: postData.htmlContent }}
				/>
			</article>
		</Layout>
	);
}
