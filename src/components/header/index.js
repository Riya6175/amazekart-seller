import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import Footer from "../footer"
import {useSelector, useDispatch} from "react-redux"
import { signout } from '../../actions/auth.actions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: "1rem"
      }
  },
  title1: {
    flexGrow: 1,
    ['@media (max-width:360px)']: { // eslint-disable-line no-useless-computed-key
        display:"none",
        padding:"10%",
      }
  },
  img:{
    height:"40px",
    widht:"40%",
    padding: "10px"
  },
  btn1:{
    background:"orange",
    "&:hover":{
      background:"orange",
      boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
    },
  },
  ['@media (max-width:360px)']:{
    btn1:{
      marginLeft:"25%",
      height:'30px',
      fontSize:'0.7rem',
      lineHeight:'1.5'
      
  }
},
logo: {
  maxWidth: 80,
  height:50
},
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
        dispatch(signout());
  }

  const renderNonLoggedInLinks = () => {
      return (
          <Toolbar>
              <Button component={ Link } to="/signup" color="#1F2937" className={classes.btn1} method="POST">Start Selling</Button>
          </Toolbar>
        
      )
  }
  const renderLoggedInLinks = () => {
    return (
        <Toolbar>
            <Button color="inherit" className="buttons" color="#000" method="POST" onClick={logout}>Log Out</Button>
        </Toolbar>
      
    )
}
  return (
    <div className={classes.root}>
      
      <AppBar position="fixed" style={{background: "#F9FAFB", textAlign:'left'}}>
      
        <Toolbar>
            
        <Toolbar>
            <img src="./images/logo_blue.png" alt="logo" className={classes.logo} />
          </Toolbar>
            <Typography component={ Link } to="/" style={{textDecoration: "none",color:"#1F2937",float:'right',clear:'both'}} variant="h6" className={classes.title}>
            AmazeKart 
            <Typography component={ Link } to="/" style={{textDecoration: "none",color:"#1F2937", marginLeft:'38%',textAlign:'center'}} variant="h6" className={classes.title1}>
             Grow Your Bussiness. 
          </Typography> 
          </Typography>
            
          
          {/* <Button component={ Link } to="/signin" color="#1F2937"  className={classes.btn}>Login</Button> */}
          
          <Toolbar>
              <Button component={ Link } to="/signup" color="#1F2937" className={classes.btn1} method="POST">Start Selling</Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
