import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../Firebase";
import { set } from "mongoose";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const image = currentUser.data.rest.profilePicture;
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePicker = useRef();
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);

  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileURL);

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadingProgress(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("could not upload image must less than 10 mb");
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileURL(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg  mx-auto w-full p-3 ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handelImageChange}
          ref={filePicker}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-sm overflow-hidden rounded-full "
          onClick={() => filePicker.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(62,152,199,${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileURL || image}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border=[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure"> {imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="userName"
          placeholder="userName"
          defaultValue={currentUser.data.rest.userName}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.rest.email}
        />
        <TextInput type="password" id="password" placeholder="********" />

        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>

      <div className="text-red-500 cursor-pointer flex justify-between mt-5">
        <span>Delete an Account </span>
        <span>Sign Out </span>
      </div>
    </div>
  );
}
