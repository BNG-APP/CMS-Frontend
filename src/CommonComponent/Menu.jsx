import React,{useState} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import { ListItemIcon } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setIsSideMenuOpen } from "../redux/appSlice";
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import ChurchIcon from '@mui/icons-material/Church';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
const drawerWidth = 230;
const navItems=[
  {
    id:0,
    text:"swipe4win",
    icon:<QuizIcon/>
  },
  {
    id:0,
    text:"xgame",
    icon:<SportsEsportsIcon/>
  },
  {
    id:0,
    text:"christianity",
    icon:<ChurchIcon/>
  },
  {
    id:0,
    text:"education",
    icon:<SchoolIcon/>
  },
  
  
]
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#01579B',
    color: '#ffffff',
    fontSize:"1.5rem",
    fontWeight:500
  },
  drawerHeader: {
    display: "flex",
    // alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    // justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    color: 'white',
    // margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function Sidebar() {
  const [active,setActive]=useState("")
  const classes = useStyles();
  const dispatch=useDispatch();
  const theme = useTheme();
  const navigate=useNavigate()
  const sideMenu =useSelector(store=>store.app.isSideMenuOpen)
  // const [open, setOpen] = React.useState(false);
  console.log("active is:::",active)
  const handleDrawerOpen = () => {
    dispatch(setIsSideMenuOpen(true))
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(setIsSideMenuOpen(false))
    // setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        color="primary"
        open={sideMenu}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} style={{color: 'white'}} sx={{margin:'auto'}}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding>
           {navItems && navItems.map((item,index)=>
            {
             return <ListItem
             sx={{
               backgroundColor: active === item.text ? 'red' : ''
             }}
           >
             <ListItemButton key={index} onClick={() => {
               navigate(`/${item.text}`);
               setActive(item.text);
             }} sx={{ textTransform: 'capitalize' }}>
               <ListItemIcon sx={{
                 color: active === item.text ? 'primary.contrastText' : '',
                 '& .MuiSvgIcon-root': {
                   color: active === item.text ? 'primary.contrastText' : ''
                 }
               }}>
                 {item.icon}
               </ListItemIcon>
               <ListItemText>{item.text}</ListItemText>
             </ListItemButton>
           </ListItem>
            })}
    </List>
      </Drawer>
      <main className={classes.content}>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classes.menuButton}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        {/* {props.children} */}
      </main>
    </div>
  );
}

export default Sidebar;
