"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import SignupForm from "@/components/forms/signupForm/signupForm";

const SignUp = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <SignupForm
      fullName={fullName}
      email={email}
      password={password}
      setFullName={setFullName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
    />
  );
};

export default SignUp;
