import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { basketTotalPrice, currencyFormat } from "../../App/util/util";
import { useAppSelector } from "../../App/store/configureStore";
import { useEffect, useState } from "react";

interface props {
  subtotal?: number;
  total?: number;
  isBasket: boolean;
}

export default function BasketSummary({ subtotal, total, isBasket }: props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { totalPrice, deliveryFee } = basketTotalPrice(basket!);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (!isBasket) {
      setPrice(total!);
    } else {
      setPrice(totalPrice);
    }
  }, [totalPrice, isBasket, total]);

  if (subtotal === undefined)
    subtotal =
      basket?.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) ?? 0;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {currencyFormat(price + deliveryFee)}
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
}
