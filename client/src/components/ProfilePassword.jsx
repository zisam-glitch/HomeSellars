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
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "", // Added confirm password field
  });
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

    if (formData.password !== formData.confirmPassword) {
      // Display an error message or handle the mismatch appropriately
      console.error("Passwords do not match");
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

  // ... (rest of the code)

  const isUpdateButtonDisabled =
    formData.password !== formData.confirmPassword;

  return (
    <>
      <div className="pt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              id="password"
              className="outline outline-1 rounded p-3"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
              id="confirmPassword"
              className="outline outline-1 rounded p-3"
            />
          </div>
          <div className="flex md:justify-end w-full">
            <button
              disabled={loading || isUpdateButtonDisabled}
              className="bg-lightblue md:w-1/2 w-full text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Update Password"}
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
