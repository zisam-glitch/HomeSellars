import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "./OAuth";
import FBOAuth from "./FBOAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='w-full h-screen md:p-20 px-6 py-10 grid items-center'>
      <Link to='/'>
        <h1 className='font-bold text-2xl  flex flex-wrap'>
          <span className='text-darkblue'>Home</span>
          <span className='text-lightblue'>Sellars</span>
        </h1>
      </Link>
      <h1 className='text-2xl  font-semibold my-7'>
        Sign in to list <br /> properties and much <br />
        more
      </h1>
      <div className='flex gap-2 mb-7'>
        <p>No account?</p>
        <Link to={"/sign-up"}>
          <span className='font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue'>
            Register
          </span>
        </Link>
      </div>
      <div className='flex gap-7'>
        <OAuth />
        <FBOAuth />
      </div>

      <div class='flex items-center mb-7 mt-8'>
        <div class='grow border-b border-teal-500'></div>
        <span class=' text-sm shrink px-1 pb-1 text-teal-500'>
          or sign in with your email
        </span>
        <div class='grow border-b border-teal-500'></div>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div>
          <p className='pb-1 font-medium text-base'>Email address</p>
          <input
            type='email'
            className='w-full outline outline-1 focus:outline-lightblue rounded p-3'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <p className='pb-1 font-medium text-base'>Password</p>
          <input
            type='password'
            className='w-full outline outline-1 focus:outline-lightblue rounded p-3'
            id='password'
            onChange={handleChange}
          />
        </div>

        <div class='flex'>
          <div class='flex items-center h-5'>
            <input
              id='helper-checkbox'
              aria-describedby='helper-checkbox-text'
              type='checkbox'
              value=''
              class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
          </div>
          <div class='ms-2 text-sm'>
            <label
              for='helper-checkbox'
              class='font-medium text-gray-900 dark:text-gray-300'
            >
              Keep me signed in for 7 days
            </label>
          </div>
        </div>

        <button
          disabled={loading}
          className='flex justify-center font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue'
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className='text-center text-sm mt-7'>
        <span>By signing in you accept our {""}</span>
        <br />
        <Link to={"/sign-up"}>
          <span className='font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue'>
            Terms of Use
          </span>
        </Link>
        <span>
          {""} and {""}
        </span>
        <Link to={"/sign-up"}>
          <span className='font-medium underline underline-offset-4 hover:decoration-2	decoration-lightblue'>
            Privacy Policy.
          </span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
