import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div>
        {/* {"left"} */}
        <div className="">
          <Link
            to="/"
            className="text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white text-4xl">
              Yuvraj's
            </span>
            Blog
          </Link>
        </div>
        {/* {right} */}
        <div></div>
      </div>
    </div>
  );
}
