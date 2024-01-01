import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImCross } from "react-icons/im";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
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
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
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
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <Header />
      <main className="md:py-10 md:px-40 p-6  w-full">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-12 flex-1">
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <h2 className="text-xl pb-1 font-semibold">
                  Basic information
                </h2>
                <p className="text-base opacity-80 ">
                  Basic information like name address etc..
                </p>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm">
                    Property Details
                  </label>
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
                  <input
                    type="text"
                    placeholder="e.g Dudley Road, Finchley, London N3"
                    className="outline outline-1 rounded p-3"
                    id="name"
                    maxLength="62"
                    minLength="10"
                    required
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm"> Post Code</label>
                  <input
                    type="text"
                    placeholder="e.g KA5 0BW"
                    className="outline outline-1 rounded p-3"
                 
                    id="postcode"
                    required
                    onChange={handleChange}
                    value={formData.postcode}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm">Email</label>
                  <input
                    type="text"
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
            </div>
            <div  className="flex flex-col gap-4 flex-1">
              <div>
                <h2 className="text-xl pb-1 font-semibold">Property Type</h2>
                <p className="text-base opacity-80 ">
                  Property type like type pricr etc..
                </p>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">
                      {" "}
                      Property Type:
                    </label>
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
            </div>
            <div  className="flex flex-col gap-4 flex-1">
              <div className="">
                <h2 className="text-xl pb-1 font-semibold">
                  Description and images
                </h2>
                <p className="text-base opacity-80 ">
                  Property Description and images..
                </p>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
                <div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">Description </label>
                    <div>
                      <CKEditor
                        className="h-10"
                        editor={ClassicEditor}
                        data={formData.description}
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
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="">
                <h2 className="text-xl pb-1 font-semibold">
                  Additional information
                </h2>
                <p className="text-base opacity-80 ">
                  Additional informations like Ground Rent Council Tax etc..
                </p>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
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
            </div>
            <div className="flex justify-end ">
            <button
              disabled={loading || uploading}
              className="p-3 w-full md:w-1/4  bg-lightblue text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Updating..." : "Update listing"}
            </button>
            </div>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    </>
  );
}
