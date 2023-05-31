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
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useFetch from "../../Utilities/useFetch";
import { API_URLS } from "../../shared/Constant";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DecodeBase64 } from "../../CommonComponent/DecodeBase64";
import { Header } from "../../CommonComponent";

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(2),
  },
  tableContainer: {
    margin: "10px",
  },
  imageCell: {
    padding: 0,
  },
  image: {
    width: "100px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "4px",
  },
}));

const ViewEntity = () => {
  const classes = useStyles();
  const location = useLocation();
const navigate=useNavigate()

  window.localStorage.setItem("op", location.state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [update, updateConfig, loading] = useFetch(API_URLS.getQuestion, {
    operatorId: location.state,
  });

  useEffect(() => {
    updateConfig();
  }, []);
  console.log(update?.questions);
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

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete item with ID:", selectedItemId);
    handleMenuClose();
  };

  const data = update?.questions[0];

  if (!data) {
    // Handle the case when update.questions[0] is undefined or null
    return <div>No data available</div>;
  }

  const {
    imageUrl,
    questionText,
    answerOption,
    level,
    priority,
    answer,
    operatorId,
  } = data;

  const mappedObject = {
    imageUrl,
    "questionText Ar": questionText?.ar,
    "answerOption option1": answerOption?.option1,
    "answerOption option2": answerOption?.option2,
    level,
    priority,
    answer,
    operatorId,
  };

  return (
    <>
      <Header />
      <div className="mt-20">
        <TableContainer className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                {Object.keys(mappedObject).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {update?.questions?.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  {Object.entries(mappedObject).map(([key, value]) => {
                 
                    if (key === "imageUrl") {
                      return (
                        <TableCell key={key} className={classes.imageCell}>
                          <img src={item[key]} alt="Question" className={classes.image} />
                        </TableCell>
                      );
                    }    else if (key === "questionText Ar") {
                      const decodedValue = item.questionText?.ar ? DecodeBase64(item.questionText.ar) : "";
                      return <TableCell key={key}>{decodedValue}</TableCell>;
                    } else if(key=="answerOption option1"){
                      return<TableCell key={key}>{item.answerOption.option1}</TableCell>
                    }
                    else if(key=="answerOption option2"){
                      return<TableCell key={key}>{item.answerOption.option2}</TableCell>
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
                    <MenuItem  onClick={() => navigate("/swipe4win/EditDetails",{state:item})}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>

                </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ViewEntity
