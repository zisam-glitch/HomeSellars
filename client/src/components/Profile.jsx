import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

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
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      dispatch(deleteUserFailure(data.message));
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
  return (
    <>
      {" "}
      <div className="pt-8 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />

          <div
            className="flex items-center px-4 py-2 border-2"
            onClick={() => fileRef.current.click()}
          >
            <div className="w-[20%]">
              <img
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className=" h-20 w-[20 object-cover cursor-pointer"
              />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-center justify-center">
              <p className="border-[3px] cursor-pointer py-1 px-4 hover:border-lightblue rounded-lg">
                Upload new image
              </p>
            </div>
          </div>

          {fileUploadError ? (
            <p className="text-sm self-center">
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            </p>
          ) : filePerc > 0 && filePerc < 100 ? (
            <p className="text-sm self-center">
              <span className="text-slate-700">
                {" "}
                {`Uploading ${filePerc}%`}{" "}
              </span>
            </p>
          ) : filePerc === 100 ? (
            <p className="text-sm self-center">
              <span className="text-green-700">
                Image successfully uploaded!
              </span>{" "}
            </p>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Username</label>
            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser.username}
              id="username"
              className="outline outline-1 rounded p-3"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Email</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              defaultValue={currentUser.email}
              className="outline outline-1 rounded p-3"
              onChange={handleChange}
            />
          </div>
          {/* <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
          /> */}
          <div className="flex justify-end">
          
            <button
              disabled={loading}
              className="bg-lightblue md:w-1/2 w-full  text-white rounded-lg p-3  hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
      </div>
    </>
  );
}
