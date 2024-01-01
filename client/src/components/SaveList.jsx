import React, { useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";

function SaveList({ list, isSaved }) {
  const [saved, setSaved] = useState(isSaved);
  const [clicked, setClicked] = useState(false);

  async function handleSave() {
    setClicked(true);
    try {
      setSaved(!saved);
      if (clicked) {
        await fetch(`/api/user/add-list/${list._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          const data = await res.json();
          console.log(data);
          alert(data.msg);
          data.msg === "Saved!" ? setSaved(true) : setSaved(false);
          setClicked(false);
        });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      setSaved(false);
      setClicked(false);
    }
  }

  return (
    <div className='save-list w-max h-auto'>
      <button onClick={handleSave} className='flex flex-row items-center gap-2'>
        {saved ? (
          <>
            <IoBookmark className='text-lg' />
            <span>Saved</span>
          </>
        ) : (
          <>
            <MdBookmarkBorder className='text-xl' />
            <span>Save</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SaveList;
