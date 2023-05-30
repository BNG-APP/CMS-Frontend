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
import { useLocation } from "react-router-dom";
import { DecodeBase64 } from "../../CommonComponent/DecodeBase64";
import { Header } from "../../CommonComponent";

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(2),
  },
  tableContainer: {
    margin: "10px",
  },
}));

const ViewEntity = () => {
  const classes = useStyles();
  const location = useLocation();

  console.log(location);
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

  const handleEdit = () => {
    // Handle edit logic here
    console.log("Edit item with ID:", selectedItemId);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete item with ID:", selectedItemId);
    handleMenuClose();
  };

  return (
    <>
      <Header />
      <div className="mt-20">
        <TableContainer className="">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                {update?.questions &&
                  Object.keys(update?.questions[0]).map((key) => {
                    return (
                      <>
                        <TableCell>
                          {key == "setId" || key == "_id" ? null : key}
                          {/* {key &&
                      Object.keys(update?.questions[0].questionText).map((item) => {
                       
                        return item;
                      })} */}
                        </TableCell>
                      </>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {update?.questions?.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{DecodeBase64(item?.questionText?.ar)}</TableCell>
                  <TableCell>{item?.answerOption?.option_1}</TableCell>
                  <TableCell>{item?.answerOption?.option_2}</TableCell>
                  {item?.answerOption?.option_3 && (
                    <TableCell>{item?.answerOption?.option_3}</TableCell>
                  )}
                  {item?.answerOption?.option_4 && (
                    <TableCell>{item?.answerOption?.option_4}</TableCell>
                  )}
                  <TableCell>{item?.answer}</TableCell>
                  <TableCell>{item?.level}</TableCell>
                  <TableCell>{item?.priority}</TableCell>
                  <TableCell>{item?.setType}</TableCell>
                  <TableCell>{item?.operatorId}</TableCell>
                  <TableCell>
                    <img src={item.imageUrl} width="200" height="200" />
                  </TableCell>
                  <IconButton
                    aria-label="more"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, item.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    className={classes.menu}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
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

export default ViewEntity;
