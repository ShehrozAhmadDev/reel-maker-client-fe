"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { PlanDataType } from "@/types/type";
import { useAppSelector } from "@/redux/store";
import Cookie from "js-cookie";
import Subscriptions from "@/services/subscription";
import SubscriptionForm from "@/components/stripe/subscriptionForm/SubscriptionForm";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user-slice";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

export interface PaymentModalProps {
  isOpen: boolean;
  selectedPlan: PlanDataType | null;
  closeModal: () => void;
  getUserSubscription: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  closeModal,
  selectedPlan,
  getUserSubscription,
}) => {
  const { user } = useAppSelector((state) => state.userReducer.value);
  const [clientSecret, setClientSecret] = useState<string>("");
  const dispatch = useDispatch();
  const options = {
    clientSecret,
  };

  const createCustomer = async () => {
    try {
      const token = Cookie.get("token");
      if (user && !user.stripeId && !user.subscriptionId) {
        const customerData = await Subscriptions.createCustomer(
          user?.email,
          user?.fullName,
          token
        );
        console.log({ customerData });
        dispatch(
          setUser({
            ...user,
            stripeId: customerData.customer,
          })
        );
        if (customerData.customer && selectedPlan) {
          const subscription = await Subscriptions.createSubscription(
            customerData.customer,
            selectedPlan?.priceId,
            token
          );
          if (subscription.status === 200) {
            dispatch(
              setUser({
                ...user,
                stripeId: customerData.customer,
                subscriptionId: subscription.user.subscriptionId,
              })
            );
            setClientSecret(subscription.clientSecret);
          }
        }
      } else if (user?.stripeId && user?.subscriptionId && selectedPlan) {
        const subscription = await Subscriptions.updateSubscription(
          user?.subscriptionId?.subscriptionId,
          selectedPlan?.priceId,
          token
        );

        setClientSecret(subscription.clientSecret);
      } else {
        if (user?.stripeId && selectedPlan) {
          const subscription = await Subscriptions.createSubscription(
            user.stripeId,
            selectedPlan?.priceId,
            token
          );
          dispatch(
            setUser({
              ...user,
              subscriptionId: subscription.subscriptionId,
            })
          );
          setClientSecret(subscription.clientSecret);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && selectedPlan) {
      createCustomer();
    }
  }, [selectedPlan]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Stripe Payment Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2f2f2f] p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      {selectedPlan && (
        <>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <SubscriptionForm
                selectedPlan={selectedPlan}
                closeModal={closeModal}
                getUserSubscription={getUserSubscription}
              />
            </Elements>
          )}
        </>
      )}
    </Modal>
  );
};

export default PaymentModal;
