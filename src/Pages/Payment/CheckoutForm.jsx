import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, data }) => {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    setProcessing(false);
    if (paymentIntent.status == "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        status: "paid",
        quantity: data.length,
      };
      axiosSecure.patch("/postPaidBook", { data, payment }).then((res) => {
        if (res.data.modifiedCount) {
          axiosSecure.patch("/UpdateSoldUnit", data).then((res) => {
            if (res.data.modifiedCount) {
                axiosSecure.patch("/UpdateCartToEmpty", data).then((res) => {
                    if (res.data.modifiedCount) {
                      Swal.fire("Payment Successful!!");
                      navigate('/readerprofile')
                    }
                  });
            }
          });
        }
      });
    }
  };

  return (
    <div className="card mx-auto mt-10 w-96 bg-purple-300 text-neutral-content">
      <div className="card-body text-center">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#FFFFFF",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn  bg-deepblue text-white font-bold mt-5 w-1/3"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </form>
      </div>
      {cardError && <p className="text-red-500 p-2">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 p-2">
          Transaction complete: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
