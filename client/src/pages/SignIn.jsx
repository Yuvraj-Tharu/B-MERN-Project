import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* {"left"} */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white text-4xl">
              Yuvraj's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is the demo project you can signin with email or continue with
            google
          </p>
        </div>
        {/* {right} */}
        <div className="flex-1 gap-2">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your user name" />
              <TextInput type="text" placeholder="User name" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign UP
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
