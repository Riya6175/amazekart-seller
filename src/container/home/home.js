import React from "react";
import Sidebar from "../home/sidebar";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex"
    },
    products:{
        flexGrow: 1,
        ...theme.mixins.toolbar,
        padding: theme.spacing(2),
    },
    buttons: {
      display: "flex",
      justifyContent:"flex-end"
    },
    header:{
        backgroundColor: "#008296",
        padding: "30px",
        textAlign: "center",
        fontSize: "25px",
        color: "white"
    }
  }));

const Home = () => {
    
      const classes = useStyles();
    return(
        <div style={{ marginTop: "5%"}} className={classes.root}>
        <Sidebar/>
        <div className={classes.products}>
          <div className={classes.header}><h1>Welcome to AmazeKart Seller Account</h1>
          <h4>Watch your progress here</h4>
          </div>
        </div>
        </div>
        
        
    )
  
};

export default Home;
