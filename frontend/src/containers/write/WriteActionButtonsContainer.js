import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writePost } from "../../modules/write";
import { Link } from "react-router-dom";
const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, content, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    dispatch(
      writePost({
        title,
        content,
      })
    );
  };

  const onCancel = () => {
    navigate(-1);
  };

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
