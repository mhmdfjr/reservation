"use client";
import Input from "@/components/input";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Profile() {
  const token = Cookies.get("token");
  const usernameCookies = Cookies.get("username");
  const emailCookies = Cookies.get("email");
  const passwordCookies = Cookies.get("password");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-none">
        <div className="flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-16">
          <Input
            label="Name"
            name="name"
            type="text"
            value={usernameCookies ? usernameCookies : username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="text"
            value={emailCookies ? emailCookies : email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={passwordCookies ? passwordCookies : password.toString()}
            placeholder="Insert password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Cancel"
            variant="secondary"
            size="small"
            onClick={() => {}}
          />

          <Button
            label="Save"
            variant="primary"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
