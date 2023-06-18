import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  IconButton,
  makeStyles,
  TablePagination
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useFetch from "../../Utilities/useFetch";
import { API_URLS } from "../../shared/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import { DecodeBase64 } from "../../CommonComponent/DecodeBase64";
import { Header, Loader } from "../../CommonComponent";
import { POST } from "../../shared/Axios";
import clsx from "clsx";
import "tailwindcss/tailwind.css";
const useStyles = makeStyles((theme) => ({

 
    // ...
    table: {
      minWidth: 600,
      // borderRadius: "8px",
      // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  
    },
    tableContainer: {
      //  margin: "5px 10px", // Add margin to the left and right sides of the table
      // border: "solid gray 2px",
      overflowX: "hidden",

    },
  
    imageCell: {
      padding: 0,
    },
    image: {
      width: "80px",
      height: "auto",
      objectFit: "cover",
      borderRadius: "8px",
      padding: "10px",
    },
    header: {
      backgroundColor: "gray",
      fontSize: "20px",
      textTransform: "uppercase",
      fontWeight: "600",
      textAlign: "center", 
     
    },
    actionButton: {
      padding: theme.spacing(1),
    },
 
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
  menu: {
    marginTop: theme.spacing(2),
    zIndex:1111
  },
  tablecell: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "8px", // Adjust the padding value as per your preference
    
  },
  questionTextCell: {
    maxWidth: "200px",
   // width: "100px",  Set the desired width here
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  row:{
    padding:"15px 0 15px 5px",
    lineHeight: "1rem"
  }
}));

const ViewEntity = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate()
  const op = window.localStorage.getItem("op")
  const [anchorEl, setAnchorEl] = useState(null);
  const [loader,setLoader]=useState(true)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [update, updateConfig, loading] = useFetch(API_URLS.getQuestion, {
    operatorId: op,
  }); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = update?.questions?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );



  useEffect(() => {
      updateConfig();
      if(loading==false){
          setLoader(false)
        }
      }, []);



  // const [update , setUpdate] = useState(allEntries)
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  // const handleEdit = (item,idx) => {

  //   // Handle edit logic here
  //   console.log("Edit item with ID:", idx);
  //   handleMenuClose();
  //   navigate(`/edit/${idx}`)
  // };

  const handleDelete = (item) => {
    // Handle delete logic here
    console.log("Delete item with ID:", item);
    const data = {
      "operatorId": op,
      "questionId": item._id
    }
    POST(API_URLS.Delete, data).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err) })
    handleMenuClose();
  };

  const data = update?.questions[0];

  if (!data) {
    // Handle the case when update.questions[0] is undefined or null
    return <div className="text-black">No data available</div>;
  }

  const {
    imageUrl,
    questionText,
    answerOption,
    answer,
    operatorId,
  } = data;

  const mappedObject = {
    "image url":imageUrl,
    "questionText Ar": questionText?.ar,
    "answer Option option1": answerOption?.option1,
    "answer Option option2": answerOption?.option2,
    answer,
    operatorId,
  };
// console.log(loading,"loading");
  return (
    <>
      <Header />
      {false ? <Loader /> :
        <div className="mt-20 mx-8 bg-white overflow-x-hidden rounded-xl">
          <TableContainer className={classes.tableContainer}>
            <Table  className={classes.table} aria-label="simple table">
              <TableHead className={classes.header}>
                <TableRow >
                  <TableCell className={classes.row}>S.No.</TableCell>
                  {Object.keys(mappedObject).map((key) => (
                    <TableCell key={key} className={classes.row}>{key}</TableCell>
                  ))}
                  <TableCell className={classes.row}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData?.map((item, idx) => (
                  <TableRow key={item.id}>
                    <TableCell>{(page * rowsPerPage) + idx + 1}.</TableCell>
                    {Object.entries(mappedObject).map(([key, value]) => {
                      if (key === "image url") {
                        return (
                          <TableCell key={key} className={classes.imageCell}>
                            <img src={item.imageUrl} alt="Question" className={classes.image} />
                          </TableCell>
                        );
                      } else if (key === "questionText Ar") {
                        const decodedValue = item.questionText?.ar ? DecodeBase64(item.questionText.ar) : "";
                        return <TableCell key={key} className={classes.questionTextCell}>{decodedValue}</TableCell>;
                      } else if (key == "answer Option option1") {
                        return <TableCell key={key}>{item.answerOption.option1}</TableCell>
                      }
                      else if (key == "answer Option option2") {
                        return <TableCell key={key}>{item.answerOption.option2}</TableCell>
                      }
                      else {
                        const cellValue = item[key] !== undefined ? item[key] : ""; // Handle undefined values
                        return <TableCell key={key}>{cellValue}</TableCell>;
                      }
                    })}
                    <IconButton
                      aria-label="more"
                      aria-controls="menu"
                      aria-haspopup="true"
                      className={classes.actionButton}
                      onClick={(event) => handleMenuClick(event, item._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl && selectedItemId === item._id)}
                      onClose={handleMenuClose}
                      className={classes.menu}
                    >
                      {/* onClick={()=>handleEdit(item,idx)} */}
                      <MenuItem onClick={() => navigate("/swipe4win/EditDetails", { state: item })}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
                    </Menu>

                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.pagination}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={update?.questions?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

        </div>}
    </>
  );
};

export default ViewEntity
