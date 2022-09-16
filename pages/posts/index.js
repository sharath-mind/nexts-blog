import { AllPosts } from "../../components/posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head"

const AllPostsPage = (props) => {
  return <>
  <Head>
    <title>All posts</title>
    <meta name="description" content="A list of all posts" />
  </Head>
  <AllPosts posts={props.posts} />
  </>
}

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage;