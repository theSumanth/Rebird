import { Suspense } from "react";
import { Await } from "react-router-dom";

import ss from "/images/ss.png";
import ProfileDetail from "../../components/Profile/ProfileDetail";
import PostsList from "../../components/Posts/PostsList";

const dummyProfile = {
  id: "p2",
  image: ss,
  username: "dwight29",
  name: "Dwight Schrute",
  bio: "ia have a Schrute Barn",
};

const dummyPosts = {
  posts: [
    {
      id: "p1",
      image: ss,
      username: "jim29",
      date: "29 Mar 2024",
      caption: "This is a post",
    },
  ],
};

const Profile = () => {
  return (
    <>
      <Suspense>
        <Await resolve={""}>
          {(loadedProfile) => <ProfileDetail profileData={dummyProfile} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={""}>
          {(loadedPosts) => <PostsList loadedData={dummyPosts} />}
        </Await>
      </Suspense>
    </>
  );
};

export default Profile;
