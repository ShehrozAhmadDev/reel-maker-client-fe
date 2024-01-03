import { useAppSelector } from "@/redux/store";
import Subscriptions from "@/services/subscription";
import { PlanDataType } from "@/types/type";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user-slice";

interface ISubscriptionFormTypes {
  selectedPlan: PlanDataType | null;
  closeModal: () => void;
  getUserSubscription: () => void;
}

const SubscriptionForm: FC<ISubscriptionFormTypes> = ({
  selectedPlan,
  closeModal,
  getUserSubscription,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();

  const verifyPayment = async () => {
    const token = Cookie.get("token");

    if (user?.subscriptionId)
      await Subscriptions.verifySubscription(user?.subscriptionId._id, token)
        .then(async (data) => {
          await getUserSubscription();

          dispatch(
            setUser({
              ...user,
              subscriptionId: data.subscription,
            })
          );
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const data = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/dashboard",
      },
      redirect: "if_required",
    });
    switch (data.paymentIntent?.status) {
      case "succeeded":
        toast.success("Payment Succeeded!");
        setMessage("Payment succeeded!");
        verifyPayment();
        break;
      case "processing":
        toast.info("Your payment is processing!");
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        toast.error("Your payment was not successful, please try again.");
        setMessage("Your payment was not successful, please try again.");
        break;
      default:
        setMessage("Something went wrong.");
        toast.error("Something went wrong.");
        break;
    }
    closeModal();
    if (data.error)
      if (
        data.error.type === "card_error" ||
        data.error.type === "validation_error"
      ) {
        setMessage(data.error.message || "");
        toast.error(data.error.message || "");
      } else {
        setMessage("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyPayment();

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast.success("Payment Succeeded!");
          setMessage("Payment succeeded!");
          break;
        case "processing":
          toast.info("Your payment is processing!");
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          toast.error("Your payment was not successful, please try again.");
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="w-[500px] text-white focus:outline-none">
      <span className="flex space-x-5 justify-between  mb-8">
        <h2 className="text-xl text-center w-[50%] font-semibold p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
          {selectedPlan && selectedPlan.title}
        </h2>
        <p className="text-2xl text-center w-[50%] font-semibold p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
          ${selectedPlan && (selectedPlan.price / 100).toFixed(2)}
        </p>
      </span>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          options={{ defaultValues: { email: user?.email || "" } }}
        />
        <PaymentElement id="payment-element" />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:opacity-80 transition-all duration-300"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner">
                Loading...
              </div>
            ) : (
              "Continue Payment"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default SubscriptionForm;
