import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
export default function Foter() {
  return (
    <Footer container className="border border-t-8  border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className=" text-lg font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white ">
                Yuvraj's
              </span>
              Blog
            </Link>
          </div>
          <div
            className="grid grid-cols-2 gap-8
          sm:mt-3 sm:grid-cols-3 sm:gap-6"
          >
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  100 js Project
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Yuvraj's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Folllow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Yuvraj-Tharu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/yuvraj-tharu-25b566206/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link>Privacy Policy</Footer.Link>
                <Footer.Link>Term &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full items-center sm:justify-between sm:flex">
          <Footer.Copyright
            href="#"
            by="Yuvraj's Blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 mt-4 sm:mt-0">
            <Footer.Icon
              href="https://github.com/Yuvraj-Tharu"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.instagram.com/i_m_uraj/"
              target="_blank"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://www.facebook.com/suraj.delove/"
              target="_blank"
              icon={BsFacebook}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
