import { PostContent } from "../../components/posts/post-detail";
import { getAllPostsFiles, getPostData } from "../../lib/posts-util";
import Head from "next/head"

const POstDetaiilPage = (props) => {
  return <>
  <Head>
    <title>{props?.post?.title}</title>
    <meta name="description" content={props?.post?.excerpt} />
  </Head>
   <PostContent  post={props.post} />;
  </>
};

export const getStaticPaths = (context) => {
  const postFileNames = getAllPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export default POstDetaiilPage;
