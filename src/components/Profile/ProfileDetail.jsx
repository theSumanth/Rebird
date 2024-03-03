import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageStatus } from "../../store/PageStatusProvder";

const ProfileDetail = ({ profileData }) => {
  const pageStatusCtx = useContext(PageStatus);

  const handleSetPageStatus = (path) => {
    console.log(path);
    pageStatusCtx.changePath(path);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-12 ml-12 mb-12 mr-48 bg-gray-200 p-4 rounded-md overflow-hidden">
      <section className="flex gap-6">
        <div className="w-[20%]">
          <img
            src={profileData.image}
            className="object-cover aspect-square rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col items-start">
          <span className="text-green_mx font-medium">
            {profileData.username}
          </span>
          <span className="font-medium">{profileData.name}</span>
          <span className="text-sm text-gray-600">
            <span className="font-medium">{"Bio/ "}</span>
            {profileData.bio}
          </span>
          <Link
            to={"/connections"}
            onClick={() => handleSetPageStatus("")}
            className="flex gap-1 items-center align-middle bg-green mt-6 px-2 rounded-full hover:bg-lightGreen"
          >
            Connections
          </Link>
        </div>
        <Link
          to={"/profile/edit"}
          onClick={() => handleSetPageStatus("/profile/edit")}
          className="text-sm text-blue-400 inset-x-0 bottom-0"
        >
          Edit Profile
        </Link>
      </section>
    </div>
  );
};

export default ProfileDetail;
