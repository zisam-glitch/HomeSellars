import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImCross } from "react-icons/im";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const API_KEY = "65722a1bee0a40b3844c6cfa8dd8b4b4"; // Replace with your OpenCage API key
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setFormData({
      ...formData,
      name: input, // Update name in formData
    });

    // Fetch suggestions for the name field from OpenCage API
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${input}&countrycode=GB&key=${API_KEY}`
      );
      const data = await response.json();

      // Extract name suggestions from the API response
      const names = data.results.map((result) => result.formatted);
      setNameSuggestions(names);
    } catch (error) {
      console.error("Error fetching name suggestions:", error);
      setNameSuggestions([]);
    }
  };

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    ownerName: "",
    description: "",
    remainingOnLease: "",
    postcode: "",
    groundRent: "",
    councilTax: "",
    serviceCharge: "",
    tenure: "",
    address: "",
    email: "",
    phone: "",
    type: "rent",
    bedrooms: 2,
    reception: 1,
    bathrooms: 1,
    regularPrice: 150000,
    discountPrice: 0,
    offer: true,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    // Validate the form and update the disabled status accordingly
    const validateForm = () => {
      try {
        if (currentStep === 1) {
          // Basic information validation
          setIsNextButtonDisabled(
            !formData.name ||
              !formData.ownerName ||
              !formData.address ||
              !formData.postcode ||
              !formData.email ||
              !formData.phone
          );
        } else if (currentStep === 2) {
          // Additional details validation
          setIsNextButtonDisabled(
            !formData.bedrooms ||
              !formData.reception ||
              !formData.bathrooms ||
              !formData.regularPrice ||
              +formData.discountPrice > +formData.regularPrice
          );
        } else if (currentStep === 3) {
          // Description and images validation
          setIsNextButtonDisabled(
            !formData.description || formData.imageUrls.length < 1
          );
        } else if (currentStep === 4) {
          // Lease details validation
          setIsNextButtonDisabled(
            !formData.remainingOnLease ||
              !formData.groundRent ||
              !formData.councilTax ||
              !formData.serviceCharge ||
              !formData.tenure
          );
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    validateForm();
  }, [currentStep, formData]);

  const handleNextStep = () => {
    try {
      if (isNextButtonDisabled) {
        // Button is disabled, do not proceed
        return;
      }

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error(error.message);
      // Handle the error, you can display it to the user or handle it as needed
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleImageSubmit = async () => {
    try {
      const filesArray = Array.from(files);

      if (
        filesArray.length > 0 &&
        filesArray.length + formData.imageUrls.length < 21
      ) {
        setUploading(true);
        setImageUploadError("");

        const promises = filesArray.map((file) => {
          if (file.size <= 2 * 1024 * 1024) {
            return storeImage(file);
          } else {
            throw new Error(
              "Image size exceeds the limit (2 MB max per image)"
            );
          }
        });

        const urls = await Promise.all(promises);

        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });

        setUploading(false);
      } else {
        setImageUploadError("You can only upload up to 6 images per listing");
      }
    } catch (error) {
      console.error(error);
      setImageUploadError(error.message);
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (type === "checkbox") {
      if (id === "sale" || id === "rent") {
        setFormData({
          ...formData,
          type: value,
        });
      } else {
        setFormData({
          ...formData,
          [id]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
        return;
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discount price must be lower than regular price");
        return;
      }

      setLoading(true);
      setError("");

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/listing/${data._id}`);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the listing");
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div>
              <h2 className="text-xl pb-1 font-semibold">Basic information</h2>
              <p className="text-base opacity-80 ">
                Basic information like name address etc..
              </p>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Property Details</label>
                <input
                  type="text"
                  placeholder="e.g 2 bed flat for sale"
                  className="outline outline-1 rounded p-3"
                  id="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />{" "}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Owner Full Name</label>
                <input
                  type="text"
                  placeholder="e.g Jamie Berry"
                  className="outline outline-1 rounded p-3"
                  id="ownerName"
                  required
                  onChange={handleChange}
                  value={formData.ownerName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm"> Full Address</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="e.g Ox, 1 Oxford Street, Belfast, BT1 3LA, United Kingdom"
                    className="outline outline-1 w-full rounded p-3"
                    id="name"
                    maxLength="62"
                    minLength="2"
                    required
                    onChange={handleInputChange}
                    value={formData.name}
                    list="nameSuggestions"
                  />
                  {nameSuggestions.length > 0 && (
                    <div className="suggestions-container absolute bg-white border border-outline shadow-md rounded w-full mt-1">
                      <ul className="suggestions-list">
                        {nameSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                name: suggestion,
                              });
                              setNameSuggestions([]); // Clear suggestions after selecting
                            }}
                            className="suggestion-item p-3 hover:bg-purple cursor-pointer"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm"> Post Code</label>
                <input
                  type="text"
                  placeholder="e.g KA5 0BW"
                  className="outline outline-1 rounded p-3"
                  pattern="^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$"
                  id="postcode"
                  required
                  onChange={handleChange}
                  value={formData.postcode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Email</label>
                <input
                  type="email"
                  placeholder={currentUser.email}
                  className="outline outline-1 rounded p-3"
                  id="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Phone number</label>
                <div className="outline flex outline-1 items-center foc pl-3  rounded ">
                  <span className="w-[8%]">+44</span>
                  <input
                    type="number"
                    placeholder="078 0439 2132"
                    className="outline-0 py-3 w-[92%]"
                    id="phone"
                    required
                    pattern="[0-9]{3}[0-9]{2}[0-9]{3}"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h2 className="text-xl pb-1 font-semibold">Property Type</h2>
              <p className="text-base opacity-80 ">
                Property type like type pricr etc..
              </p>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className=" grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm"> Property Type:</label>
                  <select
                    id="type"
                    className="outline sec outline-1 rounded p-3"
                    onChange={handleChange}
                    value={formData.type}
                  >
                    <option value="sale">Sell</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm"> Beds</label>
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="50"
                    required
                    className="outline outline-1 rounded p-3"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm"> Reception</label>
                  <input
                    type="number"
                    id="reception"
                    min="0"
                    max="50"
                    required
                    className="outline outline-1 rounded p-3"
                    onChange={handleChange}
                    value={formData.reception}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm"> Baths</label>
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="50"
                    required
                    className="outline outline-1 rounded p-3"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm">
                    {" "}
                    Regular price{" "}
                    {formData.type === "rent" && (
                      <span className="text-xs">($ / month)</span>
                    )}
                  </label>
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                </div>
                {formData.offer && (
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">
                      Discounted price{" "}
                      {formData.type === "rent" && (
                        <span className="text-xs">($ / month)</span>
                      )}
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000000"
                      required
                      className="p-3 border border-gray-300 rounded-lg"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                  </div>
                )}
              </div>

              <div className="flex  pt-4 flex-wrap gap-6">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="">
              <h2 className="text-xl pb-1 font-semibold">
                Description and images
              </h2>
              <p className="text-base opacity-80 ">
                Property Description and images..
              </p>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm">Description </label>
                  <div>
                    <CKEditor
                      className="h-10"
                      editor={ClassicEditor}
                      data=""
                      onChange={(event, editor) => {
                        setFormData({
                          ...formData,
                          description: editor.getData(),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm pb-2">
                  Images:
                  <span className="font-normal text-gray-600 ml-2">
                    The first image will be the cover (max 20)
                  </span>
                </p>
                <div className="flex gap-4">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className="p-3 border border-gray-300 rounded w-full"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
                <p className="text-red-700 text-sm">
                  {imageUploadError && imageUploadError}
                </p>
                <div className="grid gap-3 p-2 grid-cols-4">
                  {formData.imageUrls.length > 0 &&
                    formData.imageUrls.map((url, index) => (
                      <div key={url} className="relative w-full">
                        <div className="relative w-full h-[70px] group">
                          <img
                            src={url}
                            alt="listing image"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black h-full opacity-0 group-hover:opacity-50 transition-opacity">
                            {/* Add any overlay content here */}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 p-2 font-extrabold text-white rounded-lg uppercase hover:opacity-75"
                          >
                            <ImCross />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="">
              <h2 className="text-xl pb-1 font-semibold">
                Additional information
              </h2>
              <p className="text-base opacity-80 ">
                Additional informations like Ground Rent Council Tax etc..
              </p>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">
                  Time remaining on lease
                </label>
                <input
                  type="text"
                  placeholder="e.g 20 years"
                  className="outline outline-1 rounded p-3"
                  id="remainingOnLease"
                  required
                  onChange={handleChange}
                  value={formData.remainingOnLease}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Ground Rent</label>
                <input
                  type="text"
                  placeholder="e.g £90000 "
                  className="outline outline-1 rounded p-3"
                  id="groundRent"
                  required
                  onChange={handleChange}
                  value={formData.groundRent}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Council Tax</label>
                <input
                  type="text"
                  placeholder="e.g C"
                  className="outline outline-1 rounded p-3"
                  id="councilTax"
                  required
                  onChange={handleChange}
                  value={formData.councilTax}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Service Charge</label>
                <input
                  type="text"
                  placeholder="e.g £700"
                  className="outline outline-1 rounded p-3"
                  id="serviceCharge"
                  required
                  onChange={handleChange}
                  value={formData.serviceCharge}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Tenure</label>
                <input
                  type="text"
                  placeholder="e.g Leasehold"
                  className="outline outline-1 rounded p-3"
                  id="tenure"
                  required
                  onChange={handleChange}
                  value={formData.tenure}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="p-3 w-[130px] bg-lightblue text-white rounded-lg  hover:opacity-95"
          >
            Previous
          </button>
        )}
        {currentStep < 4 && (
          <button
            type="button"
            onClick={handleNextStep}
            className={`py-3 w-[130px] bg-lightblue -z-10 text-white rounded-lg  hover:opacity-95 ${
              isNextButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
            }`}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        )}
        {currentStep === 4 && (
          <button
            type="submit"
            disabled={loading || uploading}
            className={`p-3 w-[130px] bg-lightblue text-white rounded-lg  hover:opacity-95 disabled:opacity-80 ${
              loading || uploading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <main className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {renderStepContent()}
          {renderNavigationButtons()}
        </form>
      </main>
    </>
  );
}
