import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { Card, Header } from "./CommonComponent";
import { useSelector } from "react-redux";
import Breadcrumbs from "./CommonComponent/Breadcrumbs";
function App() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const sideMenu = useSelector((store) => store.app.isSideMenuOpen);
  const fetchSearchResults = async (searchTerm) => {
    try {
      const response = await axios.get(
        `YOUR_API_ENDPOINT?search=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    fetchSearchResults(searchTerm);
  };
  return (
    <div className="App w-full">
      <Header />

      <div className="flex justify-center items-center flex-col w-full mt-20">
        <div className="bg-white rounded-md drop-shadow-2xl w-[90%] mb-2  p-2">
          <input
            type="text"
            value={searchTerm}
            className="border-2 border-black text-black rounded-lg p-1"
            onChange={handleSearchInputChange}
          />
          <button
            className="bg-gray-400 text-white m-2 py-2 px-4 rounded-lg"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="bg-white rounded-md drop-shadow-2xl w-[90%] mb-2  p-2">
            {searchResults.map((result) => (
              <div key={result.id}>{result.title}</div>
            ))}
          </div>
        )}
        <div
          className={`bg-white rounded-md drop-shadow-2xl w-[90%] ${
            sideMenu ? "ml-[240px] w-[80%]" : ""
          }`}
        >
          <div className="text-black py-5 px-5 font-bold text-lg">Uploads</div>
          <div className="flex flex-wrap justify-center my-1 mx-4 ">
            <Card
              item={"Image"}
              style={{ backgroundColor: "rgb(217, 251, 255)" }}
              handleClick={() => navigate("/image")}
            />
            <Card
              item={"Audio"}
              style={{ backgroundColor: "rgb(255, 253, 195)" }}
              handleClick={() => navigate("/audio")}
            />
            <Card
              item={"Video"}
              style={{ backgroundColor: "rgb(255, 225, 225)" }}
              handleClick={() => navigate("/video")}
            />
            <Card
              item={"Pdfs"}
              style={{ backgroundColor: "rgb(222, 246, 232)" }}
              handleClick={() => navigate("/pdf")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
