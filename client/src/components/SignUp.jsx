import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
import FBOAuth from "./FBOAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="w-full h-screen md:p-20 px-6 py-10 grid items-center">
      <Link to="/">
        <h1 className="font-bold text-2xl  flex flex-wrap">
          <span className="text-darkblue">Home</span>
          <span className="text-lightblue">Sellars</span>
        </h1>
      </Link>
      <h1 className="text-2xl  font-semibold my-7">
        Register to list <br /> properties and much <br />
        more
      </h1>
      <div className="flex gap-2 mb-7">
        <p>Already registered?</p>
        <Link to={"/sign-in"}>
          <span className="font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue">
            Sign in
          </span>
        </Link>
      </div>
      <div className="flex gap-7">
        <OAuth />
        <FBOAuth />
      </div>

      <div class="flex items-center mb-7 mt-8">
        <div class="grow border-b border-teal-500"></div>
        <span class=" text-sm shrink px-1 pb-1 text-teal-500">
        or continue with your email
        </span>
        <div class="grow border-b border-teal-500"></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
          <p className="pb-1 font-medium text-base">Username </p>
        <input
          type="text"
          className="w-full outline outline-1 focus:outline-lightblue rounded p-3"
          id="username"
          onChange={handleChange}
        />
        </div>
        <div>
          <p className="pb-1 font-medium text-base">Email address </p>
        <input
          type="email"
          className="w-full outline outline-1 focus:outline-lightblue rounded p-3"
          id="email"
          onChange={handleChange}
        />
         </div>
         <div>
          <p className="pb-1 font-medium text-base">Password </p>
        <input
          type="password"

          className="w-full outline outline-1 focus:outline-lightblue rounded p-3"
          id="password"
          onChange={handleChange}
        />
         </div>

        <button
          disabled={loading}
          className="flex justify-center font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

      </form>
      <div className="text-center text-sm mt-7">
        <span>By signing in you accept our {""}</span>
        <br />
        <Link to={"/sign-up"}>
          <span className="font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue">
            Terms of Use
          </span>
        </Link>
        <span>
          {""} and {""}
        </span>
        <Link to={"/sign-up"}>
          <span className="font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue">
            Privacy Policy.
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
