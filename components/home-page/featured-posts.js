import classes from './featured-posts.module.css'
import {PostGrid} from '../posts'

const FeaturedPosts = (props) => {
  const {posts} = props;
  return (
    <section>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts}/>
    </section>
  )
}

export default FeaturedPosts