import { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useFetch from '../../Utilities/useFetch';
import { API_URLS } from '../../shared/Constant';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(2),
  },
}));

const ViewEntity = () => {
  const classes = useStyles();
  const location=useLocation()

console.log(location);
window.localStorage.setItem("op",location.state)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [update,updateConfig,loading]=useFetch(API_URLS.getQuestion,{"operatorId": location.state})
  const [data, setData] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);
useEffect(()=>{
  updateConfig()
},[])
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
    console.log('Edit item with ID:', selectedItemId);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete item with ID:', selectedItemId);
    handleMenuClose();
  };

  return (
    <TableContainer>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
           {/* {update?.questions[0].map(item=> {return(
              {Object.keys(item)}
            )}
            )
           } */}
         {  console.log(update?.questions[0],"update?.questions[0]")}
       
            {update?.questions&&Object.keys(update?.questions[0]).map((key) => {  return (<><TableCell>{key=="setId"?"":key}</TableCell></>)}
      )}
          </TableRow>
        </TableHead>
        <TableBody>
          {update?.questions?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.name}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewEntity;
