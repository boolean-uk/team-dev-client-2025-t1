import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((post) => {
        post = post.post;
        return (
          <Post
            key={post.id}
            name={(post.author ? `${post.author.firstName} ${post.author.lastName}`: "Author required from backend")}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;
