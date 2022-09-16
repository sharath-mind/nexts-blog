import { FeaturedPosts, Hero } from "../components/home-page";
import {getFeaturedPosts} from "../lib/posts-util"
import Head from "next/head"

const HomePage = (props) => {
  return (
    <>
    <Head>
      <title>Sharath&#39;s shit</title>
      <meta name="description" content="No content" />
    </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    },
    revalidate: 60 
  }
}

export default HomePage;
