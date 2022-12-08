import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import SubInfo from "../common/SubInfo";

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  width: 1200px;
  background: white;
  padding-top: 1.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid gray;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: gray;
    }
  }
  p {
    margin-top: 2rem;
  }
`;
// const SubInfo = styled.div`
//   color: gray;

//   span + span:before {
//     color: gray;
//     padding-left: 0.25rem;
//     padding-right: 0.25rem;
//     content: "\\B7";
//   }
// `;

const PostItem = ({ post }) => {
  const { title, content, createdAt } = post;
  return (
    <PostItemBlock>
      <h2>{title}</h2>
      <SubInfo username="username" publishedDate={createdAt} />
      <p>{content}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, error }) => {
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button to="/write">새 글 작성하기</Button>
      </WritePostButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
