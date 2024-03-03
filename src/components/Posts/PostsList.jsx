import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import logo from "/images/rebird.png";
import ss from "/images/ss.png";
import { Heart, MessageSquareMore } from "lucide-react";

function PostsList({ loadedData }) {
  const dummyPosts = [
    {
      id: "p1",
      image: logo,
      username: "jim29",
      date: "29 Mar 2024",
      caption: "This is a post",
    },
    {
      id: "p2",
      image: ss,
      username: "dwight29",
      date: "29 Mar 2024",
      caption: "This is a second post #Rebird #SecondPost",
    },
  ];

  // const fetchedPosts = data.posts.length === 0 ? data.posts : dummyPosts;
  const fetchedPosts = dummyPosts;

  return (
    <InfiniteScroll dataLength={loadedData.posts.length}>
      <ul className="flex flex-col items-center gap-4 mt-4 ml-12 mb-12 mr-48">
        <h1 className="font-bold">All Posts</h1>
        {loadedData && loadedData.message && <p>{loadedData.message}</p>}
        {fetchedPosts.map((post) => (
          <li
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
                <Link
                  to={`/posts/${post.id}?username=${post.username}`}
                  className="text-sm text-green_mx"
                >
                  View Rebird
                </Link>
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
                  <span className="font-medium text-base">
                    {post.username}{" "}
                  </span>
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
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default PostsList;
