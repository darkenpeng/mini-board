import client from "./client";

export const login = ({ username, password }) =>
  client.post("/api/auth/login", { username, password });

export const register = ({ username, password }) =>
  client.post("http://localhost:3000/users", { username, password });

export const check = () => client.get("/api/auth/check");
