import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { FaEdit } from "react-icons/fa";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    confirmPassword: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [editPassword, setEditPassword] = useState(false); // Added state for editPassword
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
  };

  return (
    <>
      <div className="md:p-20 p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-start"
        >
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-semibold my-7">Profile</h1>

            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-20 w-20 object-cover cursor-pointer mt-2"
            />
          </div>
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="flex flex-col w-full">
            <div className="flex justify-between pb-4">
              <p className="text-lg">
                <b>Username :{""}</b> {""}
                {currentUser.username}
              </p>
              <Link to="/edit-username">
                <p className="text-lg text-lightblue hover:underline decoration-lightblue">
                  Eidt
                </p>
              </Link>
            </div>
            <div className="flex justify-between pb-4">
              <p className="text-lg">
                <b>Email :{""}</b> {""}
                {currentUser.email}
              </p>
              <Link to="/edit-email">
                <p className="text-lg text-lightblue hover:underline decoration-lightblue">
                  Eidt
                </p>
              </Link>
            </div>
            <div className="flex justify-between pb-4">
              <p className="text-lg">
                <b>Paddword :{""}</b> xxxxxxxx {""}
                
              </p>
              <Link>
                <p
                  onClick={handleEditPassword}
                  className="text-lg text-lightblue hover:underline decoration-lightblue"
                >
                  {editPassword ? "Cancel " : "Edit "}
                </p>
              </Link>
            </div>
          </div>

         
          <div className="grid grid-cols-2 w-full gap-6">
          
            {editPassword && (
              <>
                <div className="flex flex-col gap-3">
                  <label className="font-medium text-base">Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                    id="password"
                    className="outline outline-1 rounded p-3"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-medium text-base">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    onChange={handleConfirmPasswordChange}
                    id="confirmPassword"
                    className="outline outline-1 rounded p-3"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    disabled={loading}
                    className="bg-lightblue text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                  >
                    {loading ? "Loading..." : "Update"}
                  </button>
                </div>
              </>
            )}
          </div>

          {passwordMismatchError && (
            <p className="text-red-700">Passwords do not match.</p>
          )}
        </form>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
      </div>
    </>
  );
}
