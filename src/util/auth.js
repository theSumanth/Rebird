import { json, redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
}

export function getAuthUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return user;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return json({ message: "NOT AUTHENTICATED" });
  }

  return null;
}

export function checkAuthorized() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  return null;
}
