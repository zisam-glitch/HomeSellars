import React from "react";
import Sidebar from "../components/side-Bar";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateListing from "../components/CreateListing";
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
          <div className="flex gap-1 flex-col pb-4">
            <h1 className="text-3xl font-semibold">List your Property</h1>
            <p className="text-lg">List your Properties with demiselers </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full 	">
              <ul
                className="flex justify-start mb-0 gap-2 list-none flex-wrap flex-row"
                role="tablist"
              ></ul>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-2 ">
                <div className="flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <div className="py-5 flex gap-10 ">
                        <div className="w-full bg-white border-2 rounded-xl">
                          <div className="md:p-5 p-3">
                            <CreateListing />
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
