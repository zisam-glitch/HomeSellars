import React from "react";
import Sidebar from "../components/side-Bar";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import ProfilePassword from "../components/ProfilePassword";
import AccountHeader from "../components/AccountHeader";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
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
  return (
    <div className="flex md:bg-footer bg-white">
      <Sidebar />
      <div className="md:w-[78%] w-full h-screen">
        <div className="md:hidden block bg-footer">
          <AccountHeader />
        </div>
        <header className="bg-white hidden md:block py-3 px-10">
          <form onSubmit={handleSubmit} className="flex  ">
            <input
              type="text"
              required
              placeholder="Search.."
              className="bg-footer w-1/2 noout py-2 px-4 rounded-s-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-footer pr-4 flex items-center rounded-e-lg">
              <span className="">
                <IoSearchOutline className=" text-lg" />
              </span>
            </button>
          </form>
        </header>
        <div className="md:p-10 p-6">
          {" "}
          <div className="flex gap-1 flex-col pb-10">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-lg">
              Control your profile setup and interrogations
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full 	">
              <ul
                className="flex justify-start mb-0 gap-2 list-none flex-wrap flex-row"
                role="tablist"
              >
                <li className="-mb-px flex text-center">
                  <a
                    className={
                      "  px-3 py-3 block leading-normal border-lightblue :bg-slate-100 :border-b-[2px]" +
                      (openTab === 1
                        ? "text-black font-semibold border-b-[2px]"
                        : " text-slate-700 font-medium")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Profile
                  </a>
                </li>
                <li className="-mb-px  flex text-center">
                  <a
                    className={
                      "  px-3 py-3 block leading-normal border-lightblue :bg-slate-100 :border-b-[2px]" +
                      (openTab === 2
                        ? "text-black font-semibold border-b-[2px]"
                        : " text-slate-700 font-medium")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Email preferences
                  </a>
                </li>
                <li className="-mb-px  flex  text-center">
                  <a
                    className={
                      "  px-3 py-3 block leading-normal border-lightblue :bg-slate-100 :border-b-[2px]" +
                      (openTab === 3
                        ? "text-black font-semibold border-b-[2px]"
                        : " text-slate-700 font-medium")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    Interrogations
                  </a>
                </li>
              </ul>
              <hr />
              <div className="relative flex flex-col min-w-0 break-words w-full mb-2 ">
                <div className="flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <div className="py-5 flex flex-col md:flex-row gap-10 ">
                        <div className="md:w-1/2 w-full bg-white border-2 rounded-xl">
                          <div className="md:p-5 p-3">
                            <h1 className="text-xl pb-1 font-semibold">
                              Profile Settings
                            </h1>
                            <p className="text-base opacity-80 ">
                              Those are your personal details, they arn't
                              visible to public
                            </p>
                            <Profile />
                          </div>
                        </div>
                        <div className="md:w-1/2 w-full bg-white border-2 rounded-xl">
                          <div className="md:p-5 p-3">
                            <h1 className="text-xl pb-1 font-semibold">
                              Update Password
                            </h1>
                            <p className="text-base opacity-80 ">
                              Enter a new password tom make update
                            </p>
                            <ProfilePassword />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <div className="py-5 flex gap-10 ">
                        <div className="w-full bg-white border-2 rounded-xl">
                          <div className="p-5">
                            <h1 className="text-xl pb-1 font-semibold">
                              Email preferences
                            </h1>
                            <p className="text-base opacity-80 ">
                              There is nothing available at this moment
                            </p>
                            {/* <Profile /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link3"
                    >
                      {" "}
                      <div className="py-5 flex gap-10 ">
                        <div className="w-full bg-white border-2 rounded-xl">
                          <div className="p-5">
                            <h1 className="text-xl pb-1 font-semibold">
                              Interrogations
                            </h1>
                            <p className="text-base opacity-80 ">
                              There is nothing available at this moment
                            </p>
                            {/* <Profile /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
