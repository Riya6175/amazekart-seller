import { categoryConstants } from "./constants";
import axiosInstance from "../helpers/axios";
import { initialDataConstants, productConstants,orderConstants, } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        // dispatch({type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST });
        const res = await axiosInstance.post(`/initialData/products`);
        if(res.status === 200){
            const {categories,products,orders} = res.data;
            dispatch({
                type: categoryConstants.CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products}
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders },
              });
        }
        console.log(res)
    }
}