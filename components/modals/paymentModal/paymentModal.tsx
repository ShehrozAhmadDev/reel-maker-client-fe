// PaymentModal.js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import Modal from "react-modal";
import { PlanDataType } from "@/types/type";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

export interface PaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedPlan: PlanDataType | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  closeModal,
  selectedPlan,
}) => {
  return (
    <div className="text-black">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Stripe Payment Modal"
      >
        {selectedPlan && (
          <Elements stripe={stripePromise}>
            <div>
              <h2>{selectedPlan.title}</h2>
              <p>${selectedPlan.price}</p>
              {/* Include Stripe payment component here */}
              {/* For example, a Stripe card element */}
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              {/* Add your payment form or button here */}
            </div>
          </Elements>
        )}
      </Modal>
    </div>
  );
};

export default PaymentModal;
