import React from "react";
import { Button } from "flowbite-react";
import { MdOutlineFacebook } from "react-icons/md";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function FacebookOauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelFacebookClick = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const resultFromFacebook = await signInWithPopup(auth, provider);
      const displayName = resultFromFacebook.user.displayName;
      const email = resultFromFacebook.user.email;
      const photoURL = resultFromFacebook.user.photoURL;

      let result = await axios.post("/api/v1/facebook-Auth", {
        displayName,
        email,
        photoURL,
      });

      if (result.statusText == "OK") {
        dispatch(signInSucess(result.data.rest));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handelFacebookClick}
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        className="w-full"
      >
        <MdOutlineFacebook className="h-6 w-6 mr-2" />
        Continue with Facebook
      </Button>
    </div>
  );
}
