import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Button, Drawer } from "antd";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMail } from "react-icons/hi";
import { RxPencil1 } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import MobileNav from "./MobileNav";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      
        <header className="md:hidden block shadow">
          <div className="flex justify-between items-center max-w-full mx-auto py-5 md:px-10 px-6">
            <Link to="/">
              <h1 className="font-bold text-2xl md:text-2xl flex flex-wrap">
                <span className="text-darkblue">Demi</span>
                <span className="text-lightblue">Sellars</span>
              </h1>
              <h1 className="font-bold text-6xl md:text-5xl flex flex-wrap px-4 py-2 bg-purple rounded-md m-20">
                <span className="text-darkblue">D</span>
                <span className="text-lightblue">S</span>
              </h1>
            </Link>
            <div>
              <MobileNav />
            </div>
          </div>
        </header>
     
      <header className="hidden md:block shadow">
        <div className="flex justify-between items-center max-w-full mx-auto py-5 md:px-10 px-6">
          <Link to="/">
            <h1 className="font-bold text-xl md:text-2xl flex flex-wrap">
              <span className="text-darkblue">Demi</span>
              <span className="text-lightblue">Sellars</span>
            </h1>
          </Link>

          <ul className="flex text-lg gap-6">
            <NavLink
              to="/search?type=sale"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              For Sale
            </NavLink>
            <NavLink
              to="/search?type=rent"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              To Rent
            </NavLink>
            <NavLink
              to="/search"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              House prices
            </NavLink>
            <NavLink
              to="/about-us"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              About Us
            </NavLink>
            <NavLink
              to="/our-services"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              Our Services
            </NavLink>
            <NavLink
              to="/contact-us"
              exact
              className="font-medium text-black decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
            >
              Contact Us
            </NavLink>
          </ul>
          {currentUser ? (
            <ul className="flex gap-6">
              <li>
                <div className="font-medium text-black">
                  <Button
                    className="text-black shadow-none text-lg p-0 outline-none border-[0] font-light"
                    onClick={showDrawer}
                  >
                    <li className="font-medium text-black">
                      <div className="flex flex-row gap-3 items-center">
                        <span>Account</span>
                        <span>
                          <img
                            className="w-8 h-8 rounded-full"
                            src={currentUser.avatar}
                            alt=""
                          />
                        </span>
                      </div>
                    </li>
                  </Button>
                  <Drawer
                    width={340}
                    placement="right"
                    onClose={onClose}
                    open={open}
                    className="w-20"
                  >
                    <div className="px-8 py-4 bg-purple">
                      <ul>
                        <Link to="/settings">
                          <li className="text-2xl cursor-pointer pb-5 font-semibold decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 ">
                            Account
                          </li>
                        </Link>
                        <Link to="/my-listings">
                          <li className="text-2xl cursor-pointer py-5 font-semibold decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 ">
                            My listings
                          </li>
                        </Link>
                        <Link to="/listing/saved">
                          <li className="text-2xl cursor-pointer py-5 font-semibold decoration-lightblue decoration-2 hover:underline hover:underline-offset-4">
                            Saved listings
                          </li>
                        </Link>
                        <Link to="/create-listing">
                          <li className="text-2xl cursor-pointer py-5 font-semibold decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 ">
                            Create listing
                          </li>
                        </Link>
                        <Link to="/sign-out">
                          <li className="text-2xl cursor-pointer py-5 font-semibold decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 ">
                          Sign Out
                          </li>
                        </Link>
                      </ul>
                    </div>
                    
                  </Drawer>
                </div>
              </li>
            </ul>
          ) : (
            <div>
                 <Link to="/sign-in">
              <button className="flex gap-2  bg-lightblue justify-center px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
                <div className="flex items-center gap-3 py-2 ">
                  <span className="text-white	">Sing in</span>
                </div>
              </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
