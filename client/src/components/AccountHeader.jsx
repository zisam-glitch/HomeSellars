import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./AccountMobileNav";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      
        <header className="md:hidden block shadow">
          <div className="flex justify-between items-center max-w-full mx-auto py-5 md:px-10 px-6">
            <Link to="/">
              <h1 className="font-bold text-2xl md:text-2xl flex flex-wrap">
                <span className="text-darkblue">Demi</span>
                <span className="text-lightblue">Sellars</span>
              </h1>
            </Link>
            <div>
              <MobileNav />
            </div>
          </div>
        </header>
     
   
    </>
  );
}
