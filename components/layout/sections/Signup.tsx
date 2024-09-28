"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Github, ArrowRight } from "lucide-react";
import IconCloud from "@/components/magicui/icon-cloud";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpData, signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </motion.div>
);

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signUpApi = async (data: SignUpData) => {
    const respone = await axios.post("/api/sign-up", data);
    return respone.data;
  };

  const {
    mutate,
    isPending,
    isError,
    reset,
  } = useMutation({
    mutationFn: signUpApi,
    retry: 3,
    onSuccess: (data: any) => {
      console.log("Signup successful:", data);
      router.replace(`/verify/${data.userID}`)
    },
    onError: (error: any) => {
      console.error("Error signing up:", error);
      toast.error('Sign Up Failed');
    },
  });

  const onSubmit: SubmitHandler<SignUpData> = (data) => {
    console.log(data);
    mutate(data);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", { name, email, password });
  //   const data = {
  //     name,
  //     email,
  //     password
  //   }
  //   const response = await axios.post("/api/sign-up", data)
  //   console.log(response.data);
  //   router.push(`/sign-in`)
  // };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/complier" });
    console.log("googlesignin", result);
  };
  const handleGithubSignIn = async () => {
    const result = await signIn("github", { callbackUrl: "/complier" });
    console.log("googlesignin", result);
  };

  return (
    <>
      <div className="grid grid-cols-2 ">
        <div className="flex items-center justify-center mt-10  bg-background">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-xl"
          >
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-foreground">
                &lt; Register /&gt;
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <div className="relative">
                    <IconWrapper>
                      <User className="w-5 h-5 text-muted-foreground" />
                    </IconWrapper>
                    <input
                      id="name"
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <IconWrapper>
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </IconWrapper>
                    <input
                      id="email"
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <IconWrapper>
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </IconWrapper>
                    <input
                      id="password"
                      type="password"
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={isPending}
                >
                  {isPending ? "Signing up..." : "Sign Up"}
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleGoogleSignIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Google
                </motion.button>

                <motion.button
                  onClick={handleGithubSignIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </motion.button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <motion.a
                  href="/sign-in"
                  className="font-medium text-primary hover:text-primary/80"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  &lt; Log In /&gt;
                </motion.a>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-5">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
