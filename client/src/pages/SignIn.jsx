import React from "react";
import SingInFrom from "../components/Singin";

export default function SignIn() {
  return (
    <>
      <div className="md:flex block h-screen">
        <div className="md:block hidden w-3/5">
          <img
            className="w-full h-full"
            src="https://res.cloudinary.com/db1i46uiv/image/upload/v1700424496/pexels-brett-sayles-5087167_gidecw.jpg"
            alt=""
          />
        </div>
        <div className="md:w-2/5 w-full	">
          <SingInFrom />
        </div>
      </div>
    </>
  );
}
