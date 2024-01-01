"use client";
import LoginForm from "@/components/forms/loginForm/loginForm";
import MainLayout from "@/providers/mainLayout/mainLayout";

export default function Login() {
  return (
    <div className="min-h-screen w-full transition-all duration-300 bg-[#0d0d10]">
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </div>
  );
}
