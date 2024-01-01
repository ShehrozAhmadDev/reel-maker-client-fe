import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
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
  const [cardholderName, setCardholderName] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Stripe Payment Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
    >
      {selectedPlan && (
        <Elements stripe={stripePromise}>
          <div className="w-[500px]">
            <span className="flex space-x-5 justify-between text-white mb-8">
              <h2 className="text-xl text-center w-[50%] font-semibold p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                {selectedPlan.title}
              </h2>
              <p className="text-2xl text-center w-[50%] font-semibold p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                ${selectedPlan.price}
              </p>
            </span>
            <form>
              <input
                required
                type="text"
                placeholder="Cardholder's Name"
                className="w-full p-1.5 mb-4 border bg-transparent border-gray-300 rounded-md  focus:outline-none"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
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
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:opacity-80 transition-all duration-300"
              >
                Continue Payment
              </button>
            </form>
          </div>
        </Elements>
      )}
    </Modal>
  );
};

export default PaymentModal;
