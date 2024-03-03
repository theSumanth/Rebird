import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import Post from "../../components/Posts/Post";
import ss from "/images/ss.png";

const PostDetail = () => {
  // const { data } = useLoaderData();

  const dummyPost = {
    id: "p2",
    image: ss,
    username: "dwight29",
    date: "29 Mar 2024",
    caption: "This is a second post #Rebird #SecondPost",
    comments: [
      {
        username: "yash011",
        comment:
          "Good app found this pretty intersting. Glad to use rebird #itscool",
      },
      {
        username: "vaish",
        comment: "haha yash",
      },
      {
        username: "someone1",
        comment: "haaaaaaaaaaaaaaaaa",
      },
    ],
  };

  return (
    // <Suspense>
    //   <Await resolve={data}>
    //     {(loadedData) => {
    <Post post={dummyPost} />
    //     }}
    //   </Await>
    // </Suspense>
  );
};

export default PostDetail;

export function dummyAction() {
  return defer({
    data: "",
  });
}

async function loadPost(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.post;
  }
}

async function loadPosts(username) {
  const response = await fetch("http://localhost:8080/events" + username);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const { postId, username } = params;

  return defer({
    post: await loadPost(postId, username),
    posts: loadPosts(username),
  });
}

export async function action({ params, request }) {
  const token = getAuthToken();

  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete post." },
      {
        status: 500,
      }
    );
  }
  return redirect("/posts");
}
