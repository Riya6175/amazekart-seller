import React,{useState} from 'react'
import useTable from './useTable'
import TableBody from '@material-ui/core/TableBody';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleModal from '../../components/productModal/productdisplay'
import {deleteProductById} from '../../actions/product.actions';



const useStyles = makeStyles({
  Heading: {
    fontSize:'1.5rem',
    color:'#fff',
    fontFamily:'Roboto',
    fontWeight: '600'
  },
  content:{
    flexGrow:1,
    fontSize:'1.25rem',
    color:'#232f3e',
    fontFamily:'Roboto',
    fontWeight: '300',
  },
  rowshover:{
    '&:hover':{
      background:'#b2e5f6'
    }
  }
  
});



export default function ProductDetails(){
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  
    const[name,setName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription]= useState('');
    const [categoryId, setCategoryId]= useState('');
    const [productPictures, setProductPictures]= useState([]);
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch();
    const { TblContainer, TblPagination} = useTable(product);
    const [orderBy, setOrderBy] = React.useState(price);
    const [open, setOpen] = React.useState(false);



  return (
    <>
      <TblContainer style={{marginTop:'10%'}}>
        <TableHead style={{background:"#008296",fontSize:'2rem'}} >
          <TableRow >
            <TableCell></TableCell>
            <TableCell className={classes.Heading}>Product Name</TableCell>

            <TableCell className={classes.Heading}>
            
            
              Price
            
            </TableCell>
            
            <TableCell className={classes.Heading}>Quantity</TableCell>
            <TableCell className={classes.Heading}>Category</TableCell>
            <TableCell className={classes.Heading}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{background:"#eef9fb"}}>
          {
            product.products.length > 0 ? 
            product.products.map(product => 
            <>
            <TableRow className={classes.rowshover}> 
              <TableCell>
              <SimpleModal description={product.description} image={product}/>
              </TableCell>
              <TableCell className={classes.content}>{product.name}</TableCell>
              <TableCell className={classes.content}>{product.price}</TableCell>
              <TableCell className={classes.content}>{product.quantity}</TableCell>
              <TableCell className={classes.content}>{product.category.name}</TableCell>
              <TableCell><button onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}>delete</button></TableCell>
            </TableRow>
            
              {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} className={classes.rowshover} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    
                    <Table size="small" aria-label="purchases">
                      <TableHead >
                        <TableCell style={{fontSize:'1.2rem',fontFamily:'Roboto',fontWeight:'800'}}> Description </TableCell>
                      </TableHead>
                      <TableBody>
                          <TableRow className={classes.rowshover}>
                            <TableCell className={classes.content} component="th" scope="row" >{product.description}</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                  </Collapse>
                  </TableCell> */}
            
            </>
            ) : null
          }
        </TableBody>
      </TblContainer>
      
    </>
  )




}
