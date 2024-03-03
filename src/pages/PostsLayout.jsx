import { Outlet, defer, json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const PostsLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PostsLayout;

async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/feed/posts", {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    });

    if (!response.ok) {
      throw json({ message: "Could not fetch Posts" }, { status: 500 });
    }

    if (response.status === 400) {
      throw json({ message: "No posts are available" }, { status: 422 });
    }
  } catch (err) {
    throw json({ message: "Could not fetch Posts" }, { status: 500 });
  }

  const resData = await response.json();
  return resData;
}

export function loader() {
  return defer({
    data: loadPosts(),
  });
}
