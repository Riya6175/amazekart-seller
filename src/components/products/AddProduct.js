import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import {addProduct} from '../../actions/product.actions';
// import {red[500]} from 'material-ui/styles/colors'

const useStyles = makeStyles((theme) => ({

  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    
    backgroundColor:"#ff9900",
    color: "#000",
  },
  buttons: {
    display: "flex",
    justifyContent:"flex-end"
  },
    custom:{
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer'
},
  primary: {

    '&:hover': { // changes colors for button hover state

      backgroundColor: "#ff9900",

      color: "#000",

    },

  },

  secondary: {

    fontWeight: 700, // make the text bold

  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct() {

    const[name,setName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription]= useState('');
    const [categoryId, setCategoryId]= useState('');
    const [productPictures, setProductPictures]= useState([]);
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    const form = new FormData();
    form.append('name',name)
    form.append('quantity',quantity)
    form.append('price',price)
    form.append('description',description)
    form.append('category',categoryId)

    for(let pic of productPictures){
      form.append('productPicture',pic)
    }
    
    dispatch(addProduct(form))
    setOpen(false);
  };

  const createCategoryList = (categories,options =[]) => {
    for(let category of categories) {
        options.push({value: category._id, name: category.name});
        if(category.children.length>0){
            createCategoryList(category.children,options)
        }
    }
    return options;
}

const handleProductPictures = (e) => {
  setProductPictures([
    ...productPictures,
    e.target.files[0]
  ])
}

console.log(productPictures)

  return (
    <div style={{backgroundColor:'#ecf8fa'}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx(classes.primary,classes.button)}
                  startIcon={<AddCircleIcon />}
                  onClick={handleClickOpen}
                >
                    Add
                </Button>
      <Dialog  fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} style={{backgroundColor:'#0079af'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Your Product Here
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List style={{backgroundColor:'#ecf8fa',height:'100%'}}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          placeholder={'Product Name'}
          variant="outlined"
          style={{margin:"3%", width:"30%"}}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <TextField
         id="outlined-number"
          label="Quantity"
          style={{margin:"3%", width:"7%"}}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <FormControl style={{marginTop:"3%", width:"7%"}} className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <TextField
          id="Category"
          select
          label="Category"
          value={categoryId}
          style={{marginLeft:"3%",marginTop:"3%", width:"30%"}}
          helperText="Please select catgeory"
          variant="outlined"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {createCategoryList(category.categories).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          placeholder={"Description"}
          style={{marginLeft:"3%", width:"50%",marginBottom:'2%'}}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
        
        
        <label htmlFor="upload-photo" style={{marginLeft:"3%",marginTop:"20%",height:"30%"}}>
        <div style={{marginLeft:'3%'}} >
          {
          productPictures.length > 0 ? productPictures.map((pic,index) => <span key={index} style={{display:'flex',position:'relative'}}> {JSON.stringify(pic.name)} </span>) : null
          }
          </div>
        
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="productPicture"
              type="file"
              onChange={handleProductPictures}
              multiple="multiple"
            />
               
            <Fab
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              style={{margin:"3%",backgroundColor:"#ff9900"}}
            >
              
              <AddCircleIcon style={{padding:'2%'}}/> Upload photo
            </Fab>
        </label>
        </div>
        </List>
      </Dialog>
    </div>
  );
}

