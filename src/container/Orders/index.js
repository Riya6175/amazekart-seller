import React, { useEffect, useState } from "react";
import Sidebar from "../home/sidebar";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders, updateOrder } from "../../actions";
import "./style.css"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  orders: {
    flexGrow: 1,
    ...theme.mixins.toolbar,
    padding: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
}));

const Orders = (props) => {

  const classes = useStyles();

  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(false);
  const auth = useSelector((state) => state.auth);

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };
  //dispatch(getCustomerOrders());

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  useEffect(() => {

  }, [auth.authenticate]);



  const checkValidation = () => {
    order.orders.map((orderItem, index) => (
      orderItem.items.map((item, index) => (
        (item.productId.createdBy) == (auth.user._id) ?
          setValidation(true) :  null
      ))
    ))
    console.log(validation)
  }

  return (
    <div style={{ marginTop: "5%" }} className={classes.root}>
      <Sidebar />
      <div className={classes.orders}>
      <Button color="primary" onClick={checkValidation} >See All my orders</Button>
        {validation ? <>
        {order.orders.map((orderItem, index) => (

          <Card
            style={{
              margin: "10px 0",
            }}
            key={index}
            headerLeft={orderItem._id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 50px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="title">Items</div>
                {orderItem.items.map((item, index) => (
                  <div className="value" key={index}>
                    {item.productId.name}
                   
                  </div>
                ))}
              </div>
              <div>
                <span className="title">Total Price</span>
                <br />
                <span className="value">{orderItem.totalAmount}</span>
              </div>
              <div>
                <span className="title">Payment Type</span> <br />
                <span className="value">{orderItem.paymentType}</span>
              </div>
              <div>
                <span className="title">Payment Status</span> <br />
                <span className="value">{orderItem.paymentStatus}</span>
              </div>
            </div>
            <div
              style={{
                boxSizing: "border-box",
                padding: "40px 10px 50px 70px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="orderTrack">
                {orderItem.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${status.isCompleted ? "active" : ""
                      }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* select input to apply order action */}
              <div
                style={{
                  padding: "0 50px",
                  boxSizing: "border-box",
                }}
              >
                <select onChange={(e) => setType(e.target.value)}>
                  <option value={""}>select status</option>
                  {orderItem.orderStatus.map((status) => {
                    return (
                      <>
                        {!status.isCompleted ? (
                          <option key={status.type} value={status.type}>
                            {status.type}
                          </option>
                        ) : null}
                      </>
                    );
                  })}
                </select>
              </div>
              {/* button to confirm action */}

              <div
                style={{
                  padding: "0 50px",
                  boxSizing: "border-box",
                }}
              >
                <button onClick={() => onOrderUpdate(orderItem._id)}>
                  confirm
                </button>
              </div>
            </div>
          </Card>
        ))}
        </> : null}
      </div>
    </div>


  )

};

export default Orders;