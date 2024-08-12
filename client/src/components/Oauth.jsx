import React from "react";
import { Button } from "flowbite-react";
import { FaGooglePlusG } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../Firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/userSlice";
export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelGoogleClick = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    dispatch(signInStart());
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      let resultFromGoogle = await signInWithPopup(auth, provider);

      const userName = resultFromGoogle.user.displayName;
      const googlePhotoUrl = resultFromGoogle.user.photoURL;
      const email = resultFromGoogle.user.email;

      let result = await axios.post("/api/v1/google-Auth", {
        userName,
        email,
        googlePhotoUrl,
      });

      if (result.statusText == "OK") {
        dispatch(signInSucess(result));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        console.log(error.message);
      }
      dispatch(signInFailure());
    }
  };
  return (
    <div>
      <Button
        onClick={handelGoogleClick}
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        className="w-full"
      >
        <FaGooglePlusG className="h-6 w-6 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
}
