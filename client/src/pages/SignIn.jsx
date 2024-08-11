import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelchange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    if (!formData.userName || !formData.email || !formData.password) {
      return setErrorMessage("Please Fill out all fields");
    }
    try {
      await axios.post("/api/v1/register", formData);
      setLoading(false);
      navigate("/signup");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* {"left"} */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-4xl sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white ">
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
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <div>
              <Label value="Your user name" />
              <TextInput
                type="text"
                placeholder="User name"
                id="userName"
                onChange={handelchange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
                onChange={handelchange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handelchange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
