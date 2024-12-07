"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface IInput {
  email: string;
  password: string;
}

const Form = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();

  const formHandler = async (data: IInput) => {
    try {
      // Setting setIsLoading to true to show Submitting... on the button
      setIsLoading(true);
      const res = await fetch("/api/form-submission", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      console.log("User Logged in!");
      // Setting setIsLoading to false to stop showing Submitting... on the button
      setIsLoading(false);

      // Setting setIsLoggedIn to true to show success message
      setIsLoggedIn(true);
    } catch (error) {
      console.error((error as { message: string }).message);
    }
  };

  return (
    <div className="mx-10 my-10">
      <h1 className="text-2xl font-bold text-center">Login Form</h1>
      <form
        className="flex gap-y-4 flex-col bg-gray-200 max-w-lg rounded-lg p-6 lg:p-8 mx-auto mt-6"
        onSubmit={handleSubmit(formHandler)}
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required", // You can write error message or just set it's value to true
            })}
            className="border py-2 px-4 rounded"
            placeholder="Enter your email"
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500">{errors.email.message as string}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border py-2 px-4 rounded"
            {...register("password", {
              required: "Password is required", // You can write error message or just set it to true
            })}
            placeholder="Enter your password"
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500">{errors.password.message as string}</p>
          )}
        </div>

        <div>
          <button
            className="border bg-blue-600 text-white text-lg px-5 py-2 rounded"
            type="submit"
          >
            {!isLoading ? "Submit" : "Submitting..."}
          </button>
        </div>
        {/* Success message */}
        {isLoggedIn && (
          <p className="text-green-600 text-center">
            You&apos;re now logged in.
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
