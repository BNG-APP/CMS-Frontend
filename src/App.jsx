import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { Card, Header } from "./CommonComponent";
import { useSelector } from "react-redux";
import { POST } from "./shared/Axios";
import {
  Table,
  createTheme,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";

function App() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const sideMenu = useSelector((store) => store.app.isSideMenuOpen);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchSearchResults = async (searchTerm) => {
    const data = {
      tags: [searchTerm],
    };
    setIsLoading(true);
    try {
      await POST(`https://cmsapis.bngrenew.com/images/search`, data).then(
        (res) => {
          const results = res.metadata.map((result) => ({
            ...result,
            // dimensions: `${result.dimensions.imgHighPixel.width} x ${result.dimensions.imgHighPixel.height}`,
          }));
          setSearchResults(results);
        }
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  console.log(searchResults, "search", searchTerm);
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = async () => {
    setIsLoading(true);
    await fetchSearchResults(searchTerm);
  };
  const theme = createTheme({
    overrides: {
      MuiTableCell: {
        head: {
          backgroundColor: "lightgray",
          fontWeight: "bold",
        },
      },
    },
  });
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
            className={`bg-gray-400 text-white m-2 py-2 px-4 rounded-lg ${
              isLoading ? "loader-button" : ""
            }`}
            onClick={handleSearchSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "Search"}
          </button>
        </div>
        {isLoading ? (
          <div className="text-black bg-white rounded-md drop-shadow-2xl w-[90%] mb-2  p-4 text-center flex flex-col items-center justify-center">
            <CircularProgress size={30} />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="bg-white rounded-md drop-shadow-2xl w-[90%] mb-2  p-2">
            <TableContainer component={Paper} className="mt-4">
              <Table>
                <TableHead className={theme.head}>
                  <TableRow>
                    <TableCell>S.NO.</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Dimensions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                          <img
                            src={result.dimensions.imgHighPixel.imageUrl}
                            width={"100px"}
                            height={"100px"}
                            className="rounded-xl m-2"
                          />
                        </TableCell>
                        <TableCell>{result.title}</TableCell>
                        <TableCell>{result.description}</TableCell>
                        <TableCell>{result.tags.join(", ")}</TableCell>
                        <TableCell>{result.category}</TableCell>
                        <TableCell>
                          {result.dimensions.imgHighPixel.width} x{" "}
                          {result.dimensions.imgHighPixel.height}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={searchResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <div className="text-black bg-white rounded-md drop-shadow-2xl w-[90%] mb-2  p-2">
            No data found
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
