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
import Footer from "../components/Footer";
import Header from "../components/Header";

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

  useEffect(() => {
    // Call handleShowListings when the component mounts
    handleShowListings();

    // Check if there's an uploaded file and initiate file upload
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  console.log("Loading:", loading);

  if (loading) {
    // Render a loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header />
      <div className="p-20">
        <p className="text-red-700 mt-5">
          {showListingsError ? "Error showing listings" : ""}
        </p>

        {userListings && userListings.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Update Listings</h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className=" shadow-sm rounded-lg px-3 py-5 flex justify-between items-center gap-8"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-28 w-40 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold   truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <div className="flex gap-2">
                    <p className="text-lg font-semibold pb-2 hover:underline capitalize">
                      {listing.address}
                    </p>
                    <div>
                      {!listing.approved ? (
                        <p className="text-lg font-semibold text-lighttext ">
                          (Pending)
                        </p>
                      ) : (
                        <p className="text-lg font-semibold text-lightblue">
                          (Approved)
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="pb-2 capitalize">{listing.name}</p>
                  <p className="text-base pr-12 mb-2 text-gray-600 line-clamp-1">
                    <div
                      dangerouslySetInnerHTML={{ __html: listing.description }}
                    />
                  </p>
                </Link>

                <div className="flex flex-col item-center">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-lightblue uppercase pb-2">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg justify-center items-center font-semibold flex flex-col">
            You have no listings. <Link className="text-lightblue" to="/create-listing">Create one now!</Link>
          </p>
        )}
      </div>
      <Footer/>
    </>
  );
}
