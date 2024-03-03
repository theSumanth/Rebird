import { useContext, useState } from "react";
import { PageStatus } from "../../store/PageStatusProvder";

import Modal from "../UI/Modal";
import ProfileEditForm from "./ProfileEditForm";

const dummyData = {};

const ProfileEdit = () => {
  const [image, setImage] = useState({
    url: "",
    file: [],
  });
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  const pageStatusCtx = useContext(PageStatus);
  const open = pageStatusCtx.path === "/profile/edit";

  const handleImageChange = (event) => {
    console.log("click");
    setImage((prevState) => {
      return {
        ...prevState,
        url: URL.createObjectURL(event.target.files[0]),
        file: [...prevState.file, event.target.files[0]],
      };
    });
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      {open && (
        <Modal
          method={"POST"}
          path={"/profile/edit"}
          data={{ image: image.file, name, bio }}
          buttonCaption={"Save"}
        >
          <ProfileEditForm
            // path={"/posts/new"}
            onImageChange={handleImageChange}
            onNameChange={handleNameChange}
            onBioChange={handleBioChange}
            profileData={dummyData}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfileEdit;
