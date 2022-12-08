import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../../modules/posts";
import { useParams, useSearchParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";

const PostListContainer = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts, error } = useSelector(({ posts }) => ({
    posts: posts.posts,
    error: posts.error,
  }));
  useEffect(() => {
    console.log(dispatch(listPosts()));
    console.log(posts);
  }, [dispatch]);

  return <PostList error={error} posts={posts} />;
};

export default PostListContainer;
