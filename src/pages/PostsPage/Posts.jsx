import { Await, useRouteError, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import PostsList from "../../components/Posts/PostsList";

const Posts = () => {
  const error = useRouteError("posts-root");
  const { data } = useRouteLoaderData("posts-root");

  if (error && error.message) {
    return <>Error</>;
  }

  return (
    <Suspense fallback={""}>
      <Await resolve={data}>
        {(loadedData) => {
          return <PostsList loadedData={loadedData} />;
        }}
      </Await>
    </Suspense>
  );
};

export default Posts;
