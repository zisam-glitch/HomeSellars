import { useEffect, createRef, useState } from "react";
import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";

const PostcodeLookupComponent = (props) => {
  const context = createRef();

  useEffect(() => {
    PostcodeLookup.setup({
      apiKey: "ak_test",
      inputField: "#input",
      detectCountry: false,
      defaultCountry: "UK",
      context: context.current,
      button: "#customButton",
      ...props,
    });
  }, []);

  return <div ref={context}></div>;
};

export default function App() {
  const [showText, setShowText] = useState(false);
  const [address, setAddress] = useState({
    line_1: "",
    line_2: "",
    line_3: "",
    post_town: "",
    postcode: "",
  });

  return (
    <div className="flex p-4 mx-auto w-3/4	">
      <div className="w-4/6">

        <h1 className="text-4xl font-semibold pb-6">Your property location</h1>    
        <p className="pb-1 font-medium text-base">Your postcode</p>
        <PostcodeLookupComponent
          onAddressSelected={(address) => setAddress(address)}
        />
              {showText && (
        <button
          onClick={() => setShowText(!showText)}
          id="customButton"
          className="mt-6 flex gap-2 items-center bg-lightblue py-2 px-6 outline outline-lightblue outline-1 rounded hover:shadow-lg hover:bg-litedarkblue"
        >
          <span className="text-white	">Get free valuation</span>
        </button>
            )}
        {showText && (
          <div>
            <label>Address Line One</label>
            <input
              type="text"
              value={address.line_1}
              onChange={(e) =>
                setAddress({ ...address, line_1: e.target.value })
              }
            />
            <label>Address Line Two</label>
            <input
              type="text"
              value={address.line_2}
              onChange={(e) =>
                setAddress({ ...address, line_2: e.target.value })
              }
            />
            <p>{address.line_1}</p>
            <label>Address Line Three</label>
            <input
              type="text"
              value={address.line_3}
              onChange={(e) =>
                setAddress({ ...address, line_3: e.target.value })
              }
            />
            <label>Post Town</label>
            <input
              type="text"
              value={address.post_town}
              onChange={(e) =>
                setAddress({ ...address, post_town: e.target.value })
              }
            />
            <label>Postcode</label>
            <input
              type="text"
              value={address.postcode}
              onChange={(e) =>
                setAddress({ ...address, postcode: e.target.value })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
