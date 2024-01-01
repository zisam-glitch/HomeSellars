import React from "react";
import Header from "../components/Header";
import  Sidebar  from "../components/sidebar";


const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <Header />
      <div className="flex">
      <Sidebar/>
      <div className=" bg-footer scrolly w-[80%]">
        My Account
      </div>
      </div>
    </>
  );
};

export default Tabs;
