import client from "./client";

export const listPosts = () => {
  return client.get(`http://localhost:3000/post`);
};
