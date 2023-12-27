"use client";
import { useState } from "react";
import SignupForm from "@/components/forms/signupForm/signupForm";
import Signup from "@/services/signup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MainLayout from "@/providers/mainLayout/mainLayout";

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Signup.postSignup(fullName, email, password)
      .then((data) => {
        if (data?.status === 200) {
          toast.success(data?.message);
          console.log({ data });
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <MainLayout>
      <SignupForm
        fullName={fullName}
        email={email}
        password={password}
        setFullName={setFullName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
      />
    </MainLayout>
  );
};

export default SignUp;
