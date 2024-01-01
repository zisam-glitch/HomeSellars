import React from "react";
import Sidebar from "../components/side-Bar";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SingOut from "../components/SingOut";
import DelateAccount from "../components/DelateAccount";
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
                    Sing out
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
                    Delete account
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
                      <div className="py-5 flex gap-10 ">
                        <div className="w-full bg-white border-2 rounded-xl">
                          <div className="md:p-5 p-3 flex flex-col gap-2">
                            <h1 className="text-xl pb-1 font-semibold">
                              Sing Out
                            </h1>
                            <p className="text-base opacity-80 ">
                              Thank you for using our platform! Before you sign
                              out, here are a few things to consider:
                            </p>
                            <ul className="text-base opacity-80 flex flex-col gap-2 pb-2">
                              <li>
                                <strong>Double-Check Your Work:</strong> Ensure
                                that you have saved any unsaved changes or
                                completed any necessary tasks before signing
                                out.
                              </li>
                              <li>
                                <strong>Privacy Check:</strong> If you're using
                                a shared device, make sure to log out to protect
                                your account's privacy.
                              </li>
                              <li>
                                <strong>Stay Updated:</strong> Check for any
                                important announcements, updates, or new
                                features we might have released. Stay in the
                                loop for an enhanced user experience.
                              </li>
                              <li>
                                <strong>Feedback Matters:</strong> We value your
                                feedback. If you have a moment,{" "}
                                <a href="#">
                                  let us know about your experience
                                </a>
                                . Your insights help us improve our platform.
                              </li>
                              <li>
                                <strong>Connect with Us:</strong> Follow us on{" "}
                                <a href="#" target="_blank">
                                  social media
                                </a>{" "}
                                or subscribe to our{" "}
                                <a href="#" target="_blank">
                                  newsletter
                                </a>{" "}
                                to stay connected. Be the first to know about
                                promotions, tips.
                              </li>
                            </ul>
                            <div className="flex md:flex-row flex-col gap-2">
                              <p className="text-base opacity-80 ">
                              Remember, we appreciate your trust in us. Have a great day!
                              </p>
                              <SingOut />
                            </div>
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
                          <div className="md:p-5 p-3">
                            <h1 className="text-xl pb-1 font-semibold">
                              Delete Account
                            </h1>
                            <div className="flex md:flex-row flex-col gap-2">
                              <p className="text-base opacity-80 ">
                                The User will purmanently delated
                              </p>
                              <DelateAccount />
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
    </div>
  );
};

export default Tabs;
