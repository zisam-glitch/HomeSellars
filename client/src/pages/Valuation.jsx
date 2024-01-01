import React from "react";
import Header from "../components/Header";
import AgentValueation from "../components/AgentValueation"    
export default function Valuation() {
  return (
    <>
      <Header />
      <div className=" m-8 rounded-2xl bg-grays bg-center bg-cover bg-no-repeat ">
        <div className="rounded-2xl  flex flex-col gap-4 max-w-full mx-auto">
          <div className="flex">
            <div className="w-1/2 p-12">
              <h1 className="text-4xl font-semibold">Get a free valuation</h1>
              <p className="pt-4 pb-2">
                Get the most accurate valuation from local agents based on:
              </p>
              <ul className="flex flex-col gap-1 ">
                <li>
                  <b className="tracking-widest">•</b>Your unique property
                  features
                </li>
                <li>
                  <b className="tracking-widest">•</b>Their in-depth knowledge
                  of the area
                </li>
                <li>
                  <b className="tracking-widest">•</b>The latest changes in the
                  local market
                </li>
              </ul>
            </div>
            <div className="w-1/2 rounded-r-2xl bg-center bg-cover bg-no-repeat bg-[url('https://cdn.prod.zoopla.co.uk/_next/static/images/hero-800-b00fca870a06a690a104f07349cdc660.jpg')]"></div>
          </div>
        </div>
      </div>
      <div className="pt-12">
      <AgentValueation />
      </div>
    </>
  );
}
