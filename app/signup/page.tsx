"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import SignupForm from "@/components/forms/signupForm/signupForm";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const SignUpFormFunction = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");
  const elements = useElements();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle signup logic here

    if (!elements || !selectedPlan) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    // Handle signup logic here

    // if (!stripe || !elements || !selectedPlan) {
    //   return;
    // }

    // if (!cardElement) {
    //   return;
    // }

    // try {
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: {
    //       email: email,
    //     },
    //   });

    //   if (error) {
    //     setCardError(
    //       error.message || "There was an error with the payment method."
    //     );
    //   } else {
    //     // Send paymentMethod.id and plan to your backend to create subscription
    //     const response = await fetch("/api/create-subscription", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         paymentMethodId: paymentMethod.id,
    //         email,
    //         selectedPlan,
    //       }),
    //     });

    //     // Handle response from server (redirect to dashboard or show success message)
    //     const data = await response.json();
    //     // Handle response data
    //   }
    // } catch (error) {
    //   console.error("Error creating payment method:", error);
    //   setCardError("There was an error creating the payment method.");
    // }
  };

  return (
    <SignupForm
      handleSignUp={handleSignUp}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
      cardError={cardError}
    />
  );
};

const SignUp = () => {
  return (
    <Elements stripe={stripePromise}>
      <SignUpFormFunction />
    </Elements>
  );
};

export default SignUp;
