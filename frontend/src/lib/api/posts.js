import client from "./client";

export const writePost = ({ title, content }) =>
  client.post("http://localhost:3000/post", { title, content });
export const listPosts = () => {
  return client.get(`http://localhost:3000/post`);
};
