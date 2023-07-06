import React, { useState } from "react";
import Header from "./Header";

export default function ImageUpload() {
  const [isSingleExpanded, setIsSingleExpanded] = useState(false);
  const [isMultiExpanded, setIsMultiExpanded] = useState(false);

  const handleSingleImageSection = () => {
    setIsSingleExpanded(!isSingleExpanded);
    setIsMultiExpanded(false)
  };
  const handleMultiImageSection = () => {
    console.log("bye");
    setIsMultiExpanded(!isMultiExpanded);
    setIsSingleExpanded(false)
  };

  return (
    <div className="">
      <Header />
      <div className="mt-20 flex items-center flex-col">
        <div
          className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow cursor-pointer ${isSingleExpanded?"h-80":""}`}
          onClick={handleSingleImageSection}
        >
          Single Image Upload
          <div>
            <input />
          </div>
        </div>
      
        <div className={`w-[90%] bg-white text-black p-2 m-2 rounded-lg shadow ${isMultiExpanded?"h-80":""}`} onClick={handleMultiImageSection}>
          Multiple Image Upload
        </div>
      </div>
    </div>
  );
}
