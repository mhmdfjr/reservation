/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginImage from "@/public/login.jpg";
import Input from "@/components/input";
import Button from "@/components/button";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      router.push("/dashboard");
      Cookies.set("token", "loggedin", { expires: 0.5 });
      Cookies.set("username", "admin", { expires: 0.5 });
      Cookies.set("email", "admin@gmail.com", { expires: 0.5 });
      Cookies.set("role", "Receptionist", { expires: 0.5 });
      Cookies.set("password", "admin123", { expires: 0.5 });
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="w-full h-screen flex justify-center items-center p-5 lg:px-20 bg-white dark:bg-black">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start gap-4 lg:gap-10">
        <div className="w-full lg:w-1/2 h-40 lg:h-60 flex relative">
          <Image
            src={LoginImage}
            fill={true}
            sizes="(max-width: 768px)"
            objectFit="cover"
            alt="login"
            className="rounded-lg"
          />
        </div>
        <div className="w-full lg:w-96 flex flex-col gap-6 items-start px-7 py-10 rounded-lg text-start justify-center bg-brand-10 dark:bg-brand-90 bg-opacity-15">
          <div className="flex flex-col gap-2">
            <p className="text-h6 text-start text-basic-black dark:text-basic-white">
              Welcome to{" "}
              <span className="text-brand-base text-h6-bold">STAY.</span>
            </p>
            <p className="text-body-regular text-gray-medium dark:text-gray-medium-light text-start">
              Fill in the data below to enter the dashboard.{" "}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(username, password);
            }}
            className="w-full flex flex-col gap-y-6"
          >
            <div className="flex flex-col justify-center items-start gap-y-4">
              <Input
                type="text"
                label="Username"
                name="text"
                value={username}
                placeholder="Insert username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                value={password}
                placeholder="Insert password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <Button
                variant={"primary"}
                label={"Login"}
                size={"full"}
                onClick={() => handleLogin(username, password)}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
