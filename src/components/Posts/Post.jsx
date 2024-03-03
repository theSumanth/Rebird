import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import {
  Delete,
  Heart,
  MessageSquareMore,
  SquarePen,
  Trash,
} from "lucide-react";

import Button from "../UI/Button";
import Comments from "../UI/Comments";

const Post = ({ post }) => {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  const postActions = (
    <div className="flex items-center gap-2">
      {/* <Link
        to={`/posts/${post.id}?username=${post.username}`}
        className="text-sm text-green_mx"
      >
        View Rebird
      </Link> */}
      <Link to={`/posts/${post.id}/edit`}>
        <SquarePen size={20} />
      </Link>
      <Link>
        <Trash size={18} color="red" opacity={0.6} />
      </Link>
    </div>
  );

  // function handleCancel() {}

  const user = localStorage.getItem("user");
  const isOwner = post.username === user.username;

  return (
    <main className="flex flex-col items-center gap-4 mt-4 ml-12 mb-12 mr-48">
      <section
        key={post.id}
        className="bg-gray-200 shadow-md transition-shadow mb-[-4px] w-[60%]"
      >
        <div className="flex flex-col rounded-sm overflow-hidden">
          <section className="flex justify-between items-center p-4">
            <div className="flex flex-1 gap-2 items-center">
              <img
                src={post.image}
                alt={post.username}
                className="object-cover rounded-full w-8 h-8"
              />
              <h2 className="font-medium text-base">{post.username}</h2>
            </div>

            {postActions}
          </section>
          <section className="flex">
            <img
              src={post.image}
              alt={post.username}
              className="object-contain"
            />
          </section>
          <section className="flex flex-1 items-start flex-col p-4">
            <p className="text-left">
              <span className="font-medium text-base">{post.username} </span>
              {post.caption}
            </p>
            <time className="text-gray-500 text-sm mt-2">{post.date}</time>
          </section>
          <section className="flex gap-2 bottom-0 p-4">
            <button>
              <Heart />
            </button>
            <button>
              <MessageSquareMore />
            </button>
          </section>
        </div>
      </section>
      <Comments comments={post.comments} />
    </main>
  );
};

export default Post;
