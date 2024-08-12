import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const image = currentUser.data.rest.profilePicture;
  return (
    <div className="max-w-lg  mx-auto w-full p-3 bg-red-300">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-sm overflow-hidden rounded-full ">
          <img
            src={image}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border=[lightgray]"
          />
        </div>
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
