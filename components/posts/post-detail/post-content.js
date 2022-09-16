import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

SyntaxHighlighter.registerLanguage('js', js);

const PostContent = (props) => {
  const { post } = props;

  const imagePath = `/images/posts/${post?.slug}/${post?.image}`;

  const customRenderers = {
    // img: (image) => (
    //   <Image
    //     src={`/images/posts/${post.slug}/${image.src}`}
    //     alt={image.alt}
    //     width={600}
    //     height={300}
    //   />
    // ),
    p: (p) => {
      const { node } = p;
      if (node.children[0].type === "element") {
        const image = node.children[0].properties;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{p.children}</p>;
    },
    code: (code) => {
      const children = code.children[0];
      return (
        <SyntaxHighlighter
          language={code.className.replace("language-", "")}
          children={children}
          style={atomDark}
        />
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post?.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {post?.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
