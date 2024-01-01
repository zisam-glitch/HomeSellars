import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { IoCreateOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";



export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-[20%] bg-footer hidden md:flex flex-col rounded-xl h-[calc(100vh-252px)] ">
      <div className="rounded-xl h-[30%] mb-6 shadow-xl bg-white flex flex-col gap-4 p-14 justify-center items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={currentUser.avatar}
          alt=""
        />
        <h4 className="text-xl font-semibold capitalize">
          {currentUser.username}
        </h4>
      </div>
      <nav
        className="bg-white h-[70%] flex flex-col rounded-xl justify-center gap-0 py-8 shadow-xl "
        id="sidebar"
      >
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/my-account"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <VscAccount className="text-2xl" />
            Profile
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/listing/saved"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <MdBookmarkBorder className="text-2xl" />
            Saved listings
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/create-listing"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <IoCreateOutline className="text-2xl" />
            Create listing
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/my-listings"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <IoHomeOutline className="text-2xl" />
            My listings
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/edit-username"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <RxPencil1 className="text-2xl" />
            Edit Username
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/edit-email"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <RxPencil1 className="text-2xl" />
            Edit Email
          </span>
        </NavLink>
        <NavLink
          className="text-[20px] px-6 py-5 font-semibold"
          to="/sing-out"
          exact
          activeClassName="text-blue-500 border-r-4 border-blue-500"
        >
          <span className="flex items-center gap-3">
            <LuLogOut className="text-2xl" />
            Sign Out
          </span>
        </NavLink>
      </nav>
    </div>
  );
}
