"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

const Login = () => {
  return (
    <div className="container">
      <h2>Login</h2>
      <form action="#" className="flex flex-col max-w-xs gap-5">
        <Label>
          Email:
          <Input type="email" placeholder="Email" />
        </Label>
        <Label>
          Password:
          <Input type="password" placeholder="Password" />
        </Label>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
