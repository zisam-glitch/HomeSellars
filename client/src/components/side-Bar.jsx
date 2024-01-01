import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CiCalculator1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { TfiStamp } from "react-icons/tfi";
import { MdOutlineContacts } from "react-icons/md";
import { useSelector } from "react-redux";
import { MdManageSearch } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-[22%] md:block hidden bg-white border-r-2">
      <div className="h-screen flex flex-col justify-between  py-10">
        <div>
          <div className="px-3 border-b-2  ">
            <Link to="/">
              <h1 className="font-bold text-2xl px-4 md:text-2xl flex flex-wrap">
                <span className="text-darkblue">Demi</span>
                <span className="text-lightblue">Sellars</span>
              </h1>
            </Link>
            <div className="py-6">
              <nav className=" flex flex-col gap-1 " id="sidebar">
                <NavLink
                  className="text-lg px-4 py-2"
                  to="/"
                  exact
                  activeClassName=""
                >
                  <span className="flex items-center gap-3">
                    <IoHomeOutline className=" " />
                    Home
                  </span>
                </NavLink>

                <NavLink
                  className="text-lg px-4 py-2"
                  to="/mortgage-calculator"
                  exact
                  activeClassName=""
                >
                  <span className="flex items-center gap-3">
                    <CiCalculator1 className="" />
                    Mortgage Calculator{" "}
                  </span>
                </NavLink>
                {/* <NavLink
                  className="text-lg px-4 py-2"
                  to="/my-listings"
                  exact
                  activeClassName=""
                >
                  <span className="flex items-center gap-3">
                    <TfiStamp className=" " />
                    Stamp Duty Calculator{" "}
                  </span>
                </NavLink> */}
                <NavLink
                  className="text-lg px-4 py-2"
                  to="/contact-us"
                  exact
                  activeClassName=""
                >
                  <span className="flex items-center gap-3">
                    <MdOutlineContacts className="" />
                    Contact Us{" "}
                  </span>
                </NavLink>
              </nav>
            </div>
          </div>
          <div className=" py-6  ">
            <nav className=" flex flex-col px-3 gap-0 " id="sidebar">
              <NavLink
                className="text-lg px-4 py-2"
                to="/listing/saved"
                exact
                activeClassName=""
              >
                <span className="flex items-center gap-3">
                  <CiBookmark className="text-normal " />
                  Saved listings
                </span>
              </NavLink>
              <NavLink
                className="text-lg px-4 py-2"
                to="/create-listing"
                exact
                activeClassName=""
              >
                <span className="flex items-center gap-3">
                  <IoCreateOutline className="text-lg" />
                  Create listing
                </span>
              </NavLink>
              <NavLink
                className="text-lg px-4 py-2"
                to="/my-listings"
                exact
                activeClassName=""
              >
                <span className="flex items-center gap-3">
                  <CiBoxList className="text-lg" />
                  My listings
                </span>
              </NavLink>
              {currentUser && currentUser.role === "admin" ? (
                <NavLink
                  className="text-lg px-4 py-2"
                  to="/listing/requests"
                  exact
                  activeClassName=""
                >
                  <span className="flex items-center gap-3">
                    <MdManageSearch className="text-lg" />
                    Manage listings
                  </span>
                </NavLink>
              ) : (
                ""
              )}
            </nav>
          </div>
        </div>
        <div>
          <nav className=" flex flex-col px-3 gap-0 " id="sidebar">
            <NavLink
              className="text-lg px-4 py-2"
              to="/settings"
              exact
              activeClassName=""
            >
              <span className="flex items-center gap-3">
                <CiSettings className=" text-lg" />
                Settings
              </span>
            </NavLink>
            <NavLink
              className="text-lg px-4 py-2"
              to="/sign-out"
              exact
              activeClassName=""
            >
              <span className="flex items-center gap-3">
                <IoIosLogOut className="" />
                Sing Out
              </span>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
