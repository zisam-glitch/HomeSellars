import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Header from "../components/Header";
import StampDutyCalculator from "../components/StampDutyCalculator";
import HeartIcon from "../components/HeartIcon";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { PiArmchairLight } from "react-icons/pi";
import { PiLampLight } from "react-icons/pi";
import { LiaParkingSolid } from "react-icons/lia";
import Footer from "../components/Footer";
import { GoMail } from "react-icons/go";
import { MdPhone } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TbUpload } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SimilarListings from "../components/SimilarListings";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      getIsSaved(params.listingId);
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const getIsSaved = async (listingId) => {
    try {
      const res = await fetch(`/api/user/get-saved-list/${listingId}`);
      const data = await res.json();
      if (data.success === false) return setIsSaved(false);

      setIsSaved(true);
    } catch (error) {
      console.log(error);
      setIsSaved(false);
    }
  };

  const [loanAmount, setLoanAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.5);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  useEffect(() => {
    const calculatedDeposit = loanAmount * 0.1;
    setDepositAmount(calculatedDeposit.toFixed(2));
  }, [loanAmount]);

  useEffect(() => {
    // Mortgage Calculation Formula (simplified for illustration purposes)
    if (loanAmount && loanTerm && interestRate) {
      const monthlyInterestRate = interestRate / 100 / 12;
      const totalPayments = loanTerm * 12;
      const denominator = Math.pow(1 + monthlyInterestRate, totalPayments);
      const monthlyPaymentValue =
        (loanAmount * monthlyInterestRate * denominator) / (denominator - 1);
      setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  }, [loanAmount, loanTerm, interestRate]);

  useEffect(() => {
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    // Update loanAmount when listing.regularPrice or listing.discountPrice changes
    if (
      listing &&
      listing.regularPrice !== undefined &&
      listing.discountPrice !== undefined
    ) {
      const combinedPrice =
        listing.discountPrice > 0
          ? listing.discountPrice
          : listing.regularPrice;
      setLoanAmount(String(combinedPrice));
    }
  }, [listing && listing.regularPrice, listing && listing.discountPrice]); // Add checks for undefined

  useEffect(() => {
    const calculatedDeposit = loanAmount * 0.1;
    setDepositAmount(calculatedDeposit.toFixed(0)); // Use toFixed(0) to remove the decimal part
  }, [loanAmount]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("type", "rent");
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (listing && listing.name) {
      setSearchTerm(listing.name);
    }
  }, [listing]);

  return (
    <>
      <Header />
      <div className="md:pt-10">
        <main>
          <div className="px-10">
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && (
              <p className="text-center my-7 text-2xl">Something went wrong!</p>
            )}
          </div>
          {listing && !loading && !error && (
            <>
              <div className="md:px-10 px-0">
                <div className="flex px-6 md-px-0 pt-5 pb-4 md:p-0  justify-between items-center">
                  <div className="">
                    <h1 className="md:mb-5 mb-0 md:font-semibold text md:text-[30px]">
                      {listing.name}
                    </h1>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <div
                        className="md:flex hidden text-lg  gap-2 items-center cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 2000);
                        }}
                      >
                        <TbUpload className="text-lg " /> Share
                      </div>
                      {copied && (
                        <p className="fixed top-[20%] right-[7%] z-10 rounded-md bg-slate-100 p-2">
                          Link copied!
                        </p>
                      )}
                    </div>
                    <div>
                      <HeartIcon
                        itemId={params.listingId}
                        isSaved={listing.isSaved}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Swiper navigation>
                    {listing.imageUrls.map((url) => (
                      <SwiperSlide key={url}>
                        <div
                          className="md:h-[550px] h-[350px] md:rounded-xl"
                          style={{
                            background: `url(${url}) center no-repeat`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex md:flex-row flex-col my-6 md:my-10 gap-[2%]">
                    <div className="w-full md:w-[68%] md:px-0 px-6">
                      <div>
                        <div className="">
                          <div className="pb-1 md:hidden block">
                            <p className="text-lg font-semibold text-lightblue underline">
                              {listing.type === "rent"
                                ? "For Rent"
                                : "For Sale"}
                            </p>
                            <h2 className="text-[26px] font-semibold ">
                              £
                              {listing.offer
                                ? listing.discountPrice.toLocaleString("en-GB")
                                : listing.regularPrice.toLocaleString("en-GB")}
                              {listing.type === "rent" && " / month"}
                            </h2>
                          </div>
                          <div className="pb-3 md:hidden block">
                            <a
                              className=" font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                              href="#mortgage"
                            >
                              See how much I could borrow
                            </a>
                          </div>
                          <h1 className="md:text-3xl text-xl font-semibold ">
                            {listing.address}
                          </h1>
                          <p className="md:py-3 py-1 pb-4 text-lg">
                            {" "}
                            {listing.bedrooms > 1
                              ? `${listing.bedrooms} bedrooms `
                              : `${listing.bedrooms} bedroom `}{" "}
                            {""}{" "}
                            {listing.furnished ? "Furnished" : "Unfurnished"}{" "}
                            {""}
                            {listing.parking
                              ? "with Parking spot"
                              : "without Parking spot"}
                          </p>
                          <ul className="text-green-900 font text-lg flex flex-wrap  items-center gap-4 sm:gap-6">
                            <li className="flex items-center gap-2 whitespace-nowrap ">
                              <IoBedOutline className="text-xl" />
                              {listing.bedrooms > 1
                                ? `${listing.bedrooms} beds `
                                : `${listing.bedrooms} bed `}
                            </li>
                            <li className="flex items-center gap-2 whitespace-nowrap ">
                              <PiBathtubLight className="text-xl" />
                              {listing.bathrooms > 1
                                ? `${listing.bathrooms} baths `
                                : `${listing.bathrooms} bath `}
                            </li>

                            {listing.reception > 0 ? (
                              <li className=" flex items-center gap-2 whitespace-nowrap">
                                <PiArmchairLight className="text-xl" />{" "}
                                {listing.reception} reception
                              </li>
                            ) : (
                              ` `
                            )}

                            <li className="flex items-center gap-2 whitespace-nowrap ">
                              <LiaParkingSolid className="text-xl" />
                              {listing.parking ? "Parking spot" : "No Parking"}
                            </li>
                            <li className="flex items-center gap-2 whitespace-nowrap ">
                              <PiLampLight className="text-lg" />
                              {listing.furnished ? "Furnished" : "Unfurnished"}
                            </li>
                          </ul>
                        </div>
                        <div className="py-9 grid grid-cols-2  gap-4 ">
                          <div className="">
                            <p className=" font-semibold text-lg">Tenure:</p>
                            <p className="text-lg"> {listing.tenure} </p>
                          </div>
                          <div className="">
                            <p className=" font-semibold text-lg">
                              Council tax band:
                            </p>
                            <p className="text-lg"> {listing.councilTax} </p>
                          </div>
                          <div className=" ">
                            <p className=" font-semibold text-lg">
                              Service charge:
                            </p>
                            <p className="text-lg"> {listing.serviceCharge} </p>
                          </div>
                          <div className=" ">
                            <p className=" font-semibold text-lg">
                              Time remaining on lease:
                            </p>
                            <p className="text-lg">
                              {" "}
                              {listing.remainingOnLease}{" "}
                            </p>
                          </div>
                          <div className=" ">
                            <p className=" font-semibold text-lg">
                              Ground rent:
                            </p>
                            <p className="text-lg"> {listing.groundRent} </p>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="py-9">
                        <h1 className="text-2xl font font-semibold pb-6">
                          Features and description
                        </h1>
                        <div
                          className="descptrion"
                          dangerouslySetInnerHTML={{
                            __html: listing.description,
                          }}
                        />
                      </div>
                      <hr id="mortgage" className=" pb-9" />
                      <div className="cssshadow  rounded-xl font-semibold">
                        <div className="md:p-6 p-3">
                          <h1 className="text-2xl font-semibold pb-4">
                            Mortgage Calculator
                          </h1>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-lg font-semibold">
                                Price:
                              </label>
                              <input
                                type="string"
                                className="w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-3 py-3 outline-border "
                                value={`£${loanAmount}`}
                                onChange={(e) => setLoanAmount(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-lg font-semibold">
                                Deposit (10%):
                              </label>
                              <input
                                type="string"
                                className="w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-3 py-3 outline-border "
                                value={`£${depositAmount}`}
                                onChange={(e) =>
                                  setDepositAmount(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-lg font-semibold">
                                Loan Term:
                              </label>
                              <select
                                value={loanTerm}
                                className="w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-3 py-3 outline-border "
                                onChange={(e) =>
                                  setLoanTerm(Number(e.target.value))
                                }
                              >
                                <option value={1}>1 Years</option>
                                <option value={2}>2 Years</option>
                                <option value={3}>3 Years</option>
                                <option value={4}>4 Years</option>
                                <option value={5}>5 Years</option>
                                <option value={6}>6 Years</option>
                                <option value={7}>7 Years</option>
                                <option value={8}>8 Years</option>
                                <option value={9}>9 Years</option>
                                <option value={10}>10 Years</option>
                                <option value={11}>11 Years</option>
                                <option value={12}>12 Years</option>
                                <option value={13}>13 Years</option>
                                <option value={14}>14 Years</option>
                                <option value={15}>15 Years</option>
                                <option value={16}>16 Years</option>
                                <option value={17}>17 Years</option>
                                <option value={18}>18 Years</option>
                                <option value={19}>19 Years</option>
                                <option value={20}>20 Years</option>
                                <option value={21}>21 Years</option>
                                <option value={22}>22 Years</option>
                                <option value={23}>23 Years</option>
                                <option value={24}>24 Years</option>
                                <option value={25}>25 Years</option>
                                <option value={26}>26 Years</option>
                                <option value={27}>27 Years</option>
                                <option value={28}>28 Years</option>
                                <option value={29}>29 Years</option>
                                <option value={30}>30 Years</option>
                                <option value={31}>31 Years</option>
                                <option value={32}>32 Years</option>
                                <option value={33}>33 Years</option>
                                <option value={34}>34 Years</option>
                                <option value={35}>35 Years</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-lg font-semibold">
                                Interest Rate:
                              </label>
                              <select
                                value={interestRate}
                                className="minimal w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-3 py-3 outline-border "
                                onChange={(e) =>
                                  setInterestRate(Number(e.target.value))
                                }
                              >
                                {" "}
                                <option value={3}>3%</option>
                                <option value={3.5}>3.5%</option>
                                <option value={4}>4%</option>
                                <option value={4.5}>4.5%</option>
                                <option value={5}>5%</option>
                                <option value={5.5}>5.5%</option>
                                <option value={6}>6%</option>
                                <option value={6.5}>6.5%</option>
                                <option value={7}>7%</option>
                                <option value={7.5}>7.5%</option>
                                <option value={8}>8%</option>
                                <option value={8.5}>8.5%</option>
                                <option value={9}>9%</option>
                                <option value={9.5}>9.5%</option>
                                <option value={10}>10%</option>
                                <option value={10.5}>10.5%</option>
                                <option value={11}>11%</option>
                                <option value={11.5}>11.5%</option>
                                <option value={12}>12%</option>
                                <option value={12.5}>12.5%</option>
                                <option value={13}>13%</option>
                                <option value={13.5}>13.5%</option>
                                <option value={14}>14%</option>
                                <option value={14.5}>14.5%</option>
                                <option value={15}>15%</option>
                                {/* Add more interest rate options as needed */}
                              </select>
                            </div>
                          </div>
                          <div className="flex text-3xl items-end font-semibold justify-center gap-1 pt-6 ">
                            {monthlyPayment !== null
                              ? `£${monthlyPayment}`
                              : "Please enter loan details"}
                            <h2 className="text-base font-normal pb-[3px] text-black">
                              per month
                            </h2>
                          </div>
                        </div>
                        <hr />
                        <div className="md:p-6 p-3">
                          <div className="flex justify-between items-center">
                            <Link to="/mortgage-calculator">
                              <button className="flex justify-center text-lg font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
                                How much could I borrow?
                                <FaArrowUpRightFromSquare />
                              </button>
                            </Link>
                            <div className="md:flex gap-1 items-center hidden">
                              <p>Calculator by</p>
                              <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                                <span className="text-darkblue">Demi</span>
                                <span className="text-lightblue">Sellars</span>
                              </h1>
                            </div>
                          </div>
                          <p className="text-sm font-medium leading-[17px] pt-6	 text-black">
                            The calculator results above are only indicative
                            based on a repayment mortgage product. The interest
                            rate has been assumed to stay the same for the
                            selected mortgage term. Repayments will be subject
                            to the product provided and your circumstances. Your
                            home or property may be repossessed if you do not
                            keep up repayments on your mortgage.
                          </p>
                        </div>
                      </div>

                      <div>
                        <StampDutyCalculator
                          regularPrice={listing.regularPrice}
                          discountPrice={listing.discountPrice}
                        />
                      </div>
                    </div>

                    <div className="px-6 py-3  bg-white fixed bottom-0 right-0 left-0 block md:hidden border-t-2 shadow-md">
                      <div className="flex gap-[4%]">
                        <a
                          className="flex flex-col w-[48%]"
                          href={`tel:${listing.phone}`}
                        >
                          <button className="flex justify-center font-semibold text-darkblue gap-2 items-center bg-transparent py-3 px-6 outline outline-darkblue outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
                            <MdPhone /> Call  Owner
                          </button>
                        </a>
                        <a
                          className="flex flex-col  w-[48%]"
                          href={`mailto:${listing.email}`}
                        >
                          <button className="flex justify-center font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
                            <GoMail /> Email  Owner
                          </button>
                        </a>
                      </div>
                    </div>

                    <div className="w-[30%]">
                      <div className="p-10 cssshadow rounded-xl md:block hidden sticky-possiton ">
                        <div className="flex justify-between items-center pb-4">
                          <h2 className="text-3xl font-semibold ">
                            £{" "}
                            {listing.offer
                              ? listing.discountPrice.toLocaleString("en-GB")
                              : listing.regularPrice.toLocaleString("en-GB")}
                            {listing.type === "rent" && " / month"}
                          </h2>
                          <p className="text-lg font-semibold text-lightblue underline">
                            {listing.type === "rent" ? "For Rent" : "For Sale"}
                          </p>
                        </div>
                        <div className="">
                          <a
                            className=" font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                            href="#mortgage"
                          >
                            See how much I could borrow
                          </a>
                        </div>
                        <div>
                          <div className="py-5">
                            {!listing.approved ? (
                              <p className="text-red-700">Pending</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <a
                            className="flex flex-col"
                            href={`tel:${listing.phone}`}
                          >
                            <button className="flex justify-center font-semibold text-darkblue gap-2 items-center bg-transparent py-3 px-6 outline outline-darkblue outline-2 rounded hover:shadow-lg hover:bg-lightblue hover:outline-lightblue hover:text-white">
                              <MdPhone /> Call Property Owner
                            </button>
                          </a>
                          <a
                            className="flex flex-col"
                            href={`mailto:${listing.email}`}
                          >
                            <button className="flex justify-center font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue">
                              <GoMail /> Email Property Owner
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {params.listingId && (
                  <SimilarListings listingId={params.listingId} />
                )}
                <form onSubmit={handleSubmit} className="md:px-10 px-6 pt-10">
                  <button onClick={scrollToTop} className="f">
                    <input
                      type="text"
                      required
                      placeholder="e.g Oxford or NW3"
                      className="w-full hidden outline outline-1 focus:outline-lightblue rounded p-3"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <p className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	">
                      See all recent Properties in{" "}
                      <strong>{listing.postcode}</strong>
                    </p>
                  </button>
                  <p className="text-sm font-medium leading-[17px] pt-6	 text-black">
                    Property descriptions and related information displayed on
                    this page are marketing materials provided by -{" "}
                    <span className="capitalize font-bold">
                      {listing.ownerName}
                    </span>
                    . DemiSellars does not warrant or accept any responsibility
                    for the accuracy or completeness of the property
                    descriptions or related information provided here and they
                    do not constitute property particulars. Please contact HK UK
                    Support ltd for full details and further information.
                  </p>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
