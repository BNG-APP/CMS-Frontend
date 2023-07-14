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
  const [showNoData, setShowNoData] = useState(false);
  const [sortColumn, setSortColumn] = useState(""); // Column to be sorted
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction (asc/desc)

  const sideMenu = useSelector((store) => store.app.isSideMenuOpen);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchSearchResults = async (searchTerm) => {
    const tags = searchTerm.split(",").map((tag) => tag.trim());
    const data = {
      tags: tags,
    };
    setIsLoading(true);
    try {
      await POST(`https://cmsapis.bngrenew.com/images/search`, data).then(
        (res) => {
          const results = res.metadata.map((result) => ({
            ...result,
          }));
          setSearchResults(results);
        }
      );
    } catch (error) {
      setShowNoData(true);
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    await fetchSearchResults(searchTerm);
  };

  const getSerialNumber = (index) => {
    return index + 1 + page * rowsPerPage;
  };

  const theme = createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          padding: "8px",
        },
      },
      MuiTableRow: {
        root: {
          height: "40px",
        },
      },
    },
  });

  const sortTable = (column) => {
    if (column === sortColumn) {
      // If the same column is clicked, toggle the sorting direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the sort column and default to ascending direction
      setSortColumn(column);
      setSortDirection("asc");
    }
  };


  const getSortedData = () => {
    let sortedData = [...searchResults];

    // Sort the data based on the selected column and direction
    if (sortColumn !== "") {
      sortedData.sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortColumn].localeCompare(b[sortColumn]);
        } else {
          return b[sortColumn].localeCompare(a[sortColumn]);
        }
      });
    }

    return sortedData;
  };


  return (
    <div className="App w-full">
      <Header />

      <div className="flex justify-center items-center flex-col w-full mt-20">
        <div className="sticky top-0 bg-white rounded-md drop-shadow-2xl w-[90%] mb-2 p-2">
          <input
            type="text"
            value={searchTerm}
            className="border-2 border-black text-black bg-white rounded-lg p-1"
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className={`bg-green-600 text-white m-2 py-2 px-4 rounded-lg ${isLoading ? "loader-button" : ""
              }`}
            style={{ width: "100px" }}
            onClick={handleSearchSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "Search"}
          </button>
        </div>
        {isLoading ? (
          <div className="text-black bg-white rounded-md drop-shadow-2xl w-[90%] mb-2 p-4 text-center flex flex-col items-center justify-center">
            <CircularProgress size={30} />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="bg-white rounded-md drop-shadow-2xl w-[90%] mb-2 p-2">
            <TableContainer component={Paper} className="mt-4">
              <Table theme={theme}>
                <TableHead className={theme.head}>
                  <TableRow>
                    <TableCell >S.NO.
                    </TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell onClick={() => sortTable("title")}>Title  {sortColumn === "title" && (
                      <span style={{color:"black"}}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}</TableCell>
                    <TableCell onClick={() => sortTable("description")}>Description  {sortColumn === "description" && (
                      <span style={{color:"black"}}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}</TableCell>
                    <TableCell onClick={() => sortTable("tags")} >Tags {sortColumn === "tags" && (
                      <span style={{color:"black"}}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}</TableCell>
                    <TableCell onClick={() => sortTable("category")}> Category {sortColumn === "category" && (
                      <span style={{color:"black"}}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}</TableCell>
                    <TableCell>Dimensions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedData()
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{getSerialNumber(index)}</TableCell>
                        <TableCell>
                          <img
                            src={result?.dimensions?.imgHighPixel?.imageUrl}
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
        ) : showNoData ? (
          <div className="text-black bg-white rounded-md drop-shadow-2xl w-[90%] mb-2 p-2">
            No data found
          </div>
        ) : null}
        <div
          className={`bg-white rounded-md drop-shadow-2xl w-[90%] ${sideMenu ? "ml-[240px] w-[80%]" : ""
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
