import { useState, useContext } from "react";

import Modal from "../UI/Modal";
import PostForm from "./PostForm";
import { PageStatus } from "../../store/PageStatusProvder";

const PostEdit = () => {
  const [image, setImage] = useState({
    url: "",
    file: [],
  });
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const pageStatusCtx = useContext(PageStatus);
  // const open = pageStatusCtx.path === "/posts/new";

  const handleImageChange = (event) => {
    console.log("click");
    setImage((prevState) => {
      return {
        ...prevState,
        url: URL.createObjectURL(event.target.files[0]),
        file: [...prevState.file, event.target.files[0]],
      };
    });

    setIsEditing(true);
  };

  const handleOnChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      {open && (
        <Modal
          method={"PUT"}
          path={"/posts/edit"}
          data={{ image: image.file, description }}
          buttonCaption={"Save"}
        >
          <PostForm
            onImageChange={handleImageChange}
            isEditing={isEditing}
            image={image}
            onTextChange={handleOnChange}
          />
        </Modal>
      )}
    </>
  );
};

export default PostEdit;