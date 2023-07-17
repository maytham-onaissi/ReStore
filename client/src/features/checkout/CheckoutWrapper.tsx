import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../App/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../App/Layout/LoadingComponent";

const stripePromise = loadStripe(
  "pk_test_51NUXMQDDYgWskrVXL6ChkzfwRunoByh2fiQ8QfxYd7UAWSBVQBSBD7Bj405dhcZ8gGrQdlHRLEeIeHvLx8Uti7nj00nz4QqfP1"
);

const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Loading checkout..." />;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
