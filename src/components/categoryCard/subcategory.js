import React, { useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginTop: '0%'
    
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  category:{
    paddingTop:'0%',
    margin:'0px',
    marginLeft:'5%',
    fontFamily:'Montserrat',
  },
  subcategory:{
    paddingTop:'5px',
    marginTop:'10px',
    marginLeft: "15%",
    lineHeight:'20%',
    fontFamily:'Roboto',
    fontSize:'1.25rem',
    textAlign:'left !important'
  }
}));



export default function SubCategory(props) {

  const category = useSelector(state => state.category)
  const dispatch = useDispatch();

  

  console.log(category)

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = j => {
    setExpandedId(expandedId === j ? -1   : j );
    
  };

  return (
    <div style={{paddingTop:'0%'}}>
      <Container style={{paddingTop:'0%'}}>
        <>
      {(props.category).children.map((childs,j) => (
            <>
                  <CardActions disableSpacing style={{paddingTop:'0%',paddingBottom:'0%'}}>
                        <h2 className={classes.category}>{childs.name}</h2>
                        <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={() => handleExpandClick(j)}
                      aria-expanded={expandedId === j}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === j} timeout="auto" unmountOnExit>
                      {childs.children.map(subchild => (
                              <p className={classes.subcategory}>{subchild.name}</p>
                            ))} 
                  </Collapse>
                </>
            ))}

        </>
      </Container>
      
    </div>
    
  )
}

