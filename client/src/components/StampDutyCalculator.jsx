import React, { useState, useEffect } from "react";

const StampDutyCalculator = ({ regularPrice, discountPrice }) => {
  const [propertyPrice, setPropertyPrice] = useState(
    discountPrice || regularPrice
  );
  const [buyerType, setBuyerType] = useState("firstTimeBuyer");
  const [stampDuty, setStampDuty] = useState(null); // Set initial value to null
  const [calculateClicked, setCalculateClicked] = useState(false);

  useEffect(() => {
    // Stamp Duty Calculation
    const calculateStampDuty = (price) => {
      // Assuming simplified rates, please verify the latest rates
      let additionalRate = 0;

      if (buyerType === "firstTimeBuyer") {
        // First-time buyers get a discount
        additionalRate -= 5000;
      }

      if (buyerType === "buyingAdditionalProperty") {
        // Additional Property
        additionalRate += 3000;
      }

      if (price <= 125000) {
        return 0;
      } else if (price <= 250000) {
        return (price - 125000) * 0.02 + additionalRate;
      } else if (price <= 925000) {
        return (
          (250000 - 125000) * 0.02 + (price - 250000) * 0.05 + additionalRate
        );
      } else if (price <= 1500000) {
        return (
          (250000 - 125000) * 0.02 +
          (925000 - 250000) * 0.05 +
          (price - 925000) * 0.1 +
          additionalRate
        );
      } else {
        // Above £1,500,000
        return (
          (250000 - 125000) * 0.02 +
          (925000 - 250000) * 0.05 +
          (1500000 - 925000) * 0.1 +
          (price - 1500000) * 0.12 +
          additionalRate
        );
      }
    };

    if (calculateClicked) {
      setStampDuty(calculateStampDuty(propertyPrice));
      setCalculateClicked(false);
    }
  }, [propertyPrice, regularPrice, discountPrice, buyerType, calculateClicked]);

  const handleCalculateClick = () => {
    setCalculateClicked(true);
  };

  return (
    <div className="pt-10">
      <hr />
      <div className="py-6">
        <h1 className="text-2xl font-semibold pb-3">Stamp Duty Calculator</h1>
        <p className="text-lg font-medium">
          We’ve updated our calculator to take into account the stamp duty cut
          announced by the chancellor on 23 September 2023.
        </p>
        <div className="flex md:flex-row flex-col md:gap-[3%] gap-4 py-8 items-end">
          <div className="flex flex-col gap-2 w-full md:w-[19%]">
            <label className="text-lg font-semibold">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-[11.7px] text-lg font-semibold">
                £
              </span>
              <input
                type="number"
                className="minimal w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-6 py-3 outline-border"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[59%]">
            <label className="text-lg font-semibold">i am....</label>
            <select
              value={buyerType}
              className="minimal w-full text-[19px] outline outline-1 focus:outline-lightblue rounded-[2px] px-3 py-3 outline-border"
              onChange={(e) => setBuyerType(e.target.value)}
            >
              <option value="firstTimeBuyer">First Time Buyer</option>
              <option value="movingHome">
                I am moving home and this is my only property
              </option>
              <option value="buyingAdditionalProperty">
                Buying Additional Property
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-[19%]">
            <button
              className="flex justify-center text-lg font-medium text-white gap-2 items-center bg-lightblue py-3 px-6 outline outline-lightblue outline-1 rounded-[2px] hover:shadow-lg hover:bg-litedarkblue"
              onClick={handleCalculateClick}
            >
              Calculate
            </button>
          </div>
        </div>
        <div>
          {stampDuty !== null && (
            <>
              <div className="  py-6 flex flex-col justify-center">
                <p className="pb-2 text-lg text-center font-medium">
                  From 23rd September 2022
                </p>
                <h2 className="text-2xl text-center font-semibold">
                  £{stampDuty.toFixed(2)}
                </h2>
                <p className="pt-5 text-lg text-center font-medium">
                  Need to sell your home to buy this property?
                </p>
                <a
                  className="font-semibold text-lg underline underline-lightblue underline-offset-8 decoration-lightblue decoration-1 hover:decoration-2	"
                  href="#"
                >
                  <p className="text-lg text-center font-medium">
                    See how much your home is worth
                  </p>
                </a>
              </div>
              <p className="text-sm font-medium leading-[17px] pt-6	 text-black">
                This stamp duty calculator provides illustrative figures for
                stamp duty in England and Northern Ireland. We try to make sure
                that the information is accurate at the time of publishing but
                the property market moves fast and some information may now be
                out of date. This calculator is not intended to provide
                financial advice and should not be relied on for any purposes.
                We recommend you seek advice from a financial advisor in
                relation to any financial decision.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StampDutyCalculator;
