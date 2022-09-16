import fs from "fs"
import path from "path";
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content", "posts")

export const getAllPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
}

export const getPostData = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/,'') // removes the file extensiion

  const filePath = path.join(postsDirectory, postSlug + ".md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {data, content} = matter(fileContent);


  const postData = {
    slug: postSlug,
    ...data,
    content
  }

  return postData;
}

export const getAllPosts = () => {
  const postFiles = getAllPostsFiles()

  const allPosts = postFiles.map(postFiles => getPostData(postFiles));
  const sortedPost = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
  return sortedPost;
}

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);
  return featuredPosts;
}