import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggletheme } from "../redux/theme/themeSlice";
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handelSignOut = async () => {
    try {
      let result = await axios.post("/api/v1/signout-profile");

      if (result) {
        return dispatch(signoutSucess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white">
            Yuvraj's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            className="hidden lg:inline-block"
            type="text"
            placeholder="search"
            rightIcon={CiSearch}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <CiSearch />
        </Button>

        <div className="flex gap-2 md:order-2">
          <Button
            className="h-10 w-12 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggletheme())}
          >
            {theme == "light" ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser ? (
            <>
              <Dropdown
                className="select-none"
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    @{console.log(currentUser.userName)}
                  </span>
                  <span className="block text-sm font-medium truncate"></span>
                </Dropdown.Header>
                <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handelSignOut}>Sign Out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <Button gradientDuoTone="purpleToBlue">
              <Link to="SignIn">SignIn</Link>
            </Button>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path == "/"} as={"div"}>
            <Link to="/home">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path == "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path == ".projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
