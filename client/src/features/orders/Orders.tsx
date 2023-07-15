import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { order } from "../../App/models/order";
import { currencyFormat } from "../../App/util/util";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../App/models/basket";
import OrderDetailed from "./OrderDetails";

interface props {
  orders: order[] | null;
  viewOrder: (id: number) => void;
}

const OrderList = ({ orders, viewOrder }: props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order date</TableCell>
            <TableCell align="right">Order states</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="right">{order.orderStates}</TableCell>
              <TableCell align="right">
                <Button onClick={() => viewOrder(order.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface OrderProps {
  order: order | null;
  OrdersPageHandler: () => void;
}
const Order = ({ order, OrdersPageHandler }: OrderProps) => {
  if (order)
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ p: 2 }} gutterBottom variant="h4">
            Order #{order.id} - {order.orderStates}
          </Typography>
          <Button
            onClick={() => OrdersPageHandler}
            sx={{ m: 2 }}
            size="large"
            variant="contained"
          >
            Return to Orders
          </Button>
        </Box>
        <BasketTable
          items={order.orderItems as BasketItem[]}
          isBasket={false}
        />
        <TableContainer component={Paper} variant={"outlined"}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {currencyFormat(order.subtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Delivery fee*</TableCell>
                <TableCell align="right">
                  {currencyFormat(order.deliveryFee)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  {currencyFormat(order.total)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span style={{ fontStyle: "italic" }}>
                    *Orders over $100 qualify for free delivery
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );

  return <Typography>No order to be seen here</Typography>;
};

const Orders = () => {
  const [orders, setOrders] = useState<order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  if (selectedOrderNumber > 0)
    return (
      <OrderDetailed
        order={orders?.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="right">{order.orderStates}</TableCell>
              <TableCell align="right">
                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
