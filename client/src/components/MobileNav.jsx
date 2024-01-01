import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMail } from "react-icons/hi";
import { RxPencil1 } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import MobileNav from "./MobileNav";
import { FaBars } from "react-icons/fa6";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ul className="flex text-lg gap-6 items-center">
        <li>
          <div className="inline font-medium text-blac ">
            <li className="profile">
              <Button
                className="text-black shadow-none text-lg p-0 outline-none border-[0]  inline font-light"
                onClick={showDrawer}
              >
                <li className="inline font-medium text-black py-3 ">
                  <div className="flex flex-row gap-3 items-center">
                    <FaBars className="text-xl text-darkblue" />
                  </div>
                </li>
              </Button>
              <Drawer
                width={500}
                placement="right"
                onClose={onClose}
                open={open}
                className="w-20"
              >
                <div className="px-8 bg-purple h-full ">
                  <div className="bg-purple ">
                    <ul className="flex flex-col text-[22px] gap-4">
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
                      {currentUser ? (
                        <NavLink
                          to="/settings"
                          exact
                          className="font-medium text-darkblue decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
                        >
                          Account
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/sign-in"
                          exact
                          className="font-medium text-darkblue decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
                        >
                          Sing In
                        </NavLink>
                      )}
                      {currentUser && currentUser.role === "admin" ? (
                        <NavLink
                          to="/listing/requests"
                          exact
                          className="font-medium text-darkblue decoration-lightblue decoration-2 hover:underline hover:underline-offset-4 py-3"
                        >
                          Manage Listings
                        </NavLink>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              </Drawer>
            </li>
          </div>
        </li>
      </ul>
    </>
  );
}
