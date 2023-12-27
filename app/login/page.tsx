"use client";
import LoginForm from "@/components/forms/loginForm/loginForm";
import MainLayout from "@/providers/mainLayout/mainLayout";

export default function Login() {
  return (
    <div className="min-h-screen w-full transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-400">
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </div>
  );
}
