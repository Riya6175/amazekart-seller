import React,{useState} from 'react';
import clsx from 'clsx';
import { Redirect } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import {Link, withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { signout } from '../../actions/auth.actions';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowY:'hidden',
    background:'#ebf8fa',
    
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    alignItems: "center", 
    display: 'flex', 
    justifyContent: "center" ,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  paper:{
    background:'#f9fafb !important'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  buttons:{

    '@media(minWidth: 360px)' : {
        display:"None ",
      }
  },
  logo: {
    maxWidth: 200,
    height:40,
    textAlign: 'center',
    paddingRight:'2%'

  },
}));

const Sidebar = (props) => {
  const {history} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
        dispatch(signout());
        <Redirect to="/"></Redirect>
  }

  const renderNonLoggedInLinks = () => {
      return (
          <Toolbar>
              <Button component={ Link } to="/signin" color="#000" className="buttons">Login</Button>
                <Button component={ Link } to="/signup" color="#000" method="POST" >Signup</Button>
          </Toolbar>
        
      )
  }
  const renderLoggedInLinks = () => {
    return (
        <Toolbar>
          
            <Button color="inherit" className="buttons" method="POST" color="#000" onClick={logout}>Log Out</Button>
        </Toolbar>
      
    )
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar style={{background: "#f9fafb"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{color:"#000"}} />
          </IconButton>
          <Typography component={ Link } to="/seller" style={{textDecoration: "none",color:"#000"}} variant="h6" className={classes.title}>
          <img src="./images/logo_blue.png" alt="logo" className={classes.logo} />
            AmazeKart &nbsp; &nbsp; &nbsp; &nbsp; Sell Your Products 
          </Typography>
          <Typography style={{color:"#000",fontSize:"1rem"}}>{auth.user.firstName}</Typography>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer,classes.paper,{
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper,{
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button component={ Link } to="/seller">
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              Home
              <ListItemText/>
            </ListItem>
            <ListItem button component={ Link } to="/products">
              <ListItemIcon>
                <AddBoxIcon/>
              </ListItemIcon>
              Products
              <ListItemText/>
            </ListItem>
            <ListItem button component={ Link } to="/orders">
              <ListItemIcon>
                <AddShoppingCartIcon/>
              </ListItemIcon>
              Orders
              <ListItemText/>
            </ListItem>
            <ListItem button component={ Link } to="/category">
              <ListItemIcon>
              <PlaylistAddIcon/>
              </ListItemIcon>
              Category
              <ListItemText/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon/>
              </ListItemIcon>
              Profile
              <ListItemText/>
            </ListItem>
            <ListItem button component={ Link } to="/signout">
              <ListItemIcon>
                <LockOpenIcon/>
              </ListItemIcon>
              LogOut
              <ListItemText/>
            </ListItem>
        </List>
      </Drawer>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          hhdscjskd
        </Typography>
        <Typography paragraph>
        </Typography>
      </main> */}
    </div>
  );
}

export default Sidebar;