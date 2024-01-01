import React from "react";
import ForRent from "./ForRent";
import ForSale from "./ForSale";
import HousePrices from "./HousePrices";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="md:w-3/5	mx-auto w-full bg-white rounded-xl	">
          <ul
            className="flex justify-center mb-0 list-none flex-wrap flex-row"
            role="tablist"
          >
            <li className="-mb-px flex text-center">
              <a
                className={
                  "  px-5 py-3 block leading-normal border-lightblue hover:bg-slate-100 hover:border-b-[2px]" +
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
                For sale
              </a>
            </li>
            <li className="-mb-px  flex text-center">
              <a
                className={
                  "  px-5 py-3 block leading-normal border-lightblue hover:bg-slate-100 hover:border-b-[2px]" +
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
                To rent
              </a>
            </li>
            <li className="-mb-px  flex  text-center">
              <a
                className={
                  "  px-5 py-3 block leading-normal border-lightblue hover:bg-slate-100 hover:border-b-[2px]" +
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
                House prices
              </a>
            </li>
          </ul>
          <hr />
          <div className="relative flex flex-col min-w-0 break-words w-full mb-2 ">
            <div className="px-6 md:px-5 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <ForSale />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <ForRent />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <HousePrices />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
