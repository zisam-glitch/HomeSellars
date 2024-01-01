import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import UserName from '../components/EditListingUsername'

const Tabs = () => {

  return (
    <>
      <Header />
      <div className="px-20 py-20  bg-footer">
        <div className="flex gap-[5%]">
          <Sidebar />
          <div className="shadow-lg rounded-xl bg-white scrolly w-[75%]">
            <UserName />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
